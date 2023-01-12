// Simple implementation of bisection method. Ideally something more complicated like Newton-Raphson would be used. JavaScript is not really a good language for these operations.
export default function bisection(
  func: (x: number, y: number) => number,
  target: number,
  a: number,
  b: number,
  tolerance: number,
  maxIter: number,
  y: number
): number {
  let midpoint = (a + b) / 2;
  let value = func(midpoint, y);
  let iter = 0;
  while (Math.abs(value - target) > tolerance || maxIter > iter) {
    iter++;
    if (value > target) {
      b = midpoint;
    } else {
      a = midpoint;
    }
    midpoint = (a + b) / 2;
    value = func(midpoint, y);
  }
  return midpoint;
}
