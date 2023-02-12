import { BlockFonts } from './BlockFonts';
import { Chalk } from './Chalk';
import { Clock } from './Clock';
import { ClockDisplay } from '../types/ClockDisplay';
import { Time } from '../types/Time';

export class RainbowClock24 implements ClockDisplay {
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
