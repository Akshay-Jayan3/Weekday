// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    jobs: [],
    status: 'idle',
    error: null,
    limit: 10,
    offset: 0,
    filters: { name: '', age: '', gender: '', city: '' }
  },
  reducers: {
    resetData(state) {
      state.jobs = [];
      state.status = 'idle';
      state.error = null;
      state.offset = 0;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = { name: '', age: '', gender: '', city: '' };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = state.jobs.concat(action.payload?.jdList);
        state.offset += state.limit;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetData, setFilters, clearFilters } = dataSlice.actions;

export default dataSlice.reducer;
