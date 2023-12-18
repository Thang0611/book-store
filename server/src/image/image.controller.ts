import { Controller } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller()
export class ImageController {
  constructor(private ImageService: ImageService) {}
}
