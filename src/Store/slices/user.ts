import User from "@/constant/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  email: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { _id, email, address, fullName, location, phone } = action.payload;
      state._id = _id;
      state.phone = phone;
      state.address = address;
      state.fullName = fullName;
      state.location = location;
      state.email = email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
