import { User } from "../types"

export interface UserState {
	currentUser: User | null
	token: string | null
}

export interface State {
	user: UserState
}

export interface Action {
	type: string
	payload: any
}
