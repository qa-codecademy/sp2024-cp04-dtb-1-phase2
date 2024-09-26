import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private usersService: UsersService,
  ) {}

  async sendMail() {
    console.log('mail function called');
    const subscribedUsers = await this.usersService.findAllSubscribedUsers();
    console.log(subscribedUsers.map((user) => user.email).join(''));
    try {
      await this.mailerService.sendMail({
        to: subscribedUsers.map((user) => user.email).join(''),
        from: 'techspheresite@gmail.com', // sender address
        subject: 'New post in Tech Sphere',
        text: 'New post is just created, visit our site and check it out!', // plaintext body
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
