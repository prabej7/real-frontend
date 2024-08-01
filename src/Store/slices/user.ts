import User from "@/constant/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  email: "",
  _id: "",
  isVerified: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { _id, email, address, fullName, location, phone, isVerified } =
        action.payload;
      state._id = _id;
      state.phone = phone;
      state.address = address;
      state.fullName = fullName;
      state.location = location;
      state.email = email;
      state.isVerified = isVerified;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
