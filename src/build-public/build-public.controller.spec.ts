import { Test, TestingModule } from "@nestjs/testing";
import { BuildPublicController } from "./build-public.controller";
import { BuildPublicService } from "./build-public.service";

describe("BuildPublicController", () => {
	let controller: BuildPublicController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BuildPublicController],
			providers: [BuildPublicService]
		}).compile();

		controller = module.get<BuildPublicController>(BuildPublicController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
