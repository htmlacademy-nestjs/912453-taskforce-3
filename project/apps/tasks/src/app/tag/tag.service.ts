import { Injectable } from '@nestjs/common';
import {TagInterface} from '@project/shared/app-types';
import {TagRepository} from './tag.repository';
import {CreateTagDto} from './dto/create-tag.dto';
import {TagEntity} from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository
  ) {}

  async createTag(dto: CreateTagDto): Promise<TagInterface> {
    const tagEntity = new TagEntity(dto);
    return this.tagRepository.create(tagEntity);
  }

  async deleteTag(id: number): Promise<void> {
    await this.tagRepository.destroy(id);
  }

  async getTag(id: number): Promise<TagInterface | null> {
    return this.tagRepository.findById(id);
  }

  async findByName(name: string): Promise<TagInterface | null> {
    return this.tagRepository.findByName(name);
  }

  async findOrCreate(name: string): Promise<TagInterface> {
    return this.tagRepository.findOrCreate(name);
  }

  async findOrCreateMany(names: string[]): Promise<TagInterface[]> {
    return this.tagRepository.findOrCreateMany(names);
  }

  async getTags(): Promise<TagInterface[]> {
    return this.tagRepository.find();
  }
}
