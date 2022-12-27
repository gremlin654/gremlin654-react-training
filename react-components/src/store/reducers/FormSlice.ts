import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormDataInitial, IFormState, IPersonCard } from 'types/types';

const initialState: IFormState = {
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

export const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCardForm: (state, action: PayloadAction<IPersonCard>) => {
      state.cards = [...state.cards, action.payload];
    },
    setFormData: (state, action: PayloadAction<IFormDataInitial>) => {
      state.formData = action.payload;
    },
    setFormImg: (state, action: PayloadAction<string>) => {
      state.formData.img = action.payload;
    },
  },
});

export default FormSlice.reducer;
