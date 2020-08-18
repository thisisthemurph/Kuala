export interface User {
	user: {
		_id: string
		username: string
		name: string
		notifications: [
			{
				actioned: boolean
				created: string
				_id: string
				message: string
				link: string
				author: string
			}
		]
	}
}

export interface UserCredentials {
	user: { username: string; password?: string }
	token: string
}

export interface ErrReturn {
	success: boolean
	message: string
}

export const isErrReturnType = (res: User | UserCredentials | ErrReturn): res is ErrReturn => {
	return (res as ErrReturn).success === true || (res as ErrReturn).success === false
}
