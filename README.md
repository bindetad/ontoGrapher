# React komponenta pro vytváření diagramů v OntoUML
Webová komponenta v technologii React sloužící ke grafické manipulaci s OntoUML diagramy.

## Požadavky
* npm
* webový prohlížeč s vypnutým CORS ([příklad, jak vypnout CORS v Chromu](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome))

## Instrukce
Po stažení extrahujte do libovolného adresáře a nainstalujte závislosti pomocí příkazu `npm install`.

## Návod k použítí
Kompomentu spustíte příkazem `npm start`. V nabídkovém panelu klikněte na "Help". V případě, že chcete použít komponentu v režimu pouze pro čtení, otevřete soubor index.js, kde vyměňte: `<DiagramApp />` na: `<DiagramApp
readOnly={true}
loadDiagram={diagram}
/>
`
, kde "diagram" je serializace diagramu.
