import { Time } from '../types/Time';

export class Clock {
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
