import {
  Component,
  computed,
  inject,
  effect,
  signal,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero';
import { Hero } from '../../models/hero.model';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';


import {
  CommonModule
} from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UppercaseDirective } from '../../../shared/directives/uppercase';


@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    UppercaseDirective
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private heroService = inject(HeroService);
  private snackBar = inject(MatSnackBar);

  heroId = signal<number | null>(null);
  successMessage = signal<string | null>(null);
  editMode = computed(() => this.heroId() !== null);

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  snackEffect = effect(() => {
    const msg = this.successMessage();
    if (msg) {
      this.snackBar.open(msg, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.successMessage.set(null);
    }
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const hero = this.heroService.getById(+id);
      if (hero) {
        this.heroId.set(+id);
        this.form.patchValue(hero);
      } else {
        this.router.navigate(['/heroes']);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const hero: Hero = {
      id: this.heroId() ?? 0,
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? ''
    };
    this.editMode()
      ? this.heroService.update(hero)
      : this.heroService.add(hero);

    this.successMessage.set(this.editMode() ? 'Héroe actualizado' : 'Héroe agregado');
    this.router.navigate(['/heroes']);
  }

  onCancel(): void {
    this.router.navigate(['/heroes']);
  }
}
