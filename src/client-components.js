import path from 'node:path';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { exists } from './utils.js';

export async function compileClientComponents(ctx) {
  const definitions = ctx.config.clientComponents || {};
  if (!Object.keys(definitions).length) return { components:{},files:[],watchFiles:[] };
  const require = createRequire(path.join(ctx.root,'package.json'));
  const styles = new Map(), sourceRoots = new Map(), sources = new Map();
  let vueCompiler,svelteCompiler;
  async function compiler(name,install) {
    try { const module=await import(pathToFileURL(require.resolve(name)).href);return module.default || module; }
    catch { throw Error(`Client components need ${name}. Install it in your project: ${install}`); }
  }
  for(const definition of Object.values(definitions)) {
    const local=path.resolve(ctx.root,definition.src);sources.set(definition,definition.src.startsWith('.') || await exists(local) ? local : definition.src);
    const dependency={react:'react-dom/client',vue:'vue',svelte:'svelte',module:null}[definition.framework];
    if(dependency)try{require.resolve(dependency);}catch{throw Error(`Install the ${definition.framework} dependencies in your project before using that component.`);}
    if(definition.framework==='vue')vueCompiler ||= await compiler('@vue/compiler-sfc','npm install vue @vue/compiler-sfc');
    if(definition.framework==='svelte')svelteCompiler ||= await compiler('svelte/compiler','npm install svelte');
  }
  const sourceImport = definition => {
    const source = sources.get(definition);
    return definition.export && definition.export !== 'default' ? `import { ${definition.export} as Component } from ${JSON.stringify(source)};` : `import Component from ${JSON.stringify(source)};`;
  };
  const styleImport=(id,css,root)=>{styles.set(id,css);sourceRoots.set(id,root);return `\nimport ${JSON.stringify('miradocs-style:'+id)};\n`;};
  const outputRoot=path.join(ctx.root,'.miradocs-bundle');
  let result;
  try {
    result=await build({
      absWorkingDir:ctx.root,entryPoints:Object.fromEntries(Object.keys(definitions).map(name=>[name,'miradocs:'+name])),outdir:outputRoot,
      bundle:true,write:false,metafile:true,format:'esm',platform:'browser',target:['es2022'],splitting:true,minify:true,
      entryNames:'[name]-[hash]',chunkNames:'chunks/[name]-[hash]',assetNames:'media/[name]-[hash]',jsx:'automatic',
      define:{'process.env.NODE_ENV':'"production"','__VUE_OPTIONS_API__':'true','__VUE_PROD_DEVTOOLS__':'false','__VUE_PROD_HYDRATION_MISMATCH_DETAILS__':'false'},
      loader:{'.png':'file','.svg':'file','.webp':'file','.woff2':'file'},logLevel:'silent',
      plugins:[{name:'miradocs-components',setup(builder){
        builder.onResolve({filter:/^miradocs:/},args=>({path:args.path.slice(9),namespace:'miradocs-component'}));
        builder.onLoad({filter:/.*/,namespace:'miradocs-component'},args=>{
          const definition=definitions[args.path];let contents;
          if(definition.framework==='react') contents=`import React from 'react';import {createRoot} from 'react-dom/client';${sourceImport(definition)}export function mount(element,props){const root=createRoot(element);root.render(React.createElement(Component,props));return ()=>root.unmount();}`;
          else if(definition.framework==='vue') contents=`import {createApp} from 'vue';${sourceImport(definition)}export function mount(element,props){const app=createApp(Component,props);app.mount(element);return ()=>app.unmount();}`;
          else if(definition.framework==='svelte') contents=`import {mount as start,unmount} from 'svelte';${sourceImport(definition)}export function mount(element,props){const app=start(Component,{target:element,props});return ()=>unmount(app);}`;
          else contents=`export {mount} from ${JSON.stringify(sources.get(definition))};`;
          return {contents,loader:'js',resolveDir:ctx.root};
        });
        builder.onResolve({filter:/^miradocs-style:/},args=>({path:args.path.slice(15),namespace:'miradocs-style'}));
        builder.onLoad({filter:/.*/,namespace:'miradocs-style'},args=>({contents:styles.get(args.path),loader:'css',resolveDir:sourceRoots.get(args.path)}));
        builder.onLoad({filter:/\.vue$/},async args=>{
          vueCompiler ||= await compiler('@vue/compiler-sfc','npm install vue @vue/compiler-sfc');
          const source=await fs.readFile(args.path,'utf8'),id=createHash('sha256').update(args.path).digest('hex').slice(0,8);
          const {descriptor,errors}=vueCompiler.parse(source,{filename:args.path});if(errors.length)throw Error(errors.join('\n'));
          if(descriptor.styles.some(style=>style.module))throw Error('Vue CSS modules require a custom module adapter; use scoped styles for .vue components.');
          const scoped=descriptor.styles.some(style=>style.scoped),scope='data-v-'+id;
          let contents=descriptor.script || descriptor.scriptSetup ? vueCompiler.compileScript(descriptor,{id,inlineTemplate:!!descriptor.scriptSetup,genDefaultAs:'__component'}).content : 'const __component={};';
          if(descriptor.template && !descriptor.scriptSetup){const template=vueCompiler.compileTemplate({source:descriptor.template.content,filename:args.path,id,scoped,compilerOptions:{scopeId:scoped?scope:undefined}});if(template.errors.length)throw Error(template.errors.join('\n'));contents+='\n'+template.code+'\n__component.render=render;';}
          if(scoped)contents+=`\n__component.__scopeId=${JSON.stringify(scope)};`;
          for(const [index,style] of descriptor.styles.entries()){
            const compiled=await vueCompiler.compileStyleAsync({source:style.content,filename:args.path,id:scope,scoped:style.scoped,preprocessLang:style.lang,preprocessCustomRequire:require});
            if(compiled.errors.length)throw Error(compiled.errors.join('\n'));
            contents+=styleImport(id+'-'+index,compiled.code,path.dirname(args.path));
          }
          contents+='\nexport default __component;';
          return {contents,loader:descriptor.script?.lang==='ts'||descriptor.scriptSetup?.lang==='ts'?'ts':'js',resolveDir:path.dirname(args.path),watchFiles:[args.path]};
        });
        builder.onLoad({filter:/\.svelte$/},async args=>{
          svelteCompiler ||= await compiler('svelte/compiler','npm install svelte');
          const source=await fs.readFile(args.path,'utf8'),id=createHash('sha256').update(args.path).digest('hex').slice(0,8);
          const compiled=svelteCompiler.compile(source,{filename:args.path,generate:'client',css:'external',dev:false});
          return {contents:compiled.js.code+(compiled.css?.code?styleImport(id,compiled.css.code,path.dirname(args.path)):''),loader:'js',resolveDir:path.dirname(args.path),watchFiles:[args.path]};
        });
      }}]
    });
  }catch(error){throw Error(`Could not bundle client components: ${error.errors?.map(item=>item.text).join('\n') || error.message}`);}
  const relative = file => path.relative(outputRoot,path.isAbsolute(file)?file:path.resolve(ctx.root,file)).replaceAll('\\','/');
  const components={};
  for(const [file,metadata] of Object.entries(result.metafile.outputs))if(metadata.entryPoint?.startsWith('miradocs-component:') && file.endsWith('.js')) {
    const name=metadata.entryPoint.slice('miradocs-component:'.length);
    components[name]={...definitions[name],url:ctx.base+'assets/components/'+relative(file),css:metadata.cssBundle?ctx.base+'assets/components/'+relative(metadata.cssBundle):null};
  }
  return {components,files:result.outputFiles.map(file=>({path:relative(file.path),contents:file.contents})),watchFiles:Object.keys(result.metafile.inputs).filter(file=>!file.startsWith('miradocs-')).map(file=>path.resolve(ctx.root,file))};
}
