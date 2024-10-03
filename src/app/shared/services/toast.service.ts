import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messageService = inject(MessageService);

  success(title: string, message?: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
    });
  }

  error(title: string, message?: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
