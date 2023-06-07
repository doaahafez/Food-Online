import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/Tags';
import { FoodService } from 'src/app/services/food.service';
// import { BookingService } from '../booking.service';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  tags?:Tag[];
  constructor(foodService:FoodService){
    // this.tags = foodService.getAllTags();
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }
}
