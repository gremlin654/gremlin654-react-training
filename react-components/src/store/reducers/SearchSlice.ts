import { fetchCharactersData } from './ActionCreators';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypeGender, SortTypeSpecies, SortTypeStatus } from 'types/enums';
import { ICharacterData, ISearchState, IСharactersResponse } from 'types/types';
import { pageCharacterDefault } from 'utils/constants';

const initialState: ISearchState = {
  searchValue: '',
  page: 1,
  pages: [],
  sortByStatus: SortTypeStatus.empty,
  sortByGender: SortTypeGender.empty,
  sortBySpecies: SortTypeSpecies.Empty,
  characters: null,
  info: null,
  characterData: pageCharacterDefault,
  isLoading: false,
  error: '',
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPages: (state, action: PayloadAction<number[]>) => {
      state.pages = action.payload;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortStatus: (state, action: PayloadAction<string>) => {
      state.sortByStatus = action.payload;
    },
    setSortGender: (state, action: PayloadAction<string>) => {
      state.sortByGender = action.payload;
    },
    setSortSpecies: (state, action: PayloadAction<string>) => {
      state.sortBySpecies = action.payload;
    },
    clear: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCharacterData: (state, action: PayloadAction<ICharacterData>) => {
      state.characterData = action.payload;
    },
  },
  extraReducers: {
    [fetchCharactersData.fulfilled.type]: (state, action: PayloadAction<IСharactersResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.characters = action.payload.results;
      state.info = action.payload.info;
      if (action.payload.info.pages) {
        let arrayNumber: number[] = [];
        for (let i = 1; i <= action.payload.info.pages; i++) {
          arrayNumber = [...arrayNumber, i];
        }
        state.pages = arrayNumber;
      }
    },
    [fetchCharactersData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCharactersData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.characters = null;
      state.info = null;
      state.pages = [];
      state.page = 1;
    },
  },
});

export default SearchSlice.reducer;
