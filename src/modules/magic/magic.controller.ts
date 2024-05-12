import { Controller, Post, Body } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
// import * as path from 'path';
import { drawPosterWithText, downloadImage } from './poster.js';

const IS_PUBLIC_KEY = 'isPublic';
const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Controller('api/v1/magic')
export class MagicController {
  @Public()
  @Post('poem-poster')
  async posterCreate(
    @Body()
    body: {
      title: string;
      text: string;
      image_url: string;
    },
  ) {
    console.log(body);
    // 诗词生成海报
    /*
    {
      "action": "poem-poster",
      "parms": {
          "title": "春联",
          "text": "春联题材广无边，福寿康宁喜气添。家国情怀展宏图，吉祥如意庆丰年。",
          "image_url": "https://lf-plugin-resouce.oceancloudapi.com/obj/bot-studio-platform-plugin-tos/artist/image/44f743db3d514657bd0648de9ca5869e.png"
      }
  }
  */
    const { title, text, image_url } = body;
    try {
      //   const uuid = Math.random().toString(36).substr(2, 8);
      const outputPath = 'temp';
      const imagePath = await downloadImage(image_url, outputPath);
      console.info('downloadImage imagePath', imagePath);

      // 生成海报
      const outputFileName = await drawPosterWithText(
        imagePath,
        title,
        text,
        outputPath,
      );

      return {
        code: 200,
        message: 'success',
        data: {
          url: outputFileName,
        },
      };
    } catch (e) {
      console.error(e);
      return {
        code: 500,
        message: 'fail',
        data: e,
      };
    }
  }
}
