
# UFC Fighter API

Crawls and parses fighter data from UFC.com fighter profiles

## Install
From source:

```
git clone https://github.com/valish/ufc-api
cd ufc-api
npm install
```
From npm:

`npm install ufc`

## Use
```
> var ufc = require('ufc');
> var url = "http://www.ufc.com/fighter/Jon-Jones"
> ufc.getFighter(url, function(data) {
    console.log(data);
  });
> {
  "name": "Jon Jones",
  "nickname": "Bones",
  "fullname": "Jon \"Bones\" Jones",
  "hometown": "Rochester, New York USA",
  "location": "Endicott, New York USA",
  "age": "27",
  "height": "6' 4\"",
  "height_cm": "193",
  "weight": "205",
  "weight_kg": "93",
  "record": "21-1-0",
  "college": "Iowa Central",
  "degree": "Associates Degree",
  "summary": [
    "Wrestling",
    "jiu-jitsu",
    "muay thai"
  ],
  "strikes": {
    "attempted": 1679,
    "successful": 916,
    "standing": 541,
    "clinch": 188,
    "ground": 187
  },
  "takedowns": {
    "attempted": 64,
    "successful": 33,
    "submissions": 10,
    "passes": 22,
    "sweeps": 0
  }
  "fights": []
}
```
