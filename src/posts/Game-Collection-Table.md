---
layout: "base.njk"
tile: "Game collection"
tag: "gcollection"
desc: "A database of my games i own and on what system."
---

```json:table
{
    "fields" : [
        {"key": "a", "label": "Game Title"},
        {"key": "b", "label": "Placeholder"},
        {"key": "c", "label": "Playstation,Steam,Xbox,Nintendo,Computer"}
    ],
    "items" : [
      {"a": "Diablo 3", "b": "", "c": "Px3,S,Nx3"},
      {"a": "Diablo 2", "b": "", "c": "C"}
    ],
    "filter" : true
}
```