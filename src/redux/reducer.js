import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Function to save filters to localStorage
const saveFiltersToLocalStorage = (filters) => {
  localStorage.setItem('filters', JSON.stringify(filters));
};

// Function to load filters from localStorage
const loadFiltersFromLocalStorage = () => {
  const filters = localStorage.getItem('filters');
  return filters ? JSON.parse(filters) : null;
};

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

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
  limit: 10,
  offset: 0,
  filters: loadFiltersFromLocalStorage() || {
    roles: { label: '', data: [] },
    employees: { label: '', data: '' },
    experience: { label: '', data: '' },
    salary: { label: '', data: '' },
    location: { label: '', data: [] },
    search: { label: '', data: '' },
    tech: { label: '', data: [] }
  },
  selectedRole:[]
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetData(state) {
      state.jobs = [];
      state.status = 'idle';
      state.error = null;
      state.offset = 0;
    },
    setFilters(state, action) {
      state.filters = action.payload;
      // Save filters to localStorage when they are updated
      saveFiltersToLocalStorage(action.payload);
    },
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

export const { resetData, setFilters } = dataSlice.actions;

export default dataSlice.reducer;
