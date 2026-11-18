"""Mira: a small, dependency-free static documentation generator."""
import argparse
import html
import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial

ROOT = Path.cwd()

def esc(value):
    return html.escape(str(value), quote=True)

def slug(value):
    return re.sub(r'[^\w-]+', '-', re.sub(r'<[^>]+>', '', value).strip().lower()).strip('-')

def inline(text):
    # Protect code and links before applying emphasis.
    tokens = []
    def hold(value):
        tokens.append(value)
        return f'\x00{len(tokens)-1}\x00'
    text = re.sub(r'`([^`]+)`', lambda m: hold('<code>'+esc(m[1])+'</code>'), text)
    def link(m):
        url = m[2].strip()
        if re.match(r'(?i)\s*(javascript|data|vbscript):', url):
            return esc(m[0])
        return hold(f'<a href="{esc(url)}">{esc(m[1])}</a>')
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, text)
    text = esc(text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*([^*]+)\*', r'<em>\1</em>', text)
    return re.sub(r'\x00(\d+)\x00', lambda m: tokens[int(m[1])], text)

def parse_frontmatter(text):
    meta = {}
    if text.startswith('---\n'):
        end = text.find('\n---\n', 4)
        if end != -1:
            for line in text[4:end].splitlines():
                if ':' in line:
                    key, value = line.split(':', 1)
                    meta[key.strip()] = value.strip().strip('"\'')
            text = text[end+5:]
    return meta, text

def render_markdown(text, components, headings=None):
    headings = headings if headings is not None else []
    lines = text.splitlines(); out = []; i = 0; ids = {}
    while i < len(lines):
        line = lines[i]
        if not line.strip(): i += 1; continue
        fence = re.match(r'^```(.*)$', line)
        if fence:
            lang = fence[1].strip(); code = []; i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                code.append(lines[i]); i += 1
            i += 1
            out.append(f'<div class="code-block"><div class="code-top"><span>{esc(lang or "code")}</span><button class="copy-code" type="button">Copy</button></div><pre><code>{esc(chr(10).join(code))}</code></pre></div>'); continue
        directive = re.match(r'^:::([\w-]+)(?:\s+(.*))?$', line)
        if directive:
            kind, arg = directive[1], directive[2] or ''; body = []; i += 1; depth = 0
            while i < len(lines):
                if lines[i].startswith(':::') and lines[i] != ':::': depth += 1
                if lines[i] == ':::':
                    if depth == 0: break
                    depth -= 1
                body.append(lines[i]); i += 1
            i += 1
            inner = render_markdown('\n'.join(body), components, headings)
            if kind in ('note', 'tip', 'caution', 'danger'):
                out.append(f'<aside class="callout {kind}"><div class="callout-title">{esc(arg or kind.title())}</div>{inner}</aside>')
            elif kind == 'tabs':
                # Child tab directives have already rendered into panels.
                names = re.findall(r'<section class="tab-panel" data-label="([^"]*)">', inner)
                buttons = ''.join(f'<button role="tab" aria-selected="{str(n == 0).lower()}" type="button">{name}</button>' for n, name in enumerate(names))
                out.append(f'<div class="tabs"><div class="tab-list" role="tablist">{buttons}</div>{inner}</div>')
            elif kind == 'tab': out.append(f'<section class="tab-panel" data-label="{esc(arg)}">{inner}</section>')
            elif kind in components:
                out.append(components[kind].replace('{{content}}', inner).replace('{{title}}', esc(arg)))
            else: out.append(f'<div class="component {esc(kind)}">{inner}</div>')
            continue
        heading = re.match(r'^(#{1,6})\s+(.+)$', line)
        if heading:
            level = len(heading[1]); title = heading[2]; base = slug(title); ids[base] = ids.get(base, 0) + 1
            ident = base if ids[base] == 1 else f'{base}-{ids[base]}'
            if level in (2, 3): headings.append((level, re.sub(r'[`*]', '', title), ident))
            out.append(f'<h{level} id="{esc(ident)}">{inline(title)}<a class="heading-anchor" href="#{esc(ident)}" aria-label="Link to this section">#</a></h{level}>'); i += 1; continue
        if re.match(r'^\s*[-*] ', line):
            items = []
            while i < len(lines) and re.match(r'^\s*[-*] ', lines[i]):
                items.append('<li>'+inline(re.sub(r'^\s*[-*] ', '', lines[i]))+'</li>'); i += 1
            out.append('<ul>'+''.join(items)+'</ul>'); continue
        if re.match(r'^\d+\. ', line):
            items = []
            while i < len(lines) and re.match(r'^\d+\. ', lines[i]):
                items.append('<li>'+inline(re.sub(r'^\d+\. ', '', lines[i]))+'</li>'); i += 1
            out.append('<ol>'+''.join(items)+'</ol>'); continue
        if line.startswith('> '): out.append('<blockquote>'+inline(line[2:])+'</blockquote>'); i += 1; continue
        para = [line]; i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r'^(#{1,6}\s|```|:::|[-*] |\d+\. |>)', lines[i]):
            para.append(lines[i]); i += 1
        out.append('<p>'+inline(' '.join(para))+'</p>')
    return '\n'.join(out)

def clean_name(name):
    return re.sub(r'^\d+[-_ ]*', '', name).replace('-', ' ').replace('_', ' ').title()

def page_url(path, base):
    parts = [re.sub(r'^\d+[-_ ]*', '', x) for x in path.with_suffix('').parts]
    if parts[-1] == 'index': parts.pop()
    return base + ('/'.join(quote(p) for p in parts) + '/' if parts else '')

def build(config_path):
    config_path = Path(config_path).resolve(); root = config_path.parent
    config = json.loads(config_path.read_text(encoding='utf-8'))
    source = root / config.get('content', 'docs'); output = root / config.get('output', 'site')
    if output.resolve() in (root.resolve(), source.resolve()) or output.resolve() in source.resolve().parents:
        raise ValueError('Output must not be the project root, content directory, or its parent.')
    base = '/' + config.get('base', '/').strip('/') + '/'; base = '/' if base == '//' else base
    components_dir = root / config.get('components', 'components')
    components = {p.stem: p.read_text(encoding='utf-8') for p in components_dir.glob('*.html')} if components_dir.exists() else {}
    pages = []
    for path in sorted(source.rglob('*.md')):
        rel = path.relative_to(source); meta, body = parse_frontmatter(path.read_text(encoding='utf-8'))
        headings = []; content = render_markdown(body, components, headings)
        title = meta.get('title', clean_name(path.stem))
        pages.append(dict(path=rel, title=title, description=meta.get('description', ''), content=content, headings=headings, url=page_url(rel, base), text=re.sub(r'<[^>]+>', ' ', content)))
    if not pages: raise ValueError(f'No Markdown pages found in {source}')
    urls = [p['url'] for p in pages]
    if len(urls) != len(set(urls)): raise ValueError('Multiple pages map to the same URL; check numbered filenames and index pages.')
    if output.exists(): shutil.rmtree(output)
    output.mkdir(parents=True)
    package = Path(__file__).resolve().parent
    shutil.copytree(package / 'assets', output / 'assets')
    public = root / config.get('public', 'public')
    if public.exists(): shutil.copytree(public, output, dirs_exist_ok=True)
    theme = root / config.get('theme', 'theme')
    if theme.exists(): shutil.copytree(theme, output / 'theme', dirs_exist_ok=True)
    search = [{'title': p['title'], 'description': p['description'], 'url': p['url'], 'text': re.sub(r'\s+', ' ', html.unescape(p['text']))[:4000]} for p in pages]
    (output / 'search.json').write_text(json.dumps(search, ensure_ascii=False), encoding='utf-8')
    for index, page in enumerate(pages):
        groups = {}
        for item in pages:
            group = clean_name(item['path'].parts[0]) if len(item['path'].parts) > 1 else 'Overview'
            groups.setdefault(group, []).append(item)
        nav = ''.join('<div class="nav-group"><div class="nav-label">'+esc(group)+'</div>'+''.join(f'<a class="nav-link {"active" if item is page else ""}" href="{esc(item["url"])}" {"aria-current=page" if item is page else ""}>{esc(item["title"])}</a>' for item in items)+'</div>' for group, items in groups.items())
        toc = ''.join(f'<a class="toc-level-{level}" href="#{esc(ident)}">{esc(title)}</a>' for level, title, ident in page['headings'])
        prev = pages[index-1] if index else None; nxt = pages[index+1] if index+1 < len(pages) else None
        def pager(item, label, arrow):
            return f'<a class="pager-link" href="{esc(item["url"])}"><span>{label}</span><strong>{arrow[0]} {esc(item["title"])} {arrow[1]}</strong></a>' if item else '<span></span>'
        links = ''.join(f'<a href="{esc(x["url"])}">{esc(x["label"])}</a>' for x in config.get('links', []))
        styles = ''.join(f'<link rel="stylesheet" href="{esc(base + "theme/" + f)}">' for f in config.get('styles', []) )
        title = esc(config.get('title', 'Mira Docs')); description = esc(page['description'])
        site_label = esc(config.get('label', 'DOCUMENTATION'))
        document = f'''<!doctype html><html lang="{esc(config.get('language', 'en'))}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="{description}"><title>{esc(page['title'])} · {title}</title><script>try{{document.documentElement.dataset.theme=localStorage.getItem('mira-theme')||'system'}}catch(e){{}}</script><link rel="stylesheet" href="{base}assets/style.css">{styles}</head><body data-base="{esc(base)}"><header class="topbar"><a class="brand" href="{base}"><span class="brand-mark">✳</span><span>{title}</span><span class="brand-divider"></span><span class="brand-label">{site_label}</span></a><div class="top-actions"><nav class="header-links" aria-label="Header">{links}</nav><button class="search-trigger" type="button" aria-label="Search documentation"><span class="search-icon">⌕</span><span class="search-placeholder">Search documentation...</span><kbd>⌘ K</kbd></button><button class="theme-toggle icon-button" type="button" aria-label="Change color theme" title="Change color theme">☼</button><button class="menu-toggle icon-button" type="button" aria-label="Open navigation" aria-expanded="false">☰</button></div></header><div class="layout"><aside class="sidebar"><div class="sidebar-inner"><div class="sidebar-caption">EXPLORE THE DOCS <span>↘</span></div><nav aria-label="Documentation">{nav}</nav><div class="sidebar-bottom"><span class="status-dot"></span> Built with care <span>✳</span></div></div></aside><main id="main" class="main"><div class="mobile-breadcrumb">DOCUMENTATION <span>/</span> {esc(page['title'])}</div><div class="eyebrow"><span class="eyebrow-dot"></span> {esc(config.get('eyebrow', 'THE DOCUMENTATION'))}</div><h1>{esc(page['title'])}</h1><p class="lede">{description}</p><div class="article">{page['content']}</div><div class="page-feedback">Was this page helpful? <span>We’re always improving.</span></div><div class="pagination">{pager(prev, 'PREVIOUS', ('←',''))}{pager(nxt, 'NEXT', ('','→'))}</div><footer>Made for the curious. <span>Built with {title} ✳</span></footer></main><aside class="toc"><div class="toc-inner"><div class="toc-title">ON THIS PAGE</div>{toc}<div class="toc-help"><span>✳</span><strong>Make it yours.</strong><p>Good documentation starts with a little clarity.</p></div></div></aside></div><dialog class="search-dialog"><div class="search-box"><div class="search-input-wrap"><span>⌕</span><input type="search" placeholder="Search the docs..." aria-label="Search the docs"><kbd>ESC</kbd></div><div class="search-results"></div><div class="search-footer"><span>↑↓ Navigate &nbsp; ↵ Select</span><span>SEARCH BY MIRA ✳</span></div></div></dialog><script src="{base}assets/app.js" defer></script></body></html>'''
        dest = output / page['url'][len(base):] / 'index.html'; dest.parent.mkdir(parents=True, exist_ok=True); dest.write_text(document, encoding='utf-8')
    print(f'Built {len(pages)} pages to {output}')

def main():
    parser = argparse.ArgumentParser(description='Build and preview a Mira documentation site.')
    parser.add_argument('command', choices=['build', 'serve']); parser.add_argument('--config', default='mira.json'); parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args(); build(args.config)
    if args.command == 'serve':
        root = Path(args.config).resolve().parent; config = json.loads(Path(args.config).read_text(encoding='utf-8')); output = root / config.get('output', 'site')
        base = config.get('base', '/').strip('/')
        if base: print(f'Preview base paths with a server mounted at /{base}/; the built-in server serves the output root.')
        print(f'Serving at http://localhost:{args.port}/ (rebuild after edits).')
        ThreadingHTTPServer(('127.0.0.1', args.port), partial(SimpleHTTPRequestHandler, directory=str(output))).serve_forever()

if __name__ == '__main__': main()
