import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { BackendService } from '../../services/backend.service';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, TranslateModule, NgFor, NgIf, SpinnerComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  private backendService = inject(BackendService);
  private dialogRef = inject(MatDialogRef<DialogComponent>);
  isLoading: boolean = false;
  jobs: string[] = ['developer', 'recruiter', 'student', 'client', 'curious', 'other'];

  registerVisitor(job: string) {
    this.isLoading = true;
    this.backendService.registerVisitor({
      'job': job,
      'device': window.innerWidth < 1000 ? 'mobile' : 'computer'
    }).subscribe();
    setTimeout(() => {
      localStorage.setItem('dialogShown', 'true');
      this.dialogRef.close();
    }, 700);
  }

}
