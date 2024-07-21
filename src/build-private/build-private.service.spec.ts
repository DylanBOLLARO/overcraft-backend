import { Test, TestingModule } from "@nestjs/testing";
import { BuildPrivateService } from "./build-private.service";

describe("BuildPrivateService", () => {
	let service: BuildPrivateService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BuildPrivateService]
		}).compile();

		service = module.get<BuildPrivateService>(BuildPrivateService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
