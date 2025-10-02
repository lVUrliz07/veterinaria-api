// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- IMPORTANTE
import { User } from './entities/user.entity'; // <-- IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // <-- ¡ESTA ES LA LÍNEA MÁGICA!
  ],
})
export class AuthModule {}
