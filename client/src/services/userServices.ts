import client from "../api/api-client"
import { User, CasesObject } from "../types"

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

export const getAssessors = async (token: string): Promise<any> => {
	try {
		if (!token) throw new Error("Authentication Error: an authentication token is required")

		const assessors = await client(`user/assessors`)
		return assessors
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}

export const getAllCases = async (username: string, token: string): Promise<CasesObject> => {
	try {
		if (!token) throw new Error("Authentication Error: an authentication token is required")
		if (!username) throw new Error("Please provide a username")

		const cases = await client(`user/${username}/cases`)
		return cases
	} catch (err) {
		throw new Error(err)
	}
}

export const getCurrentSubmittedQAs = async (username: string, token: string): Promise<any> => {
	try {
		if (!token) throw new Error("Authentication Error: an authentication token is required")
		if (!username) throw new Error("Please provide a username")

		const cases = await client(`user/${username}/qa/submitted`)
		return cases
	} catch (err) {
		throw new Error(err)
	}
}
