import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { BottomBannerComponent } from './components/bottom-banner/bottom-banner.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { TopPictureComponent } from './components/top-picture/top-picture.component';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { PreloadService } from './services/preload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBannerComponent, BottomBannerComponent, TranslateModule, TopPictureComponent, NgIf, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('firstSlideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate('1s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private preload = inject(PreloadService);
  isHomePage: boolean = true;
  isHomeOrArchitecturePage: boolean = true;
  page: string = 'home';
  private imageUrls: string[] = ['me.jpg', 'servers.png', 'amplify.jpg', 'angular.png', 'ansible.png', 'apigateway.png', 'arrow.png', 'cv.png', 'cypress.png', 'dynamo.jpg', 'english.png', 'esir.png', 'french.png', 'github.png', 'gitlab.png', 'helm.svg', 'iam.jpg', 'imageet.png', 'safe.png', 'java.png', 'jenkins.jpg', 'jmblack.png', 'jmwhite.png', 'kubernetes.jpg', 'lambda.png', 'linkedin.png', 'linux.jpg', 'maven.png', 'secretmanager.jpg', 'soprasteria.png', 'spring.svg', 'terraform.png', 'malt.svg', 'dga.png', 'dirisi.png'];

  constructor(private router: Router, public translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    translate.setDefaultLang('fr');
    this.translate.get('easter-egg.first-indication').subscribe((res: string) => {
      console.log(res);
    });
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.openDialog();
      }, 6000);
    }
  }

  ngOnInit() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.isHomePage = ![ '/architecture', '/skills', '/experiences', '/contact-me'].includes(event.url);

      this.page = event.url.split('/')[1];
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });

    this.preload.preloadImages(this.imageUrls).then(() => {
      console.log('Images preloaded successfully');
    })
    .catch(error => {
      console.error('Error preloading images', error);
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      disableClose: true
    });
  }

}
