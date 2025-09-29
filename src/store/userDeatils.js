import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

// create user

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_CRUD_API,
        data
      );
      console.log("Response from server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// read user

export const showUser = createAsyncThunk("showUser", async () => {
  const response = await fetch(import.meta.env.VITE_APP_CRUD_API);
  console.log("API URL:", import.meta.env.VITE_APP_CRUD_API);

  try {
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

//  delete user

export const deleteUser = createAsyncThunk(
  "delteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_APP_CRUD_API}/${id}`, {
      method: "DELETE",
    });
    console.log("deleteUser", response);

    try {
      const result = response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const editUser = createAsyncThunk(
  "editUser",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await axios.put(
      ` ${import.meta.env.VITE_APP_CRUD_API}/${data.id}`,
      data
    );
    try {
      console.log("response data=>>>", response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "signupUser",
  async (data, { rejectWithValue }) => {
    const response = await axios.post(
      import.meta.env.VITE_APP_AUTH_API,
      data
    );
    try {
      console.log("responsedata", response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  user: [],
  error: false,
  loading: null,
  status: null,
  authUser:[]
};

const userDeatils = createSlice({
  name: "app",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        console.log("action:", action.payload);

        state.loading = false;
        state.user = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const payloadId = String(action.payload.id);

        state.user = state.user.filter((user) => String(user.id) !== payloadId);
        console.log("state.user", state.user);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = state.user.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = false;
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = true;
        console.log("signaction==>", action);
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {
    userlogin: (state, action) => {
      (state.status = true), (state.authUser = action.payload);
    },
    logout: (state) => {
      state.authUser = null;
      state.status = false;
    },
  },
});
export const { userlogin, logout } = userDeatils.actions;
export default userDeatils.reducer;
