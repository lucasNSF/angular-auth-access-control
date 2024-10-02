import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  private _isLoading = signal(false);

  set isLoading(loading: boolean) {
    this._isLoading.set(loading);
  }

  get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }
}
