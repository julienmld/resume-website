import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  private imageCache: { [key: string]: HTMLImageElement } = {};

  preloadImages(imageUrls: string[]): Promise<void[]> {
    const preloadPromises = imageUrls.map(url => this.loadImage('assets/img/' + url));
    return Promise.all(preloadPromises);
  }

  private loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.imageCache[url]) {
        resolve();
        return;
      }

      if (typeof window !== 'undefined') {
        const img = document.createElement('img');
        img.src = url;
        img.onload = () => {
          this.imageCache[url] = img;
          resolve();
        };
        img.onerror = () => {
          reject(new Error(`Failed to load image at ${url}`));
        };
      }
    });
  }
}
