import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [
    { id: 1, name: 'Superman', description: 'Fuerza y vuelo' },
    { id: 2, name: 'Spiderman', description: 'Agilidad y telarañas' },
    { id: 3, name: 'Batman', description: 'Inteligencia y gadgets' }
  ];

  private heroes$ = new BehaviorSubject<Hero[]>([...this.heroes]);

  getAll(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  // Obtener héroe por ID
  getById(id: number): Hero | undefined {
    return this.heroes.find(h => h.id === id);
  }

  // Buscar por nombre
  search(term: string): Hero[] {
    return this.heroes.filter(h =>
      h.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  add(hero: Hero): void {
    const newId = this.heroes.length ? Math.max(...this.heroes.map(h => h.id)) + 1 : 1;
    hero.id = newId;
    this.heroes.push(hero);
    this.heroes$.next([...this.heroes]);
  }

  update(hero: Hero): void {
    const index = this.heroes.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      this.heroes[index] = hero;
      this.heroes$.next([...this.heroes]);
    }
  }

  delete(id: number): void {
    this.heroes = this.heroes.filter(h => h.id !== id);
    this.heroes$.next([...this.heroes]);
  }
}
