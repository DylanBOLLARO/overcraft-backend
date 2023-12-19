import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}


    async signup(dataForCreateAccount: SignupDto) {
        const { username, email, password } = dataForCreateAccount;

        const user = await this.prismaService.user.findFirst({
            where: { email }
        });

        if (user) throw new ConflictException('Email already exists.');

        const hashedPassword = await bcrypt.hash(
            password + this.configService.get<string>('HASH_PASSWORD_SECRET'),
            5
        );

        let createdUser = await this.prismaService.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        delete createdUser.password

        return createdUser
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;

        console.log({ email, password });
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });

        if (!user) throw new NotFoundException('User not found');

        const IsSamePassword = await bcrypt.compare(
            password + this.configService.get<string>('HASH_PASSWORD_SECRET'),
            user.password
        );

        if (!IsSamePassword)
            throw new UnauthorizedException('Password does not match');

        const payLoad = {
            sub: user.id,
            email: user.email
        };

        const token = this.jwtService.sign(payLoad, {
            expiresIn: '6h',
            secret: this.configService.get<string>('JWT_SECRET')
        });
        return {
            accessToken: token,
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        };
    }
}
