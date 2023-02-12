import { Time } from './Time';

export interface ClockDisplay {
  display(time: Time): string;
}
