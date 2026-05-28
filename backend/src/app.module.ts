import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainService } from './blockchain/blockchain.service';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseController } from './firebase/firebase.controller';

@Module({
  imports: [],
  controllers: [AppController, FirebaseController],
  providers: [AppService, BlockchainService, FirebaseService],
})
export class AppModule {}
