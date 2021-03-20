import { SpecificationRepositoryImpl } from '../../repositories/implementations/SpecificationRepositoryImpl';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './implementations/CreateSpecificationUseCase';

const specificationRepository = SpecificationRepositoryImpl.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };
