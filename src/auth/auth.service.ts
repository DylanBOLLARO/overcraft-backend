import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, Tokens } from "./types";
import { SignupAuthDto } from "./dto";
import { SigninAuthDto } from "./dto/signin-auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async refreshTokens(userId: number, rt: string): Promise<Tokens> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user || !user.refresh_token)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const rtMatches = await bcrypt.compare(rt, user.refresh_token);

		if (!rtMatches)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRtHash(user.id, tokens.refresh_token);

		return tokens;
	}

	async updateRtHash(userId: number, rt: string): Promise<void> {
		const hashPassword = bcrypt.hashSync(rt, 10);

		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				refresh_token: hashPassword
			}
		});
	}

	async getTokens(userId: number, email: string): Promise<Tokens> {
		const jwtPayload: JwtPayload = {
			sub: userId,
			email: email
		};

		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(jwtPayload, {
				secret: this.configService.get<string>("AT_SECRET"),
				expiresIn: "7d"
			}),
			this.jwtService.signAsync(jwtPayload, {
				secret: this.configService.get<string>("RT_SECRET"),
				expiresIn: "7d"
			})
		]);

		return {
			access_token: at,
			refresh_token: rt
		};
	}

	async signup(signup: SignupAuthDto) {
		const { email, password } = signup;
		const hashPassword = bcrypt.hashSync(password, 10);

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (user)
			throw new ConflictException({
				statusCode: HttpStatus.CONFLICT,
				message:
					"The provided email address is already in use. Please use a different email for registration."
			});

		const userCreated = await this.prismaService.user.create({
			data: {
				...signup,
				password: hashPassword
			}
		});

		const tokens = await this.getTokens(userCreated.id, userCreated.email);
		await this.updateRtHash(userCreated.id, tokens.refresh_token);

		return tokens;
	}

	async signToken(
		userId: number,
		email: string
	): Promise<{ access_token: string }> {
		const payload = {
			sub: userId,
			email
		};
		const secret = this.configService.get("AT_SECRET");

		const token = await this.jwtService.signAsync(payload, {
			expiresIn: "7d",
			secret: secret
		});

		return {
			access_token: token
		};
	}

	async signin(signinAuth: SigninAuthDto) {
		const { email, password } = signinAuth;

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (!user)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches)
			throw new ConflictException({
				statusCode: HttpStatus.FORBIDDEN,
				message: "Access Denied"
			});

		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRtHash(user.id, tokens.refresh_token);

		return tokens;
	}

	async logout(userId: number): Promise<boolean> {
		await this.prismaService.user.updateMany({
			where: {
				id: userId,
				refresh_token: {
					not: null
				}
			},
			data: {
				refresh_token: null
			}
		});
		return true;
	}

	async me(userId: number): Promise<any> {
		let me = await this.prismaService.user.findUniqueOrThrow({
			where: {
				id: userId
			}
		});
		delete me.password;
		return me;
	}
}
