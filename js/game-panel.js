/* game-panel.js — pannello Unity WebGL */
(function () {

  var GAME_URL = 'game/index.html';

  var html = `
<div id="game-panel-overlay"></div>
<div id="game-panel">
  <div id="game-panel-inner">
    <div id="game-panel-topbar">
      <span id="game-panel-topbar-title">//</span>
      <button id="game-panel-close">&#10005;</button>
    </div>
    <div id="game-screen-wrap">
      <div id="game-screen-border">
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
        <iframe id="game-iframe" src="" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
    </div>
    <div id="game-panel-bottombar">
      <span id="game-status-dot"></span>
      <span id="game-status-txt">PRONTO</span>
      <span id="game-fs-btn" title="Fullscreen">&#x26F6;</span>
    </div>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  var overlay   = document.getElementById('game-panel-overlay');
  var panel     = document.getElementById('game-panel');
  var iframe    = document.getElementById('game-iframe');
  var closeBtn  = document.getElementById('game-panel-close');
  var statusTxt = document.getElementById('game-status-txt');
  var fsBtn     = document.getElementById('game-fs-btn');

  window.openGamePanel = function () {
    overlay.classList.add('show');
    panel.style.display = 'block';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        panel.classList.add('show');
        /* Carica il gioco subito all'apertura */
        if (!iframe.src || iframe.src === window.location.href) {
          statusTxt.textContent = 'CARICAMENTO...';
          iframe.style.display = 'block';
          iframe.src = GAME_URL;
          iframe.onload = function(){ statusTxt.textContent = 'IN ESECUZIONE'; };
        }
      });
    });
    document.body.style.overflow = 'hidden';
  };

  function closePanel() {
    panel.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(function(){
      panel.style.display = 'none';
      iframe.src = '';
      iframe.style.display = 'none';
      statusTxt.textContent = 'PRONTO';
    }, 280);
  }

  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && panel.classList.contains('show')) closePanel();
  });

  fsBtn.addEventListener('click', function(){
    var el = document.getElementById('game-screen-border');
    if (el.requestFullscreen)            el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  });

})();
