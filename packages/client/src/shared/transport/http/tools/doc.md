##### Query Stringify 0.0.1

## Toll to convert <object> to query <string>

`#tool` `#http` `#api` `#fetch` `#get` `#query`

@param `data` <Record<string, any>> - source to convert { a: 1, b: [2 3 4], c: { d:5, e: 6 } }

@terurn `'a=1&b[0]=2&b[1]=3&b[2]=4&c[d]=5&c[e]=6'`