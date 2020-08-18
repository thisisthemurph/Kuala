import client from "../api/api-client"
import { getUser } from "./userServices"
import { User, UserCredentials, ErrReturn } from "../types"

interface ReqConfig extends Omit<RequestInit, "body"> {
	body?: object
}

export const login = async (
	username?: string,
	password?: string,
	authToken?: string
): Promise<User | ErrReturn> => {
	if (!authToken) {
		if (!username && !password) {
			throw new Error("Username and password or an authiorisation token must be provided")
		}
	}

	try {
		const request: ReqConfig =
			username && password
				? { body: { username, password } }
				: { method: "POST", headers: { authorization: authToken || "" } }

		const credentials = (await client("auth/login", request)) as UserCredentials
		localStorage.setItem("token", credentials.token)

		const user = await getUser(credentials.user.username, credentials.token)
		return user
	} catch (err) {
		return { success: false, message: err.error }
	}
}

export const register = async (
	name: string,
	username: string,
	password: string
): Promise<UserCredentials | ErrReturn> => {
	try {
		if (!name && !username && !password)
			throw new Error("All registration information must be completed")

		const credentials = await client("auth/register", {
			body: { name, username, password },
		})

		return credentials
	} catch (err) {
		return { success: false, message: err.error }
	}
}
