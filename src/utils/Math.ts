/**
 * Implement % operator for numbers. 
 *
 * @param n - The number.
 * @param m - The modulo.
 * @returns Result of modulo
 */
export function mod(n, m) {
  return ((n % m) + m) % m;
}