export class Chalk {
  public static red(text: string): string {
    return `\u001b[31m${text}\u001b[0m`;
  }

  public static yellow(text: string): string {
    return `\u001b[33m${text}\u001b[0m`;
  }

  public static blue(text: string): string {
    return `\u001b[34m${text}\u001b[0m`;
  }
}
