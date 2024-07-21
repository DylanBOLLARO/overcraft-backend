import { Test, TestingModule } from "@nestjs/testing";
import { BuildPrivateController } from "./build-private.controller";
import { BuildPrivateService } from "./build-private.service";

describe("BuildPrivateController", () => {
	let controller: BuildPrivateController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BuildPrivateController],
			providers: [BuildPrivateService]
		}).compile();

		controller = module.get<BuildPrivateController>(BuildPrivateController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
