import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/implementations/CreateCategoryUseCase';
import { AppError } from '@shared/core/errors/AppError';

describe('Create Category Use Case', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Test Description',
    };
    const createSpyOn = jest.spyOn(categoriesRepositoryInMemory, 'create');
    await createCategoryUseCase.execute(category);
    const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

    expect(createSpyOn).toHaveBeenCalled();
    expect(createdCategory).toHaveProperty('name');
    expect(createdCategory).toHaveProperty('description');
  });

  it('Should not be able to create an existent category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Test Description',
    };
    await categoriesRepositoryInMemory.create(category);
    const createSpyOn = jest.spyOn(categoriesRepositoryInMemory, 'create');
    const findByNameSpyOn = jest.spyOn(categoriesRepositoryInMemory, 'findByName');

    expect(async () => {
      await createCategoryUseCase.execute(category);
      expect(findByNameSpyOn).toHaveBeenCalled();
      expect(createSpyOn).toHaveBeenCalledTimes(0);
    }).rejects.toBeInstanceOf(AppError);
  });
});
