# Math

Built-in mathematical functions and constants.

## Why this exists

Math operations are fundamental to many programs, so they're available without external dependencies.

## How it works

Math functions operate on numbers and return numeric results. Constants like pi and e are available.

## Examples

```kx
use math { pi, e, sin, cos, sqrt }

set circleArea = pi * radius * radius
set hypotenuse = sqrt(a*a + b*b)
set angle = sin(theta)

# Number utilities
set rounded = round(3.7)  # 4
set floored = floor(3.7)  # 3
set ceiled = ceil(3.2)  # 4
set clamped = clamp(5, 0, 10)  # 5 (between 0 and 10)

# Check number properties
set nanCheck = isNaN("not a number")  # false
set finiteCheck = isFinite(1/0)  # false
```

## Common mistakes

- Forgetting to import math functions
- Using degrees instead of radians for trig functions

## Related topics

- [Math Extra](math-extra.md)
- [Numbers](../language-basics/numbers.md)
- [Number Operations](../language-basics/number-operations.md)
