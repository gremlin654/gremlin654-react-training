import { Reducer } from 'react';
import { ACTION_TYPE } from 'types/enums';
import { ActionSearch, StateSearch } from 'types/types';

export const reduserSearch: Reducer<StateSearch, ActionSearch> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CHARACTERS:
      return { ...state, characters: action.payload.characters };
    case ACTION_TYPE.SET_INFO:
      return { ...state, info: action.payload.info };
    case ACTION_TYPE.SET_VALUE:
      return { ...state, searchValue: action.payload.searchValue };
    case ACTION_TYPE.SET_SORT_STATUS:
      return { ...state, sortByStatus: action.payload.sortByStatus };
    case ACTION_TYPE.SET_SORT_GENDER:
      return { ...state, sortByGender: action.payload.sortByGender };
    case ACTION_TYPE.SET_SORT_SPECIES:
      return { ...state, sortBySpecies: action.payload.sortBySpecies };
    case ACTION_TYPE.SET_PAGE:
      return { ...state, page: action.payload.page };
    case ACTION_TYPE.SET_PAGES:
      return { ...state, pages: action.payload.pages };
    case ACTION_TYPE.SET_CHARACTER_DATA:
      return { ...state, characterData: action.payload.characterData };

    default:
      return state;
  }
};
