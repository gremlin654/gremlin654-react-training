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
