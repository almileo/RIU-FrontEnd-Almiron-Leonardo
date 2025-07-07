import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero';
import { signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['delete'], {
      filteredHeroes: signal([
        { id: 1, name: 'Hero 1', description: 'Desc' },
        { id: 2, name: 'Hero 2', description: 'Desc' },
        { id: 3, name: 'Hero 3', description: 'Desc' },
      ]),
      searchTerm: signal(''),
    });

    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HeroService, useValue: heroServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add page', () => {
    component.onAdd();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/add']);
  });

  it('should navigate to edit page with id', () => {
    component.onEdit(123);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/edit', 123]);
  });

  it('should call heroService.delete when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDelete(1);
    expect(heroServiceSpy.delete).toHaveBeenCalledWith(1);
  });

  it('should not call heroService.delete when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.onDelete(1);
    expect(heroServiceSpy.delete).not.toHaveBeenCalled();
  });

  it('should increase pageIndex on nextPage', () => {
    component.pageIndex.set(0);
    component.pageSize.set(1);
    expect(component.totalPages()).toBeGreaterThan(1);

    component.nextPage();
    expect(component.pageIndex()).toBe(1);
  });

  it('should not increase pageIndex if on last page', () => {
    component.pageIndex.set(component.totalPages() - 1);
    component.nextPage();
    expect(component.pageIndex()).toBe(component.totalPages() - 1);
  });

  it('should decrease pageIndex on prevPage', () => {
    component.pageIndex.set(1);
    component.prevPage();
    expect(component.pageIndex()).toBe(0);
  });

  it('should not decrease pageIndex below 0', () => {
    component.pageIndex.set(0);
    component.prevPage();
    expect(component.pageIndex()).toBe(0);
  });

  it('should update pageIndex and pageSize on page change', () => {
    const event: PageEvent = { pageIndex: 2, pageSize: 10, length: 100 };
    component.onPageChange(event);
    expect(component.pageIndex()).toBe(2);
    expect(component.pageSize()).toBe(10);
  });
});
