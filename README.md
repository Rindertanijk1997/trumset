# Drum Kit 

En webbapp där du kan spela trummor i webbläsaren.

🔗 **[Spela här](https://rindertanijk1997.github.io/trumset/)**

## Filer
```
trumset/
├── index.html   — struktur och layout
├── style.css    — design
└── drums.js     — ljud och logik
```

## Spela

**Tangentbord**
| Tangent | Trumma  |
|---------|---------|
| A       | Hi-hat  |
| S       | Crash   |
| D       | Ride    |
| F       | Tom 1   |
| G       | Tom 2   |
| H       | Snare   |
| J       | Floor   |
| K       | Cowbell |
| L       | Kick    |

**Mus / touch** — klicka eller tryck på trummorna direkt.

## Hur ljuden fungerar

Ljuden skapas i realtid med **Web Audio API** — inbyggt i alla moderna webbläsare. Inga ljudfiler, inga bibliotek.

- **Oscillator** — ton som sjunker i frekvens. Används till kick och toms.
- **Brus + filter** — slumptal filtreras till metalliska ljud. Används till hihat, crash och ride.

## Teknik

- Vanilla JavaScript, HTML och CSS
- Web Audio API
