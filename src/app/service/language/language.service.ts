import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLanguage: string;  

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.language).subscribe(
      (language) => {
        console.log("Language Change Detection");
        this.selectedLanguage = language;
      }
    );
  }

  getText(name: string) {
    switch(this.selectedLanguage) {
      case 'en':
        return environment.englishText[name];
    }
  }
}
