export interface UserState {
	currentUser: { username: string; password: string } | null
	token: string | null
}

export interface State {
	user: UserState
}

export interface Action {
	type: string
	payload: any
}
