interface IDateProvider {
  compareTwoDatesByHour(firstDate: Date, secondDate?: Date): number;
  convertToUTC(date: Date): string;
  compareTwoDatesByDays(firstDate: Date, secondDate?: Date): number;
  dateNow(): Date;
}

export { IDateProvider };
