import { ClockDisplay } from '../types/ClockDisplay';
import { ANSIEscapes } from './ANSIEscapes';
import { Clock } from './Clock';

export class ConsoleClock {
  public static render(display: ClockDisplay): void {
    process.stdout.write(ANSIEscapes.eraseLines(2));
    console.log(display.display(Clock.getTime()));
  }
}
