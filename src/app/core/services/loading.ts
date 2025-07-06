import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  show(): void {
    this._isLoading.set(true);
  }

  hide(): void {
    this._isLoading.set(false);
  }
}
