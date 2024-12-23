import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button'
import { BackendService } from '../../services/backend.service';
import { Message } from '../../models/Message';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { ActivityArea } from '../../enumerations/ActivityArea';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { MatTooltipModule } from '@angular/material/tooltip';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [MatTooltipModule, MatSelectModule, FormsModule, MatFormFieldModule, TranslateModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, NgFor, SpinnerComponent]
})
export class ContactComponent {
  isLoading: boolean = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  messageFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [phoneNumberValidator(10)]);
  activityAreas = [
    { value: ActivityArea.AEROSPACE, viewValue: 'aerospace' },
    { value: ActivityArea.SOCIAL, viewValue: 'social' },
    { value: ActivityArea.DEFENSE, viewValue: 'defense' },
    { value: ActivityArea.ENERGY, viewValue: 'energy' },
    { value: ActivityArea.GOVERNMENT, viewValue: 'government' },
    { value: ActivityArea.RETAIL, viewValue: 'retail' },
    { value: ActivityArea.FINANCIAL, viewValue: 'financial' },
    { value: ActivityArea.TELECOMMUNICATIONS, viewValue: 'telecommunications' },
    { value: ActivityArea.TRANSPORTATION, viewValue: 'transportation' },
    { value: ActivityArea.OTHERS, viewValue: 'others' }
  ];
  matcher = new MyErrorStateMatcher();
  email: string = '';
  phone: string = '';
  selectedActivityArea: any | null = null;
  text: string = '';

  private backendService = inject(BackendService);

  isButtonDisabled() {
    return !this.messageFormControl.valid || !this.emailFormControl.valid || !this.phoneFormControl.valid;
  }

  contact() {
    this.isLoading = true;
    this.backendService.contact(new Message(this.email, this.phone, this.selectedActivityArea ? ActivityArea[this.selectedActivityArea.value] : ActivityArea.OTHERS.toString(), this.text)).subscribe(res => {
      this.selectedActivityArea = null;
      this.emailFormControl.reset();
      this.messageFormControl.reset();
      this.phoneFormControl.reset();
      this.isLoading = false;
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    });
  }

}
