import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../interfaces/IDateProvider';

dayjs.extend(utc);

class DateProvider implements IDateProvider {
  compareTwoDatesByHour(firstDate: Date, secondDate = new Date()): number {
    const formattedFirstDate = this.convertToUTC(firstDate);
    const formattedSecondDate = this.convertToUTC(secondDate);

    return dayjs(formattedFirstDate).diff(formattedSecondDate, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareTwoDatesByDays(firstDate: Date, secondDate = new Date()): number {
    const formattedFirstDate = this.convertToUTC(firstDate);
    const formattedSecondDate = this.convertToUTC(secondDate);

    return dayjs(formattedFirstDate).diff(formattedSecondDate, 'days');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DateProvider };
