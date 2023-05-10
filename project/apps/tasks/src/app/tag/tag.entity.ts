import {TagInterface} from '@project/shared/app-types';
import {EntityInterface} from '@project/util/util-types';

export class TagEntity implements TagInterface, EntityInterface<TagInterface> {
    public tagId: number;
    public name: string;

    constructor(tag: TagInterface) {
      this.fillEntity(tag);
    }

    public toObject(): TagInterface {
      return {...this};
    }

    public fillEntity(tag) {
      this.tagId = tag.tagId;
      this.name = tag.name;
    }
}
