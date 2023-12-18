import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/emuns/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { AddReviewDto } from './dto/addReviewDto';
import { ReviewService } from './review.service';
import { ReviewEntity } from './entities/review.entity';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  async addReview(
    @Res() res,
    @Body() review: AddReviewDto,
  ): Promise<ReviewEntity> {
    return this.reviewService.addReview(review);
  }
}
