# Algorithms

## Sorting

### Computational Analysis

#### Analysis

The bubble sort algorithm has an worst case time complexity of `O(n^2)`, since it has 2 nested for loops that go through the entire array. In this example, the algorithm has been slightly optimized, as it only loops through the unsorted part of the array, which does improve performance a bit, but the algorithm still behaves like an `O(n^2)` algo in the worst case.

The insertion sort algorithm also has a worst case time complexity of `O(n^2)`, since it also has two nested loops that traverse the entire array. It is faster than bubble sort, since it only performs j+1 copies instead of 3\*j copies each loop. Again, it has been optimized a bit, but still behaves mostly like an `O(n^2)` in the worst case.

Selection sort is similar to insertion sort, but instead does more comparisons instead of swaps. It only does as many swaps as there are items in the array, but has to perform `n^2` comparisons. Thus, it also ends up as an `O(n^2)` algo.

Javascript's built-in sorting function, [at least running on the v8 engine](https://v8.dev/blog/array-sort), uses Timsort, a hybrid of merge sort and insertion sort. It has a worst-case performance of `O(n log n)`, best-case performance of `O(n)`, and average performance of `O(n log n)`.

#### Data

| Number of Objects | Bubble Sort | Insertion Sort | Selection Sort | Built-in Sort |
| ----------------- | ----------- | -------------- | -------------- | ------------- |
| 1000              | 110.9338655 | 21.74743159    | 45.67461513    | 2.51229394    |
| 2000              | 403.2770572 | 83.58683392    | 171.6920715    | 4.82962935    |
| 3000              | 910.2363267 | 193.7222875    | 392.2523745    | 7.95494459    |
| 4000              | 1626.632564 | 351.0059769    | 702.9222584    | 11.16753266   |
| 5000              | 2567.612992 | 548.6519923    | 1116.986458    | 13.99012056   |
| 6000              | 3833.887149 | 860.5493343    | 1635.57265     | 16.8849648    |
| 7000              | 5261.709881 | 1124.275305    | 2250.333122    | 19.9661986    |
| 8000              | 7043.394565 | 1543.833272    | 2987.25567     | 23.9343923    |
| 9000              | 9547.771962 | 2271.685199    | 4031.247288    | 28.1181272    |
| 10000             | 11946.08544 | 2572.172086    | 5050.478671    | 31.695652     |

We can use regression analysis to create an equation for the data points collected

| Sort Type      | Equation                           | `R^2` |
| -------------- | ---------------------------------- | --- |
| Bubble Sort    | `381 + -0.291x + 1.44E-04x^2`     | 0.999   |
| Insertion Sort | `74.9 + -0.0643x + 3.21E-05x^2`    | 0.994   |
| Selection Sort | `143 + -0.109x + 5.96E-05x^2`    | 0.999   |
| Built-in Sort  | `0.139 + 2.31E-03x + 8.47E-08x^2` | 0.999   |

Bubble Sort, Insertion Sort, and Selection Sort are all expected to be `O(n^2)` sorts, and given the relatively large coefficient of the x^2 term, that seems to be the case. On the other hand, the Built-in Sort is supposed to be an `O(n log(n))` sort, which we can see by the much smaller coefficient our polynomial regression

### Video

- The algorithms with thinner bars seem to be more efficient, requiring fewer comparisions and array accesses than the simpler `O(n^2)` algorithms
- This video provides an interesting visual representation of some of the more advanced sorting algorithms in computer science. While it doesn't fully explain how these algorithms are built, it showcases some of the innate beauty and complexity of some of these well-designed algos.
- The number of bars or delay time may be changed to skew how efficient the algorithm is in practice. For example, the `O(n^2)` algorithms had fewer bars and a shorter delay, making it seem almost as fast as some of the `O(n log n)` algorithms.

## Searching
