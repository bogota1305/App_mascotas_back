import { Injectable, NotFoundException } from '@nestjs/common';
import { Search } from './search.model';

@Injectable()
export class SearchService {
  private readonly searches: Search[] = [];

  create(searchData: Search): Search {
    const searchId = this.searches.length + 1;

    const newSearch: Search = { id: searchId, ...searchData };

    this.searches.push(newSearch);

    return newSearch;
  }

  findAll(): Search[] {
    return this.searches;
  }

  findById(id: number): Search {
    const search = this.searches.find((s) => s.id === id);

    if (!search) {
      throw new NotFoundException(`Search with ID ${id} not found`);
    }

    return search;
  }

  update(id: number, updatedData: Search): Search {
    const index = this.searches.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundException(`Search with ID ${id} not found`);
    }

    const updatedSearch = { ...this.searches[index], ...updatedData };
    this.searches[index] = updatedSearch;

    return updatedSearch;
  }

  remove(id: number): Search {
    const index = this.searches.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundException(`Search with ID ${id} not found`);
    }

    const removedSearch = this.searches.splice(index, 1);

    return removedSearch[0];
  }

  removeAll(): void {
    this.searches.length = 0; // Borra todas las búsquedas
  }
}
