import {
  Component,
  computed,
  signal,
  inject
} from '@angular/core';
import { HeroService } from '../../services/hero';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './hero-list.html',
  styleUrls: ['./hero-list.scss'],
})
export class HeroListComponent {
  private router = inject(Router);
  public heroService = inject(HeroService);

  searchTerm = this.heroService.searchTerm;

  heroes = this.heroService.filteredHeroes;
  allHeroes = this.heroService.filteredHeroes;

  pageIndex = signal(0);
  pageSize = signal(5);

  totalPages = computed(() =>
    Math.ceil(this.allHeroes().length / this.pageSize())
  );

  pagedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.heroService.filteredHeroes().slice(start, end);
  });

  nextPage = () => {
    if (this.pageIndex() < this.totalPages() - 1) {
      this.pageIndex.set(this.pageIndex() + 1);
    }
  };

  prevPage = () => {
    if (this.pageIndex() > 0) {
      this.pageIndex.set(this.pageIndex() - 1);
    }
  };

  displayedColumns = ['name', 'description', 'actions'];

  onEdit(id: number): void {
    this.router.navigate(['/heroes/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('¿Seguro que querés borrar este héroe?')) {
      this.heroService.delete(id);
    }
  }

  onAdd(): void {
    this.router.navigate(['/heroes/add']);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
