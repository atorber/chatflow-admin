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
import { EmoticonController } from './modules/emoticons/emoticon.controller';
import { EmoticonModule } from './modules/emoticons/emoticon.module';
import { UploadModule } from './modules/upload/upload.module';
import { NoticesService } from './modules/notices/notices.service';
import { NoticesController } from './modules/notices/notices.controller';
import { NoticesModule } from './modules/notices/notices.module';
import { QasService } from './modules/qas/qas.service';
import { QasController } from './modules/qas/qas.controller';
import { QasModule } from './modules/qas/qas.module';
import { GroupnoticesService } from './modules/groupnotices/groupnotices.service';
import { GroupnoticesController } from './modules/groupnotices/groupnotices.controller';
import { GroupnoticesModule } from './modules/groupnotices/groupnotices.module';
import { WhitelistsService } from './modules/whitelists/whitelists.service';
import { WhitelistsController } from './modules/whitelists/whitelists.controller';
import { WhitelistsModule } from './modules/whitelists/whitelists.module';
import { KeywordsService } from './modules/keywords/keywords.service';
import { KeywordsController } from './modules/keywords/keywords.controller';
import { KeywordsModule } from './modules/keywords/keywords.module';
import { StatisticsService } from './modules/statistics/statistics.service';
import { StatisticsController } from './modules/statistics/statistics.controller';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { OrdersService } from './modules/orders/orders.service';
import { OrdersController } from './modules/orders/orders.controller';
import { OrdersModule } from './modules/orders/orders.module';
import { ChatbotsService } from './modules/chatbots/chatbots.service';
import { ChatbotsController } from './modules/chatbots/chatbots.controller';
import { ChatbotsModule } from './modules/chatbots/chatbots.module';
import { CopilotService } from './modules/copilot/copilot.service';
import { CopilotController } from './modules/copilot/copilot.controller';
import { CopilotModule } from './modules/copilot/copilot.module';

@Module({
  imports: [
    RoomsModule,
    AuthModule,
    UsersModule,
    ContactsModule,
    ChatsModule,
    EmoticonModule,
    UploadModule,
    NoticesModule,
    QasModule,
    GroupnoticesModule,
    WhitelistsModule,
    KeywordsModule,
    StatisticsModule,
    OrdersModule,
    ChatbotsModule,
    CopilotModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ContactsController,
    ChatsController,
    EmoticonController,
    NoticesController,
    QasController,
    GroupnoticesController,
    WhitelistsController,
    KeywordsController,
    StatisticsController,
    OrdersController,
    ChatbotsController,
    CopilotController,
  ],
  providers: [
    AppService,
    ContactsService,
    ChatsService,
    NoticesService,
    QasService,
    GroupnoticesService,
    WhitelistsService,
    KeywordsService,
    StatisticsService,
    OrdersService,
    ChatbotsService,
    CopilotService,
  ],
})
export class AppModule {}
