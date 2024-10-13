import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { UserDetails } from 'src/user-details/entities/user-details.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    default: false,
  })
  isSubscribed: boolean;

  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @OneToMany(() => Rating, (ratings) => ratings.user)
  ratings: Rating[];

  @OneToOne(() => UserDetails, (userDetails) => userDetails.user)
  @JoinColumn()
  userDetails: UserDetails;
}
