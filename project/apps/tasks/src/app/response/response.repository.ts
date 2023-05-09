import {Injectable} from '@nestjs/common';
import {CRUDRepositoryInterface} from '@project/util/util-types';
import {ResponseEntity} from './response.entity';
import {ResponseInterface} from '@project/shared/app-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ResponseRepository implements CRUDRepositoryInterface<ResponseEntity, number, ResponseInterface>{
  constructor(private prisma: PrismaService) {}

  public create(item: ResponseEntity): Promise<ResponseInterface> {
    return this.prisma.response.create({
      data: {
        offerPrice: item.offerPrice,
        contractorId: item.contractorId,
        task: {connect: {taskId: item.taskId}},
      }
    });
  }

  public async destroy(responseId: number): Promise<void> {
    this.prisma.response.delete({
      where: {responseId}
    });
  }

  public findById(responseId: number): Promise<ResponseInterface | null> {
    return this.prisma.response.findFirst({
      where: {responseId}
    });
  }

  public findByTaskId(taskId: number): Promise<ResponseInterface[]> {
    return this.prisma.response.findMany({
      where: {taskId}
    });
  }

  public findByUserId(userId: string): Promise<ResponseInterface[]> {
    return this.prisma.response.findMany({
      where: {contractorId: userId}
    });
  }

  public update(responseId: number, item: ResponseEntity): Promise<ResponseInterface> {
    return this.prisma.response.update({
      where: {responseId},
      data: {...item.toObject()}
    });
  }
}
