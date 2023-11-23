import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { ContactsController } from './modules/contacts/contacts.controller';
import { ContactsService } from './modules/contacts/contacts.service';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ChatsController } from './modules/chats/chats.controller';
import { ChatsService } from './modules/chats/chats.service';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [RoomsModule, AuthModule, UsersModule, ContactsModule, ChatsModule],
  controllers: [
    AppController,
    UsersController,
    ContactsController,
    ChatsController,
  ],
  providers: [AppService, ContactsService, ChatsService],
})
export class AppModule {}
