import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException
} from "@nestjs/common";
import { JwtPayload } from "../../auth/types";
import * as jwt from "jsonwebtoken";

// export const GetCurrentUserId = createParamDecorator(
// 	(_: undefined, context: ExecutionContext): any => {
// 		const request = context.switchToHttp().getRequest();
// 		const user = request.user as JwtPayload;
// 		return user?.sub || undefined;
// 	}
// );

export const GetCurrentUserId = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const authorization = request.headers.authorization;

		if (!authorization) {
			return undefined;
		}

		const token = authorization.split(" ")[1];

		if (!token) {
			throw new UnauthorizedException("Invalid token");
		}

		try {
			const { sub: user_id } = jwt.decode(token);
			return +user_id;
		} catch (error) {
			throw new UnauthorizedException("Invalid token");
		}
	}
);
