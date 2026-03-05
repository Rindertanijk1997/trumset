# Drum Kit 

En webbapp där du kan spela trummor i webbläsaren — utan några ljudfiler eller bibliotek.

## Filer
```
drumkit/
├── index.html   — struktur och layout
├── style.css    — design
└── drums.js     — ljud och logik
```

## Kom igång

Ladda ner filerna, lägg dem i samma mapp och öppna `index.html` i webbläsaren. Klart.

## Spela

Du kan spela på två sätt:

**Tangentbord**
| Tangent | Trumma   |
|---------|----------|
| A       | Hi-hat   |
| S       | Crash    |
| D       | Ride     |
| F       | Tom 1    |
| G       | Tom 2    |
| H       | Snare    |
| J       | Floor    |
| K       | Cowbell  |
| L       | Kick     |

**Mus / touch** — klicka eller tryck på trummorna direkt.

## Hur ljuden fungerar

Ljuden skapas i realtid med **Web Audio API** — ett inbyggt webb-API som finns i alla moderna webbläsare. Inga ljudfiler laddas ner.

Det finns två typer av ljud:

- **Oscillator** — genererar en ton på en viss frekvens. Används till kick och toms där frekvensen sjunker snabbt för att ge ett "boom"-ljud.
- **Brus + filter** — slumpmässiga tal filtreras till metalliska ljud. Används till hihat, crash och ride.

## Ändra ljuden

Öppna `drums.js` och hitta funktionen för den trumma du vill ändra.

**Mörkare/ljusare ton** — ändra `frequency.value`  
**Längre/kortare ljud** — ändra tidsvärdet i `exponentialRampToValueAtTime`  
**Högre/lägre volym** — ändra värdet i `gain.setValueAtTime`

## Teknik

- Vanilla JavaScript — inga ramverk
- Web Audio API — ljud
- CSS — design med platta färger och `border-bottom` för djupkänsla
- Klassnamn på svenska (BEM-inspirerat)