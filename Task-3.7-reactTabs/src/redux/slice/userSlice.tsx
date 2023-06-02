import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";

interface UserState {
  usersList: FetchApiUsers[];
  userError: string | null;
  userLoading: boolean;
}

interface FetchApiUsers {
  name: string;
  username: string;
  id: number;
  email?: number | string;
  phone?: number | string;
  address?: any;
}

const initialState: UserState = {
  userError: null,
  usersList: [],
  userLoading: false
};

export const getUsers = createAsyncThunk<FetchApiUsers[], number>(
  "users/getUsers",
  async (limit) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    if (response.status >= 400) {
      return "Error";
    } else if (response.status >= 200) {
      return response.data;
    }
  }
);

const userSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    userAdded(state, action: PayloadAction<FetchApiUsers>) {
      const { name, username } = action.payload;
      const lastId = state.usersList[state.usersList.length - 1].id;
      state.usersList.push({ id: +lastId + 1, name, username });
    },
    userUpdated(state, action) {
      const { name, username, id } = action.payload;
      const existingUser = state.usersList.find(
        (user: { name: string; username: string; id: number }) => user.id === id
      );
      if (existingUser) {
        existingUser.name = name;
        existingUser.username = username;
        existingUser.id = id;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      let newUser = state.usersList.filter((user) => {
        return user.id !== id;
      });
      state.usersList = newUser;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.userError = null;
        state.usersList = action.payload;
        state.userLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.userError = action.payload as string;
        state.userLoading = false;
      });
  }
});
export const selectUser = (state: RootState) => state.user;
export const { userAdded, userUpdated, userDeleted } = userSlice.actions;

export default userSlice.reducer;
