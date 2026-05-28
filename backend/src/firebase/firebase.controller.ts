import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller()
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  // Frontend'den gelen FCM device token'ı backend'e kaydeder
  
  @Post('token')
  saveToken(@Body() body: any) {
    this.firebaseService.setToken(body.token);
    return { ok: true };
  }
}