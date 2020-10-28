import client from "../api/api-client"
import { QAData, QA, ErrReturn } from "../types"

export const submitQA = async (qa: QAData): Promise<{ success: true } | ErrReturn> => {
	try {
		qa.exhibits.forEach(async (exhibitId) => {
			let res = await client(`qa`, {
				body: {
					exhibitId,
					authorUsername: qa.user,
					assessorUsername: qa.assessor,
				},
			})
		})

		return { success: true }
	} catch (err) {
		console.error(err)
		return { success: false, message: err }
	}
}

export const getQAByCaseReference = async (
	username: string,
	caseReference: string
): Promise<QA | ErrReturn> => {
	try {
		if (!caseReference) throw new Error("A case reference is required to retrieve the QAs")
		return await client(`qa/user/${username}/caseReference/${caseReference}`)
	} catch (err) {
		return { success: false, message: err }
	}
}
