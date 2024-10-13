import { Module } from '@nestjs/common';
import { UserDetailsController } from './user-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from './entities/user-details.entity';
import { UserDetailsService } from './user-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetails])],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
})
export class UserDetailsModule {}
