import { createSlice } from "@reduxjs/toolkit";

type ListingState = {
  listings: any[];
  error: string | null;
  loading: boolean;
};

const initialState: ListingState = {
  listings: [],
  error: null,
  loading: false,
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    fetchListingsStart: (state) => {
      state.loading = true;
    },
    fetchListingsSuccess: (state, action) => {
      state.listings = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchListingsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
  removeError,
} = listingSlice.actions;

export default listingSlice.reducer;
