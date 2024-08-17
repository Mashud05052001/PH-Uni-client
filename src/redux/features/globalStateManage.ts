import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  resetFormState: false,
};

export const globalState = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeResetFormState(state, action: PayloadAction<boolean>) {
      state.resetFormState = action.payload;
    },
  },
});

export const { changeResetFormState } = globalState.actions;

export default globalState.reducer;
