/* cat.js — gatto che si affaccia dal bordo destro, loop ogni 10s */
(function () {

  function init() {
    var svg    = document.getElementById('cat-svg');
    var bubble = document.getElementById('cat-bubble');
    if (!svg || !bubble) return;

    function reset() {
      svg.style.transition = 'none';
      svg.style.transform  = 'translateX(200px)'; /* completamente fuori */
      bubble.style.opacity = '0';
    }

    function runCat() {
      reset();

      /* 500ms — sbuca appena: si vedono solo le orecchie */
      setTimeout(function () {
        svg.style.transition = 'transform 1.2s cubic-bezier(.22,1,.36,1)';
        svg.style.transform  = 'translateX(90px)';
      }, 500);

      /* 3s — si affaccia a metà */
      setTimeout(function () {
        svg.style.transform = 'translateX(40px)';
        setTimeout(function () {
          bubble.style.opacity = '1';
        }, 700);
      }, 3000);

      /* 7s — sparisce */
      setTimeout(function () {
        bubble.style.opacity = '0';
        setTimeout(function () {
          svg.style.transition = 'transform 1s cubic-bezier(.55,0,1,.45)';
          svg.style.transform  = 'translateX(200px)';
          setTimeout(runCat, 10000); /* 10s dopo → ricomincia */
        }, 400);
      }, 7000);
    }

    /* Prima apparizione dopo 8s */
    setTimeout(runCat, 8000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
