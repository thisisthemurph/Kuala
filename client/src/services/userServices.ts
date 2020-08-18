import client from "../api/api-client"
import { User } from "../types"

export const getUser = async (username: string, token: string): Promise<User> => {
	try {
		if (!token) throw new Error("Authentication Error: an authentication token is required")
		if (!username) throw new Error("Please provide a username")

		const user = (await client(`user/${username}`)) as User
		return user
	} catch (err) {
		throw new Error(err)
	}
}
