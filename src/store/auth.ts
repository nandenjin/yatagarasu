import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum AuthStatus {
  LOADING,
  LOGGED_IN,
  LOGGED_OUT,
}

interface AuthState {
  status: AuthStatus
  uid: string | null
  displayName?: string | null
  photoURL?: string | null
  email?: string | null
}
const initialState: AuthState = {
  status: AuthStatus.LOADING,
  uid: null,
  displayName: null,
  photoURL: null,
  email: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        uid: string
        displayName?: string
        photoURL?: string
        email?: string
      } | null>
    ) {
      const user = action.payload
      state.status = user ? AuthStatus.LOGGED_IN : AuthStatus.LOGGED_OUT
      if (user) {
        state.uid = user.uid
        state.displayName = user.displayName
        state.photoURL = user.photoURL
        state.email = user.email
      } else {
        state.uid = null
        state.displayName = null
        state.photoURL = null
        state.email = null
      }
    },
  },
})

export const authReducer = authSlice.reducer
