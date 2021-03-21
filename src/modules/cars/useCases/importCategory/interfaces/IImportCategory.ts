interface IImportCategory {
  execute(file: Express.Multer.File): Promise<void>
}

export { IImportCategory };
