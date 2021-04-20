import { LanguageAction, LanguageActionTypes } from '../actions/language.actions';

const initialState: string = 'en';

export function LanguageReducer(state: string = initialState, action: LanguageAction) {
    switch(action.type) {
        case LanguageActionTypes.Language_Changed:
            return action.payload;
        default:
            return state;
    }
}