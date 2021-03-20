import { SpecificationRepositoryImpl } from '../../repositories/implementations/SpecificationRepositoryImpl';
import { ListSpecificationUseCase } from './implementations/ListSpecificationUseCase';
import { ListSpecificationController } from './ListSpecificationController';

const specificationRepository = SpecificationRepositoryImpl.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(specificationRepository);
const listSpecificationController = new ListSpecificationController(listSpecificationUseCase);

export { listSpecificationController };
