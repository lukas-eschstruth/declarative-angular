export class RandomIntegerGenerator {
  lastValue?: number;

  constructor(public upperBound: number) {}

  next(): number {
    let int: number;
    do {
      int = Math.ceil(Math.random() * this.upperBound);
    } while (int === this.lastValue);
    this.lastValue = int;
    return int;
  }
}
