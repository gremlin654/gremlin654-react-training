export interface IPersonCard {
  name: string;
  surname: string;
  date: string;
  country: string;
  gender: boolean;
  img: string | null;
}

export interface IUserFormProps {
  onSubmit: (data: IPersonCard) => void;
}

export interface IUserCard {
  card: IPersonCard;
}

export interface ICharacterModalData {
  id: number;
  name: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
  created: string;
}

export interface ICharactersPagesInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface IСharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface IСharactersResponse {
  info: ICharactersPagesInfo;
  results: IСharacter[];
}

export interface IMyInputProps {
  searchValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  onKeyPressHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IApiCardProps {
  character: IСharacter;
  handleChangeCharacter: (character: ICharacterData) => void;
}

export interface IMySelectByStatusProps {
  onChangeStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortByStatus: string;
}
export interface IMySelectByGenderProps {
  onChangeGender: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortByGender: string;
}
export interface IMySelectBySpeciesProps {
  onChangeSpecies: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortBySpecies: string;
}

export type FormData = {
  name: string;
  surName: string;
  date: string;
  country: string;
  img: string;
  gender: boolean;
  agree: boolean;
};

export interface ICharacterData {
  id: number;
  name: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
  created: string;
}

export interface ISearchState {
  searchValue: string;
  page: number;
  pages: number[];
  sortByStatus: string;
  sortByGender: string;
  sortBySpecies: string;
  characters: IСharacter[] | null;
  info: ICharactersPagesInfo | null;
  characterData: ICharacterData;
  isLoading: boolean;
  error: string;
}

export interface IFormDataInitial {
  name?: string | undefined;
  surName?: string | undefined;
  date?: string | undefined;
  country?: string | undefined;
  img?: string;
  gender?: boolean | undefined;
  agree?: boolean | undefined;
}

export interface IFormState {
  cards: IPersonCard[];
  formData: IFormDataInitial;
}

export interface IQueryFetchAll {
  page: number;
  searchValue: string;
  sortByGender: string;
  sortByStatus: string;
  sortBySpecies: string;
}
