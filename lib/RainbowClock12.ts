import { BlockFonts } from './BlockFonts';
import { Chalk } from './Chalk';
import { Clock } from './Clock';
import { ClockDisplay } from '../types/ClockDisplay';
import { Time } from '../types/Time';

export class RainbowClock12 implements ClockDisplay {
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
