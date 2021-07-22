interface IDateProvider {
  compareTwoDatesByHour(firstDate: Date, secondDate?: Date): number;
  convertToUTC(date: Date): string;
}

export { IDateProvider };
