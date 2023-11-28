import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Public } from './decorators/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(
    @Body() signInDto: { password: string; mobile: string; platform?: string },
  ) {
    console.log(signInDto);

    const access_token_res = await this.authService.signIn(
      signInDto.mobile,
      signInDto.password,
    );
    console.info(access_token_res);
    if (access_token_res.access_token) {
      return {
        code: 200,
        message: 'success',
        data: {
          access_token: access_token_res.access_token,
          expires_in: 36000000,
          type: 'Bearer',
        },
      };
    } else {
      return {
        code: 400,
        message: '登录用户名或密码填写错误! ',
        meta: {
          error_line: 41,
        },
      };
    }
  }

  @Post('logout')
  async logout(@Body() body: any) {
    console.info(body);
    return {
      code: 200,
      message: 'success',
      data: {},
    };
  }
}
