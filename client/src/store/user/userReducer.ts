import ActionTypes from "./userActionTypes"
import { UserState, Action } from "../types"

export const userInitialState: UserState = {
	currentUser: null,
	token: localStorage.getItem("token"),
}

export const userReducer = (state = userInitialState, action: Action): UserState => {
	switch (action.type) {
		case ActionTypes.LoginSuccess:
			return {
				...state,
				currentUser: action.payload.user,
				token: action.payload.token,
			}
		case ActionTypes.Logout:
			return {
				...state,
				currentUser: null,
				token: null,
			}
		default:
			console.error(`AN UNEXPECTED ACTION TYPE HAS BEEN PASSED: ${action.type}`)
			return state
	}
}
