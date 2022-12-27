import { createContext, Dispatch } from 'react';
import {
  ActionForm,
  ActionSearch,
  ICharacterData,
  ICharactersPagesInfo,
  IPersonCard,
  IСharacter,
} from 'types/types';
import { SortTypeGender, SortTypeSpecies, SortTypeStatus } from 'types/enums';

interface IGlobalData {
  stateSearch: {
    searchValue: string;
    page: number;
    pages: number[];
    sortByStatus: string;
    sortByGender: string;
    sortBySpecies: string;
    characters: IСharacter[] | null;
    info: ICharactersPagesInfo | null;
    characterData: ICharacterData;
  };
  stateForm: {
    cards: IPersonCard[];
    formData: {
      name?: string | undefined;
      surName?: string | undefined;
      date?: string | undefined;
      country?: string | undefined;
      img?: File | undefined;
      gender?: boolean | undefined;
      agree?: boolean | undefined;
    };
  };
  dispatchSearch: Dispatch<ActionSearch>;
  dispatchForm: Dispatch<ActionForm>;
}

export const initialForm = {
  cards: [],
  formData: {
    name: '',
    surName: '',
    date: '',
    country: '',
    img: undefined,
    gender: false,
    agree: false,
  },
};

export const pageCharacterDefault = {
  id: 0,
  name: '',
  species: '',
  gender: '',
  origin: '',
  image: '',
  created: '',
};

export const initialSearch = {
  searchValue: '',
  page: 1,
  pages: [],
  sortByStatus: SortTypeStatus.empty,
  sortByGender: SortTypeGender.empty,
  sortBySpecies: SortTypeSpecies.Empty,
  characters: null,
  info: null,
  characterData: pageCharacterDefault,
};

export const GlobalData = createContext<IGlobalData>({
  stateSearch: initialSearch,
  stateForm: initialForm,
  dispatchSearch: () => {},
  dispatchForm: () => {},
});
