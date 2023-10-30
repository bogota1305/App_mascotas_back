// src/rating/rating.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Rating } from './rating.model';

@Injectable()
export class RatingService {
  private readonly ratings: Rating[] = [];

  create(ratingData: Rating): Rating {
    
    const ratingId = this.ratings.length + 1;

    const newRating: Rating = { id: ratingId, ...ratingData };

    this.ratings.push(newRating);

    return newRating;
  }

  findAll(): Rating[] {
    return this.ratings;
  }

  findById(id: number): Rating {
    const rating = this.ratings.find((r) => r.id === id);

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    return rating;
  }

  update(id: number, updatedData: Rating): Rating {
    const index = this.ratings.findIndex((r) => r.id === id);

    if (index === -1) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    const updatedRating = { ...this.ratings[index], ...updatedData };
    this.ratings[index] = updatedRating;

    return updatedRating;
  }

  remove(id: number): Rating {
    const index = this.ratings.findIndex((r) => r.id === id);

    if (index === -1) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    const removedRating = this.ratings.splice(index, 1);

    return removedRating[0];
  }
}
