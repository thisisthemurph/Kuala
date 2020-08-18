import ActionTypes from "./userActionTypes"
import { Action, UserState } from "../types"
import { User } from "../../types"

interface UserLoginInfo {
	username: string
	password: string
}

interface UserActions {
	// login: (data: UserLoginInfo) => void
	// register: (data: { name: string; username: string; password: string }) => void
	loginSuccess: (data: { user: User; token: string }) => void
	logout: () => void
}

type DispatchCallback = (action: Action) => void

export const userActions = (state: UserState, dispatch: DispatchCallback): UserActions => ({
	// login: ({ username, password }: UserLoginInfo) => {
	// 	dispatch({ type: ActionTypes.Login, payload: { username, password } })
	// },
	loginSuccess: ({ user, token }) => {
		dispatch({ type: ActionTypes.LoginSuccess, payload: { user, token } })
	},
	logout: () => dispatch({ type: ActionTypes.Logout, payload: {} }),
})
