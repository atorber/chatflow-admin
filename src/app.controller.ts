import {
  Body,
  Controller,
  Request,
  Post,
  Get,
  // UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
// import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() signInDto: Record<string, any>) {
    const access_token_res = this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return {
      code: 200,
      message: 'success',
      data: {
        access_token: (await access_token_res).access_token,
        expires_in: 36000000,
        type: 'Bearer',
      },
    };
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Public()
  @Get('auth/loginGet')
  async loginGet(@Query() query: any, @Request() req: any) {
    console.info(query);
    return this.authService.login(req.user);
  }
}
