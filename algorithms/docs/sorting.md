# Sorting

## Computational Analysis

### Analysis
The bubble sort algorithm has an average time complexity of `O(n^2)`, since it has 2 nested for loops that go through the entire array. In this example, the algorithm has been slightly optimized, as it only loops through the unsorted part of the array, which does improve performance a bit, but the algorithm still behaves like an `O(n^2)` algo.

The insertion sort algorithm also has an average time complexity of `O(n^2)`, since it also has two nested loops that traverse the entire array. It is faster than bubble sort, since it only performs j+1 copies instead of 3*j copies each loop. Again, it has been optimized a bit, but still behaves mostly like an `O(n^2)` algo.

Selection sort is similar to insertion sort, but instead does more comparisons instead of swaps. It only does as many swaps as there are items in the array, but has to perform `n^2` comparisons. Thus, it also ends up as an `O(n^2)` algo.

Javascript's built-in sorting function, [at least running on the v8 engine](https://v8.dev/blog/array-sort), uses Timsort, a hybrid of merge sort and insertion sort. It has a worst-case performance of `O(n log n)`, best-case performance of `O(n)`, and average performance of `O(n log n)`.

### Data

| Sort Type      | Time at 100 objects | Time at 1000 objects | Time at 10000 objects | Time at 20000 objects |
| -------------- | ------------------- | -------------------- | --------------------- | --------------------- |
| Bubble Sort    | 4.524ms             | 102.46ms             | 10.958s               | 46.910s               |
| Insertion Sort | 0.518ms             | 29.3ms               | 2.273s                | 10.745s               |
| Selection Sort | 0.882ms             | 53.287ms             | 4.553s                | 19.434s               |
| Built-in Sort  | 0.148ms             | 2.02ms               | 36.537ms              | 77.077ms              |

We can use regression analysis to create an equation for the data points collected

| Sort Type      | Equation                           | R^2 |
| -------------- | ---------------------------------- | --- |
| Bubble Sort    | `75.6 + -0.163x + 1.25E-04x^2`     | 1   |
| Insertion Sort | `44.8 + -0.0879x + 3.11E-05x^2`    | 1   |
| Selection Sort | `34.7 + -0.0651x + 5.18E-05x^2`    | 1   |
| Built-in Sort  | `-0.831 + 3.55E-03x + 1.72E-08x^2` | 1   |

Bubble Sort, Insertion Sort, and Selection Sort are all expected to be `O(n^2)` sorts, and given the relatively large coefficient of the x^2 term, that seems to be the case. On the other hand, the Built-in Sort is supposed to be an `O(n log(n))` sort, which we can see by the much smaller coefficient our polynomial regression
