// Fixed 100 ms real-time steps; one step is one simulated minute at 1x.
// Background tabs and stalls over a second do not consume emergency reserves.
export class SimulationClock {
  private remainder = 0;
  advance(elapsedMs: number, speed: number, active: boolean): number {
    if (!active || !Number.isFinite(elapsedMs) || elapsedMs < 0 || elapsedMs > 1000) {
      this.remainder = 0;
      return 0;
    }
    this.remainder += elapsedMs;
    const steps = Math.floor((this.remainder + 1e-6) / 100);
    this.remainder -= steps * 100;
    return steps * speed / 60;
  }
}
