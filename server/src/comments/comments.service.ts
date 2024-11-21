import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { GetCommentsQuery } from './comments.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepo: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentsRepo.save({
      text: createCommentDto.text,
      post: {
        id: createCommentDto.postId,
      },
      user: {
        id: createCommentDto.userId,
      },
    });
  }

  async findPostComments(postId: number, query: GetCommentsQuery) {
    const [comments, totalCount] = await this.commentsRepo.findAndCount({
      where: {
        post: {
          id: postId,
        },
      },
      relations: {
        user: true,
      },
      order: {
        date: 'DESC',
      },
      select: {
        user: {
          id: true,
          username: true,
        },
      },
      take: query.maxResults ? Number(query.maxResults) : 10,
      skip: query.firstResult ? Number(query.firstResult) - 1 : 0,
    });

    return {
      comments,
      totalCount,
    };
  }

  findAll() {
    return this.commentsRepo.find({});
  }

  findOne(id: number) {
    return this.commentsRepo.findOneBy({ id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const foundComment = await this.commentsRepo.findOneBy({ id });

    console.log(updateCommentDto);

    Object.assign(foundComment, updateCommentDto);

    return this.commentsRepo.save(foundComment);
  }

  async remove(id: number) {
    const foundComment = await this.commentsRepo.findBy({ id });

    return this.commentsRepo.remove(foundComment);
  }
}
