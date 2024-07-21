import { Test, TestingModule } from "@nestjs/testing";
import { BuildPublicService } from "./build-public.service";

describe("BuildPublicService", () => {
	let service: BuildPublicService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BuildPublicService]
		}).compile();

		service = module.get<BuildPublicService>(BuildPublicService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
