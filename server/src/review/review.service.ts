import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AddReviewDto } from 'src/review/dto/addReviewDto';
import { ReviewEntity } from './entities/review.entity';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private BookService: BookService,
    private userService: UserService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async addReview(review: AddReviewDto): Promise<ReviewEntity> {
    await this.checkReviewExist(review);
    try {
      const book = await this.BookService.findBookById(review.bookId);
      const user = await this.userService.findUserById(review.userId);
      const newReview = await this.reviewRepository.create({
        ...review,
        book,
        user,
      });
      return this.reviewRepository.save(newReview);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error?.message || 'Them sach that bai');
    }
  }

  async checkReviewExist(review: AddReviewDto): Promise<void> {
    const check = await this.dataSource
      .createQueryBuilder(ReviewEntity, 'reviews')
      .where('reviews.userId= :userId', { userId: review.userId })
      .andWhere('reviews.bookId= :bookId', { bookId: review.bookId })
      .getOne();

    if (check) {
      throw new BadRequestException('Mỗi sách chỉ được đánh giá 1 lần!');
    }
  }
}
