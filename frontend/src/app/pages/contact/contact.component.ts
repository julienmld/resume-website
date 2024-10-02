import { Component, Inject, inject, PLATFORM_ID, Renderer2 } from '@angular/core';
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
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
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
  imports: [MatTooltipModule, MatSelectModule, FormsModule, MatFormFieldModule, TranslateModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, NgFor, SpinnerComponent, NgIf]
})
export class ContactComponent {
  isLoading: boolean = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  messageFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [phoneNumberValidator(10)]);
  siteKey: string = '6LeHpk4qAAAAAJHePvFxsKLDaSAh06uMxnzQDfLu';
  isRecaptchaValid: boolean = false;
  recaptchaWidgetId: any;
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

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addRecaptchaScript();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.removeRecaptchaScript();
    }
  }

  addRecaptchaScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);

    script.onload = () => {
      this.renderRecaptcha();
    };
  }

  renderRecaptcha() {
    this.recaptchaWidgetId = (window as any).grecaptcha.render('recaptcha-container', {
      sitekey: this.siteKey,
      theme: 'dark',
      callback: (response: string) => this.onRecaptchaSuccess(response),
      'expired-callback': () => this.onRecaptchaExpired()
    });
  }

  onRecaptchaSuccess(token: string): void {
    this.isRecaptchaValid = true;
  }

  onRecaptchaExpired(): void {
    this.isRecaptchaValid = false;
  }

  removeRecaptchaScript() {
    const script = document.querySelector(`script[src="https://www.google.com/recaptcha/api.js"]`);
    if (script) {
      script.remove();
    }
  }

  isButtonDisabled() {
    return !this.messageFormControl.valid || !this.emailFormControl.valid || !this.phoneFormControl.valid || !this.isRecaptchaValid;
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
