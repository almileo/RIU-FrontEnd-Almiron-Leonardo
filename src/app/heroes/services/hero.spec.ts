import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero';
import { LoadingService } from '../../core/services/loading';

describe('HeroService (con Zone.js)', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        {
          provide: LoadingService,
          useValue: { show: () => { }, hide: () => { } }
        }
      ]
    });

    service = TestBed.inject(HeroService);
  });

  it('should return hero by id', () => {
    const hero = service.getById(1);
    expect(hero).toBeTruthy();
    expect(hero?.name).toBe('Superman');
  });

  it('should filter heroes by term', () => {
    service.searchTerm.set('man');
    const result = service.filteredHeroes();
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(h => h.name.toLowerCase().includes('man'))).toBeTrue();
  });

  it('should add a hero and increase the list size', (done) => {
    const initialCount = service.heroes().length;

    service.add({ id: 0, name: 'Flash', description: 'Velocidad' });

    setTimeout(() => {
      const updated = service.heroes();
      expect(updated.length).toBe(initialCount + 1);
      expect(updated.some(h => h.name === 'Flash')).toBeTrue();
      done();
    }, 1100);
  });

  it('should delete a hero by id', (done) => {
    const initialCount = service.heroes().length;
    service.delete(1);

    setTimeout(() => {
      const result = service.getById(1);
      expect(result).toBeUndefined();
      expect(service.heroes().length).toBe(initialCount - 1);
      done();
    }, 2000);
  });

  it('should update an existing hero', (done) => {
    const updatedHero = { id: 2, name: 'Spiderman actualizado', description: 'Red mejorada' };
    service.update(updatedHero);

    setTimeout(() => {
      const result = service.getById(2);
      expect(result?.name).toBe('Spiderman actualizado');
      done();
    }, 1100);
  });

  it('should assign id = 1 if heroes list is empty', (done) => {
    (service as any)._heroes.set([]);

    service.add({ id: 0, name: 'Nuevo', description: 'Test' });

    setTimeout(() => {
      const newHero = service.getById(1);
      expect(newHero).toBeTruthy();
      expect(newHero?.id).toBe(1);
      done();
    }, 1100);
  });
});
