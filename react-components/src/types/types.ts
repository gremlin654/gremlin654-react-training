export interface INotebook {
  id: string;
  model: string;
  img: string;
  screenDiagonal: string;
  screenResolution: string;
  screenRefreshRate: string;
  processorModel: string;
  RAM: string;
  SSDcapacity: string;
  VideoCardModel: string;
}

export interface IMainProps {
  notebooks: INotebook[];
}

export interface ICardProps {
  notebook: INotebook;
}

export type StateCardType = {
  like: string;
  likesNumber: number;
  favourite: string;
};

export interface IStateInput {
  inputValue: string;
}

export interface IPersonCard {
  name: string;
  surname: string;
  date: string;
  country: string;
  gender: boolean;
  img: string | null;
}
export interface IFormPageState {
  cards: IPersonCard[];
}
export interface IUserFormProps {
  onSubmit: (data: IPersonCard) => void;
}

export interface IUserFormState {
  errors: Record<string, unknown>;
  disabled: boolean;
}

export interface IUserCard {
  card: IPersonCard;
}

export interface IApiPageState {
  searchValue: string;
  isLoading: boolean;
  page: number;
  sortByStatus: string;
  characters: IСharacter[];
  isModalActive: boolean;
  modalData: ICharacterModalData;
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

export enum SortTypeStatus {
  alive = 'alive',
  dead = 'dead',
  unknown = 'unknown',
}

export interface IMyInputProps {
  searchValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  onKeyPressHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IApiCardModalProps {
  handleChangeModalClose: () => void;
  modalData: ICharacterModalData;
}

export interface IApiCardProps {
  character: IСharacter;
  isModalActive: boolean;
  handleChangeModalActive: (character: ICharacterModalData) => void;
}
