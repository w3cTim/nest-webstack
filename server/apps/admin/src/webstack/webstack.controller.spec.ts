import { Test, TestingModule } from '@nestjs/testing';
import { WebstackController } from './webstack.controller';

describe('Webstack Controller', () => {
  let controller: WebstackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebstackController],
    }).compile();

    controller = module.get<WebstackController>(WebstackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
