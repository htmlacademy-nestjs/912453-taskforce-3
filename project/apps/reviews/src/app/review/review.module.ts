import {Module} from '@nestjs/common';
import {ReviewController} from './review.controller';
import {ReviewService} from './review.service';
import {ReviewRepository} from './review.repository';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
