import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PostService } from 'src/posts/posts.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
    private postsService: PostService,
  ) {}

  async findAll() {
    return this.ratingRepo.find({
      relations: {
        user: true,
        post: true,
      },
    });
  }

  async create(createRatingDto: CreateRatingDto) {
    const foundPost = await this.postsService.findOne(createRatingDto.postId);

    if (foundPost.user.id === createRatingDto.userId) {
      throw new Error('Operation not permitted');
    }

    const foundRatingByUser = await this.ratingRepo.findOneBy({
      user: {
        id: createRatingDto.userId,
      },
      post: {
        id: createRatingDto.postId,
      },
    });

    if (foundRatingByUser) {
      this.ratingRepo.remove(foundRatingByUser);
    }

    return this.ratingRepo.save({
      rating: createRatingDto.rating,
      post: {
        id: createRatingDto.postId,
      },
      user: {
        id: createRatingDto.userId,
      },
    });
  }

  async findRatingByUserAndPost(userId: string, postId: number) {
    const foundRating = await this.ratingRepo.findOneBy({
      user: {
        id: userId,
      },
      post: {
        id: postId,
      },
    });

    console.log(foundRating);

    return foundRating;
  }

  findOne(id: number) {
    return this.ratingRepo.findOneBy({ id });
  }

  //   update(id: number, updateRatingDto: UpdateRatingDto) {
  //     return `This action updates a #${id} comment`;
  //   }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
