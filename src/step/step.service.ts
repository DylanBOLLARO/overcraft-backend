import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBuildDto } from 'src/build/dto/update-build.dto';

@Injectable()
export class StepService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(createStep: CreateStepDto) {
		const { build_id, position, timer, population } = createStep;
		await this.prismaService.build_step.create({
			data: {
				...createStep,
				build_id: +build_id,
				position: +position,
				timer: +timer,
				population: +population
			}
		});
	}

	async findAll() {
		return this.prismaService.build_step.findMany();
	}

	async findOne(id: number) {
		return this.prismaService.build_step.findUniqueOrThrow({
			where: {
				id,
			}
		})
	}

	async update(id: number, updateStep: UpdateStepDto) {
		const { build_id, position, timer, population } = updateStep;
		await this.prismaService.build_step.update({
			where: {
				id,
			},
			data: {
				...updateStep,
				build_id: +build_id,
				position: +position,
				timer: +timer,
				population: +population
			}
		});
	}

	async delete(id: number) {
		return this.prismaService.build_step.delete({
			where: {
				id,
			}
		})
	}

	async up(id: number) {
		console.log(id);

		const { id: step_id } = await this.prismaService.build.findUniqueOrThrow({
			where: {
				id
			},
		});

		try {
			await this.prismaService.$transaction(async (tx) => {
				const record1: UpdateBuildDto = await this.prismaService.build.findUniqueOrThrow({
					where: { id }
				});

				const record2: UpdateBuildDto = await this.prismaService.build.findUniqueOrThrow({
					where: { id: step_id }
				});

				if (!record1 || !record2) {
					throw new Error("L'un des IDs n'existe pas dans la table.");
				}

				const tempId = -1;
				const tempId2 = -2;

				await this.prismaService.build_step.update({
					where: { id },
					data: { id: tempId }
				});

				await this.prismaService.build_step.update({
					where: { id: step_id },
					data: { id: tempId2 }
				});

				// 3. Interversion des valeurs d'ID
				await this.prismaService.build_step.update({
					where: { id: tempId },
					data: { id: step_id }
				});
				await this.prismaService.build_step.update({
					where: { id: tempId2 },
					data: { id }
				});
			});
			console.log('Les IDs ont été intervertis avec succès !');
		} catch (error) {
			console.error('Une erreur est survenue :', error);
		} finally {
			await this.prismaService.$disconnect();
		}
	}

	async down(id: number) {
		const { id: step_id } = await this.prismaService.build_step.findUniqueOrThrow({
			where: {
				id
			},
		});

		try {
			await this.prismaService.$transaction(async (tx) => {
				const record1: UpdateBuildDto = await this.prismaService.build.findUniqueOrThrow({
					where: { id }
				});

				const record2: UpdateBuildDto = await this.prismaService.build.findUniqueOrThrow({
					where: { id: step_id }
				});

				if (!record1 || !record2) {
					throw new Error("L'un des IDs n'existe pas dans la table.");
				}

				const tempId = -1;
				const tempId2 = -2;

				await this.prismaService.build_step.update({
					where: { id },
					data: { id: tempId }
				});

				await this.prismaService.build_step.update({
					where: { id: step_id },
					data: { id: tempId2 }
				});

				// 3. Interversion des valeurs d'ID
				await this.prismaService.build_step.update({
					where: { id: tempId },
					data: { id: step_id }
				});
				await this.prismaService.build_step.update({
					where: { id: tempId2 },
					data: { id }
				});
			});
			console.log('Les IDs ont été intervertis avec succès !');
		} catch (error) {
			console.error('Une erreur est survenue :', error);
		} finally {
			await this.prismaService.$disconnect();
		}
	}


}
