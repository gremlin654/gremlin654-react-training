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
