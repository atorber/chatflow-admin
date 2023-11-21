import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
