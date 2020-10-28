import client from "../api/api-client"
import { ErrReturn, Case } from "../types"

export const newExhibit = async (
	username: string,
	caseReference: string,
	exhibitReference: string
): Promise<{ success: true } | ErrReturn> => {
	try {
		if (!username) throw new Error("Please provide a username")
		if (!caseReference) throw new Error("Please provide a case reference")
		if (!exhibitReference) throw new Error("Please provide an exhibit reference")

		await client(`case/${caseReference}`, {
			body: { username, reference: exhibitReference },
		})

		return { success: true }
	} catch (err) {
		return { success: false, message: err.error }
	}
}

export const getCase = async (caseReference: string): Promise<Case | ErrReturn> => {
	try {
		if (!caseReference) throw new Error("Please provide a case reference")

		const result = await client(`case/${caseReference}`)
		return result
	} catch (err) {
		return { success: false, message: err.error }
	}
}
