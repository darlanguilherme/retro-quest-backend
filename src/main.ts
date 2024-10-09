import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.setGlobalPrefix('/api');
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // app.enableCors({
  //   origin: 'http://localhost:300', // Substitua pela URL do seu frontend
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // Se você estiver usando cookies, por exemplo
  // });


  const port = process.env.PORT || 3003;

  await app.listen(port);
  console.log(`RetroQuest Api is running on port ${port}.`);
}
bootstrap();
