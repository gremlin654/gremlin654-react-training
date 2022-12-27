import { Reducer } from 'react';
import { ACTION_TYPE } from 'types/enums';
import { ActionForm, StateForm } from 'types/types';

export const reduserForm: Reducer<StateForm, ActionForm> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CARDS_FORM:
      return { ...state, cards: action.payload.cards };
    case ACTION_TYPE.SET_FORM_DATA:
      return { ...state, formData: action.payload.formData };
    default:
      return state;
  }
};
