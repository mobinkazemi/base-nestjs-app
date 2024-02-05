import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class sampleMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: any, res: any, next: (error?: any) => void) {
    console.log(req.url);
    // console.log(await this.redisService.getHello());

    next();
  }
}
