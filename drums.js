const ljudkontext = new (window.AudioContext || window.webkitAudioContext)();

function aktivera() {
  if (ljudkontext.state === 'suspended') ljudkontext.resume();
}

const kompressor = ljudkontext.createDynamicsCompressor();
kompressor.threshold.value = -12;
kompressor.ratio.value     =   4;
kompressor.connect(ljudkontext.destination);

function brusbuffer(sekunder) {
  const langd = Math.floor(ljudkontext.sampleRate * sekunder);
  const buf   = ljudkontext.createBuffer(1, langd, ljudkontext.sampleRate);
  const data  = buf.getChannelData(0);
  for (let i = 0; i < langd; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function forstarkare(varde) {
  const g = ljudkontext.createGain();
  g.gain.value = varde;
  g.connect(kompressor);
  return g;
}

function spelaBastrumma() {
  const t = ljudkontext.currentTime;
  const osc = ljudkontext.createOscillator();
  const g   = forstarkare(0);
  osc.frequency.setValueAtTime(80, t);
  osc.frequency.exponentialRampToValueAtTime(18, t + 0.45);
  g.gain.setValueAtTime(2.8, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  osc.connect(g); osc.start(t); osc.stop(t + 0.5);
}

function spelaVirvel() {
  const t = ljudkontext.currentTime;
  const brus = ljudkontext.createBufferSource();
  brus.buffer = brusbuffer(0.22);
  const hp = ljudkontext.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = 900;
  const g = forstarkare(0);
  g.gain.setValueAtTime(0.85, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  brus.connect(hp); hp.connect(g);
  brus.start(t); brus.stop(t + 0.22);
  const osc = ljudkontext.createOscillator();
  const tg  = forstarkare(0);
  osc.frequency.value = 190;
  tg.gain.setValueAtTime(0.6, t);
  tg.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  osc.connect(tg); osc.start(t); osc.stop(t + 0.12);
}

function spelaHihat() {
  const t = ljudkontext.currentTime;
  const brus = ljudkontext.createBufferSource();
  brus.buffer = brusbuffer(0.09);
  const bp = ljudkontext.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 11000; bp.Q.value = 0.4;
  const g = forstarkare(0);
  g.gain.setValueAtTime(0.38, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  brus.connect(bp); bp.connect(g);
  brus.start(t); brus.stop(t + 0.09);
}

function spelaKrasch() {
  const t = ljudkontext.currentTime;
  const brus = ljudkontext.createBufferSource();
  brus.buffer = brusbuffer(1.8);
  const hp = ljudkontext.createBiquadFilter();
  hp.type = 'highpass'; hp.frequency.value = 4000;
  const g = forstarkare(0);
  g.gain.setValueAtTime(0.6, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
  brus.connect(hp); hp.connect(g);
  brus.start(t); brus.stop(t + 1.8);
}

function spelaRide() {
  const t = ljudkontext.currentTime;
  const brus = ljudkontext.createBufferSource();
  brus.buffer = brusbuffer(0.7);
  const bp = ljudkontext.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 7500; bp.Q.value = 2.5;
  const g = forstarkare(0);
  g.gain.setValueAtTime(0.32, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
  brus.connect(bp); bp.connect(g);
  brus.start(t); brus.stop(t + 0.7);
}

function spelaPukslagare(grundton) {
  const t = ljudkontext.currentTime;
  const osc = ljudkontext.createOscillator();
  const g   = forstarkare(0);
  osc.frequency.setValueAtTime(grundton, t);
  osc.frequency.exponentialRampToValueAtTime(grundton * 0.28, t + 0.35);
  g.gain.setValueAtTime(1.0, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  osc.connect(g); osc.start(t); osc.stop(t + 0.35);
}

function spelaCowbell() {
  const t = ljudkontext.currentTime;
  [562, 845].forEach(freq => {
    const osc = ljudkontext.createOscillator();
    osc.type = 'square'; osc.frequency.value = freq;
    const bp = ljudkontext.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 6;
    const g = forstarkare(0);
    g.gain.setValueAtTime(0.38, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc.connect(bp); bp.connect(g);
    osc.start(t); osc.stop(t + 0.55);
  });
}

const tangentKarta = {
  a: { spela: spelaHihat,                 val: '[data-sound="hihat"]'   },
  s: { spela: spelaKrasch,                val: '[data-sound="crash"]'   },
  d: { spela: spelaRide,                  val: '[data-sound="ride"]'    },
  f: { spela: () => spelaPukslagare(260), val: '[data-sound="tom1"]'    },
  g: { spela: () => spelaPukslagare(180), val: '[data-sound="tom2"]'    },
  h: { spela: spelaVirvel,                val: '[data-sound="snare"]'   },
  j: { spela: () => spelaPukslagare(110), val: '[data-sound="tom3"]'    },
  k: { spela: spelaCowbell,               val: '[data-sound="cowbell"]' },
  l: { spela: spelaBastrumma,             val: '[data-sound="kick"]'    },
};

function utlosaTraff(el) {
  el.classList.remove('slagen');
  void el.offsetWidth;
  el.classList.add('slagen');
  setTimeout(() => el.classList.remove('slagen'), 130);
}

document.querySelectorAll('.trumpad').forEach(pad => {
  const post = Object.values(tangentKarta).find(v => v.val === `[data-sound="${pad.dataset.sound}"]`);
  if (!post) return;
  pad.addEventListener('mousedown', e => {
    e.preventDefault(); aktivera(); post.spela(); utlosaTraff(pad);
  });
  pad.addEventListener('touchstart', e => {
    e.preventDefault(); aktivera(); post.spela(); utlosaTraff(pad);
  }, { passive: false });
});

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const post = tangentKarta[e.key.toLowerCase()];
  if (!post) return;
  aktivera(); post.spela();
  const el = document.querySelector(post.val);
  if (el) utlosaTraff(el);
});

