import { Action } from '@ngrx/store';

export enum LanguageActionTypes {
    Language_Changed = '[LANGUAGE] Language Changed'
}

export class LanguageChangedAction implements Action {
    readonly type = LanguageActionTypes.Language_Changed;

    constructor(public payload: string) {

    }
}

export type LanguageAction = LanguageChangedAction