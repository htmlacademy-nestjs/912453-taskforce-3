import {Injectable} from '@nestjs/common';
import {CRUDRepositoryInterface} from '@project/util/util-types';
import {TagInterface} from '@project/shared/app-types';
import {PrismaService} from '../prisma/prisma.service';
import {TagEntity} from './tag.entity';

@Injectable()
export class TagRepository implements CRUDRepositoryInterface<TagEntity, number, TagInterface>{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TagEntity): Promise<TagInterface> {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(tagId: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {tagId}
    });
  }

  public findById(tagId: number): Promise<TagInterface | null> {
    return this.prisma.tag.findFirst({
      where: {tagId}
    });
  }

  public findByName(name: string): Promise<TagInterface | null> {
    return this.prisma.tag.findFirst({
      where: {name}
    });
  }j

  public async findOrCreate(name: string): Promise<TagInterface> {
    const existTag = await this.findByName(name);
    if(!existTag) {
      const tag = new TagEntity({name})
      return await this.create(tag);
    }
    return existTag;
  }

  public async findOrCreateMany(names: string[]): Promise<TagInterface[]> {
    const tags = [];
    console.log(names);
    names.forEach((name) => {
      const tag = this.findOrCreate(name);
      console.log(tag)
      tags.push(tag);
    });
    return await Promise.all(tags);
  }

  public find(ids: number[] = []): Promise<TagInterface[]> {
    return this.prisma.tag.findMany({
      where: {
        tagId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(tagId: number, item: TagEntity): Promise<TagInterface> {
    return this.prisma.tag.update({
      where: {tagId},
      data: { ...item.toObject(), tagId}
    });
  }
}
