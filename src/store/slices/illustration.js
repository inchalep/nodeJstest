import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const policyIllustration = createSlice({
  name: "policyIllustration",
  initialState,
  reducers: {
    setIllustrationdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setIllustrationdata } = policyIllustration.actions;

export default policyIllustration.reducer;
