import { ANSIEscapes } from './lib/ANSIEscapes';
import { ClockDisplay } from './types/ClockDisplay';
import { ConsoleClock } from './lib/ConsoleClock';
import { RainbowClock12 } from './lib/RainbowClock12';
import { RainbowClock24 } from './lib/RainbowClock24';

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
