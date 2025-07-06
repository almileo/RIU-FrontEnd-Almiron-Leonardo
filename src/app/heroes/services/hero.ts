import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../models/hero.model';
import { LoadingService } from '../../core/services/loading';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private loadingService: LoadingService) { }
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();
  private _heroes = signal<Hero[]>([
    { id: 1, name: 'Superman', description: 'Fuerza y vuelo' },
    { id: 2, name: 'Spiderman', description: 'Trepa muros y lanza telarañas' },
    { id: 3, name: 'Batman', description: 'Detective y gadgets' }
  ]);

  heroes = computed(() => this._heroes());

  searchTerm = signal<string>('');

  filteredHeroes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this._heroes().filter(h =>
      h.name.toLowerCase().includes(term)
    );
  });


  getById(id: number): Hero | undefined {
    return this._heroes().find(h => h.id === id);
  }

  add(hero: Hero): void {
    const newId = this._heroes().length
      ? Math.max(...this._heroes().map(h => h.id)) + 1
      : 1;
    this.loadingService.show();
    of(true).pipe(delay(1000)).subscribe(() => {
      this._heroes.update(prev => [...prev, { ...hero, id: newId }]);
      this.loadingService.hide();
    });
  }

  update(hero: Hero): void {
    this.loadingService.show();
    of(true).pipe(delay(1000)).subscribe(() => {
      this._heroes.update(prev =>
        prev.map(h => (h.id === hero.id ? { ...h } : h))
      );
      this.loadingService.hide();
    });
  }

  delete(id: number): void {
    this.loadingService.show();
    of(true).pipe(delay(1000)).subscribe(() => {
      this._heroes.update(h => h.filter(hero => hero.id !== id));
      this.loadingService.hide();
    });
  }
}
