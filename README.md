Choosing the right one depends on what you need. If you just need to just remove decimals, always use `trunc()` or bitwise operators.
The `floor()`, `ceil()` and `round()` are conceptually very different from `trunc()`.

`Math.trunc()` cuts away (truncates) the decimal places.
`Math.round()` rounds towards closest integer number.
`Math.floor()` rounds towards closest lower integer number. 3.5 -> 3 -3.5 -> -4
`Math.ceil()` rounds towards closest higher integer number. 3.5 -> 4 -3.5 -> -3

