import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

import { LoadingBarService } from './shared/services/loading-bar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private loadingBarService = inject(LoadingBarService);
  isLoadingTopBar!: Signal<boolean>;

  ngOnInit(): void {
    this.isLoadingTopBar = this.loadingBarService.isLoading;
  }
}
