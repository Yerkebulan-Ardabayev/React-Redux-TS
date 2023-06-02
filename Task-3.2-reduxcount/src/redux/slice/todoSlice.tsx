import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";

interface TodoState {
  contentApi: TodoFetchApi[];
  todoError: string | null;
  todoLoading: boolean;
}

interface TodoFetchApi {
  title: string;
  id: string | number;
}

const initialState: TodoState = {
  todoError: null,
  contentApi: [],
  todoLoading: false
};

export const getTodos = createAsyncThunk<TodoFetchApi[], number>(
  "todos/getTodos",
  async (limit) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    if (response.status >= 400) {
      return "Error";
    } else if (response.status >= 200) {
      return response.data;
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const { title } = action.payload;
      const lastId = state.contentApi[state.contentApi.length - 1].id;
      state.contentApi.push({ id: +lastId+1, title });
    },
    todoUpdated(state, action) {
      const { id, title } = action.payload;
      const existingTodo = state.contentApi.find((content: { id: number | string; }) => content.id === id)
      if (existingTodo) {
        existingTodo.title = title
      }
    },
    todoDeleted (state, action) {
      const {id} = action.payload;
      let newTodo = state.contentApi.filter((todo) => {
          return todo.id !== id;
      });
      state.contentApi = newTodo;
  }
  },
  extraReducers(builder) {
    builder
      .addCase(getTodos.pending, (state) => {
        state.todoLoading = true;
        state.todoError = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todoError = null;
        state.contentApi = action.payload;
        state.todoLoading = false;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.todoError = action.payload as string;
        state.todoLoading = false;
      });
  }
});
export const selectToDo = (state: RootState) => state.todo;
export const { todoAdded, todoUpdated, todoDeleted } = todoSlice.actions;

export default todoSlice.reducer;
