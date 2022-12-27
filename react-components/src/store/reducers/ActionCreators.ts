import axios, { AxiosResponse } from 'axios';
import { IQueryFetchAll, IСharactersResponse } from 'types/types';
import { URL_API } from 'services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCharactersData = createAsyncThunk(
  'search/fetchAll',
  async (query: IQueryFetchAll, { rejectWithValue }) => {
    try {
      const { page, searchValue, sortByGender, sortBySpecies, sortByStatus } = query;
      const response: AxiosResponse<IСharactersResponse> = await axios.get(
        `${URL_API.BASE}api/character/?page=${page}&name=${searchValue}&status=${sortByStatus}&gender=${sortByGender}&species=${sortBySpecies}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to load data');
    }
  }
);
