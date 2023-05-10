import {ResponseInterface} from '@project/shared/app-types';
import {EntityInterface} from '@project/util/util-types';

export class ResponseEntity implements EntityInterface<ResponseInterface>, ResponseInterface{
  public responseId?: number;
  public offerPrice: number;
  public taskId: number;
  public contractorId: string;

  constructor(item: ResponseInterface) {
    this.fillEntity(item);
  }

  public toObject(): ResponseInterface {
    return {...this};
  }

  public fillEntity(item: ResponseInterface) {
    this.offerPrice = item.offerPrice;
    this.taskId = item.taskId;
    this.contractorId = item.contractorId;
  }

}
