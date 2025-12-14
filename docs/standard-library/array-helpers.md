# Array Helpers

Built-in functions for working with arrays.

## Why this exists

Arrays are fundamental data structures, and helper functions make common operations easier.

## How it works

Array helpers like map and filter take arrays and functions, applying the function to each element.

## Examples

```kx
set numbers = [1, 2, 3, 4, 5]

# Map: transform each element
set doubled = map(numbers, fn(x) { return x * 2 })  # [2, 4, 6, 8, 10]

# Filter: keep elements that match condition
set evens = filter(numbers, fn(x) { return x % 2 == 0 })  # [2, 4]

# Reduce: accumulate values
set sum = reduce(numbers, fn(acc, x) { return acc + x }, 0)  # 15

# ForEach: execute function for each element
forEach(numbers, fn(x) { say x })  # prints each number

# Includes: check if array contains value
set hasThree = includes(numbers, 3)  # true

# IndexOf: find index of value
set index = indexOf(numbers, 3)  # 2

# Slice: get subarray
set firstThree = slice(numbers, 0, 3)  # [1, 2, 3]

# Concat: combine arrays
set moreNumbers = [6, 7]
set combined = concat(numbers, moreNumbers)  # [1, 2, 3, 4, 5, 6, 7]

# Length
set count = len(numbers)  # 5
```

## Common mistakes

- Passing wrong argument types to helpers
- Forgetting that map/filter return new arrays

## Related topics

- [Arrays](../language-basics/arrays.md)
- [Functions](../functions/defining-functions.md)
- [Type Helpers](type-helpers.md)
