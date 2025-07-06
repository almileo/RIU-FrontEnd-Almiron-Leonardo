import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="overlay" *ngIf="isLoading()">
      <mat-spinner diameter="48"></mat-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class LoadingComponent {
  private loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;
}
