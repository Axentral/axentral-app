(function(){
  const THEME_KEY='axentral-theme';

  function initAxentralTheme(scope=document){
    const root=document.documentElement;
    const saved=localStorage.getItem(THEME_KEY);
    if(saved){root.dataset.theme=saved;}

    scope.querySelectorAll('[data-theme-toggle]').forEach((button)=>{
      const sync=()=>{button.textContent=root.dataset.theme==='light'?'🌙 Modo oscuro':'☀️ Modo claro';};
      sync();

      if(button.dataset.themeBound==='true'){
        return;
      }

      button.dataset.themeBound='true';
      button.addEventListener('click',()=>{
        root.dataset.theme=root.dataset.theme==='light'?'dark':'light';
        localStorage.setItem(THEME_KEY,root.dataset.theme);
        sync();
      });
    });
  }

  window.AxentralTheme={init:initAxentralTheme};
  initAxentralTheme();
})();
