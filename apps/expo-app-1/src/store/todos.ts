import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: uuidv4(),
    description: 'Add api request',
    completed: false,
  }
] as Todo[];

// Slice
const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        } as Todo,
      }),
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    editTodo(
      state,
      action: PayloadAction<Todo>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

// Actions
export const { addTodo, removeTodo, editTodo, setTodoStatus } = slice.actions

// Reducer
export default slice.reducer