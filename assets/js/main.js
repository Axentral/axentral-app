(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('axentral-theme');
  if(saved){root.dataset.theme=saved;}
  document.querySelectorAll('[data-theme-toggle]').forEach((button)=>{
    const sync=()=>{button.textContent=root.dataset.theme==='light'?'🌙 Modo oscuro':'☀️ Modo claro';};
    sync();
    button.addEventListener('click',()=>{
      root.dataset.theme=root.dataset.theme==='light'?'dark':'light';
      localStorage.setItem('axentral-theme',root.dataset.theme);
      sync();
    });
  });
})();
