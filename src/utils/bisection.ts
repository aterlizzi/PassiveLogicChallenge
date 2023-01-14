// Simple implementation of bisection method. Ideally something more complicated like Newton-Raphson would be used. JavaScript is not really a good language for these operations.
export default function bisection(
  func: (x: number, y: number, Tc: number, Pc: number) => number,
  target: number,
  upperBound: number,
  lowerBound: number,
  tolerance: number,
  maxIter: number,
  y: number,
  isYFirst: boolean,
  Tc: number,
  Pc: number
): number {
  let a = upperBound
  let b = lowerBound
  let midpoint = (a + b) / 2
  let value = isYFirst ? func(y, midpoint, Tc, Pc) : func(midpoint, y, Tc, Pc)
  let iter = 0
  while (Math.abs(value - target) > tolerance && maxIter > iter) {
    iter++
    if (value > target) {
      b = midpoint
    } else {
      a = midpoint
    }
    midpoint = (a + b) / 2
    value = isYFirst ? func(y, midpoint, Tc, Pc) : func(midpoint, y, Tc, Pc)
  }
  return midpoint
}
