import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";

interface PostState {
  contentApi: FetchApiState[];
  id: number | string;
  postError: string | null;
  postLoading: boolean;
}

interface FetchApiState {
  id: number | string;
  title: string;
  body: string;
}

const initialState: PostState = {
  postError: null,
  id: 0,
  contentApi: [],
  postLoading: false
};

export const getPosts = createAsyncThunk<FetchApiState[], number>(
  "posts/getPosts",
  async (limit) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    if (response.status >= 400) {
      return "Error";
    } else if (response.status >= 200) {
      return response.data;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      const { title, body } = action.payload;
      const lastId = state.contentApi[state.contentApi.length - 1].id;
      state.contentApi.push({ id: +lastId + 1, body, title });
    },
    postUpdated(state, action) {
      const { id, body, title } = action.payload;
      const existingPost = state.contentApi.find(
        (content: { id: number | string }) => content.id === id
      );
      if (existingPost) {
        existingPost.id = id;
        existingPost.body = body;
        existingPost.title = title;
      }
    },
    postDeleted(state, action) {
      const { id } = action.payload;
      let newPosts = state.contentApi.filter((post) => {
        return post.id !== id;
      });
      state.contentApi = newPosts;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.postLoading = true;
        state.postError = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postError = null;
        state.contentApi = action.payload;
        state.postLoading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postError = action.payload as string;
        state.postLoading = false;
      });
  }
});
export const selectPosts = (state: RootState) => state.posts;
export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
