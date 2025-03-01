import { Request, Response, NextFunction } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`req`, req.url);
  next();
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
});
