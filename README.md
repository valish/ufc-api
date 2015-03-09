
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
> ufc.fighter(url, function(data) {
    console.log(data);
  });
> {

  }
```