interface Time {
  hour: number;
  minute: number;
  second: number;
}

interface ClockDisplay {
  display(time: Time): string;
}

class ANSIEscapes {
  public static eraseLines(lines: number): string {
    return `\u001b[${lines}A`;
  }

  public static clearScreen() {
    return '\u001B[2J';
  }
}

class Chalk {
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

class BlockFonts {
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

class Clock {
  public static leftPad(number: number): string {
    return number < 10 ? `0${number}` : String(number);
  }

  public static getTime(): Time {
    const date = new Date();

    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  }
}

class RainbowClock12 implements ClockDisplay {
  public display(time: Time): string {
    const { hour, minute, second } = time;

    let ampmHour = hour % 12;

    if (ampmHour === 0) {
      ampmHour = 12;
    }

    const hourBlock = BlockFonts.toBlock(Clock.leftPad(ampmHour));
    const minuteBlock = BlockFonts.toBlock(Clock.leftPad(minute));
    const secondBlock = BlockFonts.toBlock(Clock.leftPad(second));
    const sepBlock = BlockFonts.toBlock(':');
    const ampmBlock = BlockFonts.toBlock(hour >= 12 ? ' PM' : ' AM');

    return BlockFonts.toString(
      BlockFonts.concatBlocks(
        BlockFonts.mapBlock(hourBlock, Chalk.red),
        sepBlock,
        BlockFonts.mapBlock(minuteBlock, Chalk.yellow),
        sepBlock,
        BlockFonts.mapBlock(secondBlock, Chalk.blue),
        ampmBlock
      )
    );
  }
}

class RainbowClock24 implements ClockDisplay {
  public display(time: Time): string {
    const { hour, minute, second } = time;

    const hourBlock = BlockFonts.toBlock(Clock.leftPad(hour));
    const minuteBlock = BlockFonts.toBlock(Clock.leftPad(minute));
    const secondBlock = BlockFonts.toBlock(Clock.leftPad(second));
    const sepBlock = BlockFonts.toBlock(':');
    return BlockFonts.toString(
      BlockFonts.concatBlocks(
        BlockFonts.mapBlock(hourBlock, Chalk.red),
        sepBlock,
        BlockFonts.mapBlock(minuteBlock, Chalk.yellow),
        sepBlock,
        BlockFonts.mapBlock(secondBlock, Chalk.blue)
      )
    );
  }
}

class ConsoleClock {
  public static render(display: ClockDisplay): void {
    process.stdout.write(ANSIEscapes.eraseLines(2));
    console.log(display.display(Clock.getTime()));
  }
}

let display: ClockDisplay = new RainbowClock12();
setInterval(() => ConsoleClock.render(display), 1000);

process.stdout.write(ANSIEscapes.clearScreen());
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', buffer => {
  // toggle between the two formats by pressing the 'b' key
  if (buffer[0] === 0x62) {
    display =
      display instanceof RainbowClock12
        ? new RainbowClock24()
        : new RainbowClock12();
  } else {
    process.exit();
  }
});
