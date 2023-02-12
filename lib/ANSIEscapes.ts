export class ANSIEscapes {
  public static eraseLines(lines: number): string {
    return `\u001b[${lines}A`;
  }

  public static clearScreen() {
    return '\u001B[2J';
  }
}
