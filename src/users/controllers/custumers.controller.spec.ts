import { Test, TestingModule } from '@nestjs/testing';
import { CustumersController } from './custumers.controller';

describe('CustumersController', () => {
  let controller: CustumersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustumersController],
    }).compile();

    controller = module.get<CustumersController>(CustumersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
