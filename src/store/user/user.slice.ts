import { createSlice } from '@reduxjs/toolkit';
import { IUser } from "../../types/types";

interface IUserState {
	isPending: boolean;
	currentUser: IUser | null;
	error: null | string;
}

const INITIAL_STATE = {
	isPending: false,
	currentUser: null,
	error: null
} as IUserState;

export const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		checkUserSession: (state) => {
			state.isPending = true;
		},
		googleSignInStart: (state) => {
			state.isPending = true;
		},
		emailSignInStart: (state, action) => {
			state.isPending = true;
		},
		emailSignUpStart: (state, action) => {
			state.isPending = true;
		},
		signInSuccess: (state, action) => {
			state.isPending = false;
			state.currentUser = action.payload;
		},
		signOutStart: (state) => {
			state.isPending = true;
		},
		signOutSuccess: (state) => {
			state.isPending = false;
			state.currentUser = null;
		},
		signOutFailed: (state, action) => {
			state.isPending = false;
			state.error = action.payload;
		},
		signInFailed: (state, action) => {
			state.isPending = false;
			state.error = action.payload;
		},
		signUpFailed: (state, action) => {
			state.isPending = false;
			state.error = action.payload;
		}
	},
});

export const { setCurrentUser, checkUserSession, googleSignInStart, emailSignInStart, signInSuccess, signInFailed, signOutSuccess, emailSignUpStart, signUpFailed, signOutStart, signOutFailed } = userSlice.actions;

export default userSlice.reducer;
