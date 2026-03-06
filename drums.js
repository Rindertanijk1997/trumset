let context;

function resume() {
  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (context.state === 'suspended') context.resume();
}

// ── Hjälpfunktioner ──────────────────────
function brus(sek) {
  const buf = context.createBuffer(1, context.sampleRate * sek, context.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function gain(vol) {
  const g = context.createGain();
  g.gain.value = vol;
  g.connect(context.destination);
  return g;
}

// ── Ljud ─────────────────────────────────
function playKick() {
  const osc = context.createOscillator();
  const g   = gain(0);
  osc.frequency.setValueAtTime(80, context.currentTime);
  osc.frequency.exponentialRampToValueAtTime(18, context.currentTime + 0.45);
  g.gain.setValueAtTime(2.8, context.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
  osc.connect(g);
  osc.start();
  osc.stop(context.currentTime + 0.5);
}

function playSnare() {
  const src = context.createBufferSource();
  src.buffer = brus(0.22);
  const hp = context.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 900;
  const g = gain(0);
  g.gain.setValueAtTime(0.85, context.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.22);
  src.connect(hp);
  hp.connect(g);
  src.start();

  const osc = context.createOscillator();
  const g2  = gain(0);
  osc.frequency.value = 190;
  g2.gain.setValueAtTime(0.6, context.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
  osc.connect(g2);
  osc.start();
  osc.stop(context.currentTime + 0.12);
}

function playHihat() {
  const src = context.createBufferSource();
  src.buffer = brus(0.09);
  const bp = context.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 11000;
  bp.Q.value = 0.4;
  const g = gain(0);
  g.gain.setValueAtTime(0.38, context.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.09);
  src.connect(bp);
  bp.connect(g);
  src.start();
}

function playCrash() {
  const src = context.createBufferSource();
  src.buffer = brus(1.8);
  const hp = context.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 4000;
  const g = gain(0);
  g.gain.setValueAtTime(0.6, context.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.8);
  src.connect(hp);
  hp.connect(g);
  src.start();
}

function playRide() {
  const src = context.createBufferSource();
  src.buffer = brus(0.7);
  const bp = context.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 7500;
  bp.Q.value = 2.5;
  const g = gain(0);
  g.gain.setValueAtTime(0.32, context.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.7);
  src.connect(bp);
  bp.connect(g);
  src.start();
}

function playTom(hz) {
  const osc = context.createOscillator();
  const g   = gain(0);
  osc.frequency.setValueAtTime(hz, context.currentTime);
  osc.frequency.exponentialRampToValueAtTime(hz * 0.28, context.currentTime + 0.35);
  g.gain.setValueAtTime(1.0, context.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.35);
  osc.connect(g);
  osc.start();
  osc.stop(context.currentTime + 0.35);
}

function playCowbell() {
  [562, 845].forEach(freq => {
    const osc = context.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq;
    const bp = context.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = freq;
    bp.Q.value = 6;
    const g = gain(0);
    g.gain.setValueAtTime(0.38, context.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.55);
    osc.connect(bp);
    bp.connect(g);
    osc.start();
    osc.stop(context.currentTime + 0.55);
  });
}

// ── Koppla knappar till ljud ──────────────
document.querySelector('[data-sound="kick"]').addEventListener('mousedown',    () => { resume(); playKick(); });
document.querySelector('[data-sound="snare"]').addEventListener('mousedown',   () => { resume(); playSnare(); });
document.querySelector('[data-sound="hihat"]').addEventListener('mousedown',   () => { resume(); playHihat(); });
document.querySelector('[data-sound="crash"]').addEventListener('mousedown',   () => { resume(); playCrash(); });
document.querySelector('[data-sound="ride"]').addEventListener('mousedown',    () => { resume(); playRide(); });
document.querySelector('[data-sound="tom1"]').addEventListener('mousedown',    () => { resume(); playTom(260); });
document.querySelector('[data-sound="tom2"]').addEventListener('mousedown',    () => { resume(); playTom(180); });
document.querySelector('[data-sound="tom3"]').addEventListener('mousedown',    () => { resume(); playTom(110); });
document.querySelector('[data-sound="cowbell"]').addEventListener('mousedown', () => { resume(); playCowbell(); });

// ── Touch-stöd ────────────────────────────
document.querySelector('[data-sound="kick"]').addEventListener('touchstart',    e => { e.preventDefault(); resume(); playKick(); }, { passive: false });
document.querySelector('[data-sound="snare"]').addEventListener('touchstart',   e => { e.preventDefault(); resume(); playSnare(); }, { passive: false });
document.querySelector('[data-sound="hihat"]').addEventListener('touchstart',   e => { e.preventDefault(); resume(); playHihat(); }, { passive: false });
document.querySelector('[data-sound="crash"]').addEventListener('touchstart',   e => { e.preventDefault(); resume(); playCrash(); }, { passive: false });
document.querySelector('[data-sound="ride"]').addEventListener('touchstart',    e => { e.preventDefault(); resume(); playRide(); }, { passive: false });
document.querySelector('[data-sound="tom1"]').addEventListener('touchstart',    e => { e.preventDefault(); resume(); playTom(260); }, { passive: false });
document.querySelector('[data-sound="tom2"]').addEventListener('touchstart',    e => { e.preventDefault(); resume(); playTom(180); }, { passive: false });
document.querySelector('[data-sound="tom3"]').addEventListener('touchstart',    e => { e.preventDefault(); resume(); playTom(110); }, { passive: false });
document.querySelector('[data-sound="cowbell"]').addEventListener('touchstart', e => { e.preventDefault(); resume(); playCowbell(); }, { passive: false });

// ── Tangentbord ───────────────────────────
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  resume();
  if (e.key === 'a') { playHihat();      document.querySelector('[data-sound="hihat"]').classList.add('slagen'); }
  if (e.key === 's') { playCrash();      document.querySelector('[data-sound="crash"]').classList.add('slagen'); }
  if (e.key === 'd') { playRide();       document.querySelector('[data-sound="ride"]').classList.add('slagen'); }
  if (e.key === 'f') { playTom(260);     document.querySelector('[data-sound="tom1"]').classList.add('slagen'); }
  if (e.key === 'g') { playTom(180);     document.querySelector('[data-sound="tom2"]').classList.add('slagen'); }
  if (e.key === 'h') { playSnare();      document.querySelector('[data-sound="snare"]').classList.add('slagen'); }
  if (e.key === 'j') { playTom(110);     document.querySelector('[data-sound="tom3"]').classList.add('slagen'); }
  if (e.key === 'k') { playCowbell();    document.querySelector('[data-sound="cowbell"]').classList.add('slagen'); }
  if (e.key === 'l') { playKick();       document.querySelector('[data-sound="kick"]').classList.add('slagen'); }
  setTimeout(() => document.querySelectorAll('.slagen').forEach(el => el.classList.remove('slagen')), 130);
});