import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeroService } from '../../services/hero';
import { Router } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-hero-list',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss'
})
export class HeroListComponent {
  private heroService = inject(HeroService);
  private router = inject(Router);

  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  pagedHeroes: Hero[] = [];

  displayedColumns = ['name', 'description', 'actions'];
  searchTerm = '';

  pageIndex = 0;
  pageSize = 5;

  ngOnInit(): void {
    this.heroService.getAll().subscribe(data => {
      this.heroes = data;
      this.applyFilter();
    });
  }

  onSearch(): void {
    this.applyFilter();
  }

  onEdit(id: number): void {
    this.router.navigate(['/heroes/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('¿Eliminar héroe?')) {
      this.heroService.delete(id);
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedHeroes();
  }

  addHero(): void {
    this.router.navigate(['/heroes/add']);
  }
  
  private applyFilter(): void {
    this.filteredHeroes = this.searchTerm
      ? this.heroes.filter(h =>
          h.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : [...this.heroes];

    this.pageIndex = 0;
    this.updatePagedHeroes();
  }

  private updatePagedHeroes(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedHeroes = this.filteredHeroes.slice(start, end);
  }
}
