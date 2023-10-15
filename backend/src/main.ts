import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
// import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // enable cors in NEST
  app.use(
    session({
      secret: 'cise',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(passport.initialize());
  // app.use(passport.session());

  dotenv.config();
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
