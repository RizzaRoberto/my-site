/* keys.js — sistema chiavi */
(function () {

  var KEY_LABELS = [
    'Chiave Alpha — trovata nella Hero!',
    'Chiave Beta — trovata tra i tag!',
    'Chiave Gamma — trovata in About!',
    'Chiave Delta — trovata nei Projects!',
    'Chiave Omega — trovata nel Footer!'
  ];

  function getState() {
    try { return JSON.parse(localStorage.getItem('rb_keys') || '{}'); } catch(e) { return {}; }
  }
  function setState(s) {
    try { localStorage.setItem('rb_keys', JSON.stringify(s)); } catch(e) {}
  }

  window.unlockKey = function (i) {
    var state = getState();
    if (state['k' + i]) return;
    state['k' + i] = true;
    setState(state);
    renderSlots();
    showPopup(i);

    /* Segna chiave come raccolta visivamente */
    var key = document.getElementById('pkey-' + i);
    if (key) key.classList.add('collected');
  };

  function renderSlots() {
    var state = getState();
    var count = 0;
    for (var i = 0; i < 5; i++) {
      var slot = document.getElementById('slot' + i);
      if (!slot) continue;
      if (state['k' + i]) { slot.textContent = '\u25C6'; slot.classList.add('found'); count++; }
      /* Segna chiavi già trovate */
      var key = document.getElementById('pkey-' + i);
      if (key && state['k' + i]) key.classList.add('collected');
    }
    var el = document.getElementById('key-count');
    if (el) el.textContent = count + ' / 5 TROVATE';
    if (count === 5) setTimeout(showVictory, 700);
    if (count === 5) setTimeout(function(){ document.dispatchEvent(new Event("rb:victory")); }, 400);
  }

  function showPopup(i) {
    var popup = document.getElementById('key-popup');
    if (!popup) return;
    document.getElementById('key-popup-title').textContent = '[ CHIAVE #' + (i+1) + ' TROVATA! ]';
    document.getElementById('key-popup-body').textContent  = KEY_LABELS[i];
    popup.classList.add('show');
    clearTimeout(popup._t);
    popup._t = setTimeout(function(){ popup.classList.remove('show'); }, 3000);
  }

  function showVictory() {
    var popup = document.getElementById('key-popup');
    if (popup) {
      document.getElementById('key-popup-title').textContent = '[ LUCCHETTO APERTO! ]';
      document.getElementById('key-popup-body').textContent  = 'Tutte e 5 le chiavi trovate!';
      popup.classList.add('show');
      clearTimeout(popup._t);
      popup._t = setTimeout(function(){ popup.classList.remove('show'); }, 4000);
    }
    var btn = document.getElementById('open-game-btn');
    if (btn) {
      btn.style.display = 'inline-block';
      btn.onclick = function() {
        if (typeof window.openGamePanel === 'function') window.openGamePanel();
      };
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSlots();

    /* Se già tutte trovate, mostra subito il pulsante */
    var state = getState();
    var count = 0;
    for (var i = 0; i < 5; i++) { if (state['k' + i]) count++; }
    if (count === 5) {
      var btn = document.getElementById('open-game-btn');
      if (btn) {
        btn.style.display = 'inline-block';
        btn.onclick = function() {
          if (typeof window.openGamePanel === 'function') window.openGamePanel();
        };
      }
    }

    /* Nav mobile hamburger */
    var toggle   = document.querySelector('.nav-toggle');
    var dropdown = document.querySelector('.nav-dropdown');
    if (toggle && dropdown) {
      toggle.addEventListener('click', function(){ dropdown.classList.toggle('open'); });
      /* Chiudi dropdown cliccando un link */
      dropdown.querySelectorAll('.nav-link').forEach(function(l){
        l.addEventListener('click', function(){ dropdown.classList.remove('open'); });
      });
    }

    /* Link attivo */
    var path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(function(el){
      var href = el.getAttribute('href') || '';
      if (
        ((path.endsWith('index.html')||path==='/'||path==='') && href.includes('index')) ||
        (path.includes('about')    && href.includes('about'))    ||
        (path.includes('projects') && href.includes('projects')) ||
        (path.includes('ailab')    && href.includes('ailab'))    ||
        (path.includes('contact')  && href.includes('contact'))
      ) el.classList.add('active');
    });
  });

})();
