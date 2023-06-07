import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tags';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]{
    return sample_foods;
  };

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

getAllTags():Tag[]{
  return sample_tags;
}

    getAllFoodsByTag(tag: string):Food[] {
    return tag === "All" ?
      this.getAll() :
      this.getAll().filter(food=>food.tags?.includes(tag));
  }

  // getFoodById(foodId:string):Observable<Food>{
  //   return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  // }

  getFoodById(foodId:string):Food{
     return this.getAll().find(food=>food.id==foodId)?? new Food();
  }
}
