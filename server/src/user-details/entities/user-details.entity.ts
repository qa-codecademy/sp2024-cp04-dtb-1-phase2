import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phoneNumber: number;

  @Column()
  age: number;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToOne(() => User, (user) => user.userDetails)
  user: User;
}
