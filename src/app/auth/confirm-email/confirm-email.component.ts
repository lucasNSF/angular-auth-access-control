import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit {
  private auth = inject(Auth);
  private dialogRef = inject(DynamicDialogRef);
  dialogData = inject(DynamicDialogConfig);

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // TODO: Close modal and redirect
      }
    });
  }
}
