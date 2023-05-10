import {CategoryInterface} from '@project/shared/app-types';


export class CategoryEntity implements CategoryInterface {
  public categoryId: number;
  public title: string;

  constructor(category: CategoryInterface) {
    this.fillEntity(category);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(category: CategoryInterface) {
    this.categoryId = category.categoryId;
    this.title = category.title;
  }
}
