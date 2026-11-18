export function initializeClientComponents(signal, ui) {
  const disposers = new Set(), scheduled = new Set();
  const hosts = [...document.querySelectorAll('[data-component-src]')];
  const started = new WeakSet();
  let observer;
  async function mount(host) {
    if (signal.aborted || started.has(host) || !host.isConnected) return;
    started.add(host);host.dataset.componentStatus='loading';
    const fallback = host.innerHTML;
    try {
      const module = await import(host.dataset.componentSrc);
      if(signal.aborted || !host.isConnected)return;
      const dispose = await module.mount(host,JSON.parse(host.dataset.componentProps || '{}'),{signal});
      if(typeof dispose === 'function') {
        if(signal.aborted) await dispose();else disposers.add(dispose);
      }
      if(!signal.aborted)host.dataset.componentStatus='ready';
    }catch(error){
      if(signal.aborted || !host.isConnected)return;
      host.innerHTML=fallback;host.dataset.componentStatus='error';
      const message=document.createElement('p');message.className='client-component-error';message.textContent=ui.componentError;host.append(message);
      console.error(`Could not mount ${host.dataset.component}`,error);
    }
  }
  if('IntersectionObserver' in window)observer=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);mount(entry.target);}
  },{rootMargin:'200px'});
  for(const host of hosts) {
    const mode=host.dataset.componentLoad;
    if(mode==='eager')mount(host);
    else if(mode==='idle') {
      const idle='requestIdleCallback' in window;
      const handle=idle?requestIdleCallback(()=>mount(host),{timeout:1500}):setTimeout(()=>mount(host),50);
      scheduled.add(()=>idle?cancelIdleCallback(handle):clearTimeout(handle));
    }else if(observer)observer.observe(host);else mount(host);
  }
  signal.addEventListener('abort',()=>{
    observer?.disconnect();for(const cancel of scheduled)cancel();
    for(const dispose of disposers)try{Promise.resolve(dispose()).catch(console.error);}catch(error){console.error(error);}
    scheduled.clear();disposers.clear();
  },{once:true});
}
