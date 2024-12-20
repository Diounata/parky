import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.['auth-jwt-token'];

    if (!token) throw new UnauthorizedException();

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        sub: tokenPayload.sub,
      };

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
