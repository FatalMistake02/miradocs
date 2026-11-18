<script>
let {initial=0,label='Svelte counter'}=$props();
let count=$state(initial);
</script>
<div class="counter"><span>{label}</span><button onclick={()=>count++} aria-label={`${label}: ${count}`}>Count: {count}</button></div>
<style>
.counter{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);font:14px var(--font)}button{font:inherit;background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}
</style>
