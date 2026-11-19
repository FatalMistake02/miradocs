import { isAlias, isScalar, parseDocument, visit } from 'yaml';

export function parseComponentOptions(source, component) {
  const input = source.trim();
  const fail = message => { throw Error(`${component}: ${message}`); };
  if (!input.startsWith('{') || !input.endsWith('}')) fail('options must be an object, such as { title: Guides }.');

  let options;
  try { options = JSON.parse(input); }
  catch {
    const document = parseDocument(input, { schema: 'core', uniqueKeys: true, prettyErrors: false });
    if (document.errors.length || document.warnings.length) {
      fail(`invalid options: ${(document.errors[0] || document.warnings[0]).message}`);
    }
    visit(document, {
      Node(key, node) {
        if (isAlias(node) || node.anchor || node.tag) fail('options support plain values, arrays, and objects.');
        if (isScalar(node) && typeof node.value === 'number' && !Number.isFinite(node.value)) fail('option numbers must be finite.');
      },
      Pair(key, pair) {
        if (!isScalar(pair.key) || typeof pair.key.value !== 'string') fail('option names must be strings.');
        if (pair.value === null) fail('give each option a value and put a space after its colon, such as { search: true }.');
      }
    });
    options = document.toJS({ maxAliasCount: 0 });
  }
  if (!options || Array.isArray(options) || typeof options !== 'object') fail('options must be an object.');
  const values = [options];
  while (values.length) {
    const value = values.pop();
    if (typeof value === 'number' && !Number.isFinite(value)) fail('option numbers must be finite.');
    if (value && typeof value === 'object') values.push(...Object.values(value));
  }
  return options;
}
