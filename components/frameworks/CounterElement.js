class ExampleCounter extends HTMLElement {
  connectedCallback(){
    if(this.shadowRoot)return;
    let count=Number(this.getAttribute('initial') || 0);
    const root=this.attachShadow({mode:'open'});
    root.innerHTML='<style>:host{display:block}button{font:14px var(--font);background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}</style><button></button>';
    const button=root.querySelector('button');const render=()=>button.textContent=`Web component: ${count}`;
    button.addEventListener('click',()=>{count++;render();});render();
  }
}
if(!customElements.get('example-counter'))customElements.define('example-counter',ExampleCounter);
export function mount(element,{initial=0}){
  const counter=document.createElement('example-counter');counter.setAttribute('initial',String(initial));element.replaceChildren(counter);return()=>counter.remove();
}
