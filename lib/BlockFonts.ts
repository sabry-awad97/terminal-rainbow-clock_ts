export class BlockFonts {
  public static toBlock(text: string): string {
    return ` ${text} `;
  }

  public static mapBlock(
    block: string,
    color: (text: string) => string
  ): string {
    return color(block);
  }

  public static concatBlocks(...blocks: string[]): string {
    return blocks.join('');
  }

  public static toString(text: string): string {
    return text;
  }
}
