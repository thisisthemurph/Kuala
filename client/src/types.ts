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

export interface Exhibit {
	_id: string
	reference: string
	caseReference: string
	analyst: string
	createdAt: string
	updatedAt: string
}

export interface Case {
	caseReference: string
	numExhibits: number
	exhibits: Exhibit[]
}

// A return type for an object of cases
export interface CasesObject {
	cases: { [key: string]: Exhibit[] }
}

// An assessment, which forms part of a QA
export interface Assessment {
	scores: {
		presentation: number
		notes: number
		methodology: number
		exhibitedData: number
		prevQA: number
		neglectful: number
	}
	completed: boolean
	comments: string[]
	assessor: {
		username: string
	}
}

export interface QA {
	author: string
	reference: string
	exhibits: [
		{
			exhibit: Exhibit
			assessments: Assessment[]
		}
	]
}

export interface QAData {
	case: Case | null
	exhibits: string[]
	assessor: string | null // The assessors User._id
	user: string | null // The analyst's User._id
}

export interface ErrReturn {
	success: boolean
	message: string
}

export const isErrReturnType = (
	res: User | UserCredentials | Case | ErrReturn | QA
): res is ErrReturn => {
	return (res as ErrReturn).success === true || (res as ErrReturn).success === false
}
