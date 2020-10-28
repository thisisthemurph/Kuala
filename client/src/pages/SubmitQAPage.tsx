import React from "react"
import { useParams } from "react-router-dom"

import AssessorSelect from "../components/AssessorSelect"
import ExhibitSelect from "../components/ExhibitSelect"

import { getCase } from "../services/caseServices"
import { submitQA, getQAByCaseReference } from "../services/qaServices"
import { QA, QAData, isErrReturnType } from "../types"

import { StoreContext } from "../store/user/userStore"

const SubmitQAPage = () => {
	const { caseRef } = useParams<{ caseRef: string }>()

	const [error, setError] = React.useState<string>()
	const [currentQAs, setCurrentQAs] = React.useState<QA>()
	const [qaBuilder, setQABuilder] = React.useState<QAData>({
		case: null,
		exhibits: [],
		assessor: null,
		user: null,
	})

	const { state } = React.useContext(StoreContext)

	React.useEffect(() => {
		;(async () => {
			if (qaBuilder.case === null) {
				const result = await getCase(caseRef)

				if (isErrReturnType(result)) {
					setError(result.message)
				} else if (result && state.currentUser) {
					setQABuilder({
						...qaBuilder,
						case: result,
						user: state.currentUser.user.username,
					})
				}
			}
		})()
	}, [caseRef])

	React.useEffect(() => {
		;(async () => {
			if (!currentQAs && state.currentUser !== null) {
				const result = await getQAByCaseReference(state.currentUser.user.username, caseRef)

				if (isErrReturnType(result)) {
					// setError("The case does not have a QA set")
				} else {
					setCurrentQAs(result)
				}
			}
		})()
	}, [caseRef])

	const handleSelectExhibit = (exhibitId: string) => {
		if (qaBuilder.exhibits.includes(exhibitId)) {
			const exhibits = [...qaBuilder.exhibits]
			const index = exhibits.indexOf(exhibitId)

			if (index > -1) {
				exhibits.splice(index, 1)
				setQABuilder({ ...qaBuilder, exhibits })
			}
		} else {
			setQABuilder({ ...qaBuilder, exhibits: [...qaBuilder.exhibits, exhibitId] })
		}
	}

	const handleSelectAssessor = (username: string) => {
		setQABuilder({ ...qaBuilder, assessor: username })
	}

	const handleSubmitQA = async () => {
		try {
			const result = await submitQA(qaBuilder)
			console.log(result)
		} catch (err) {
			console.log("Issue")
			console.error(err)
		}
	}

	const exhibitIsInQA = (exhibitRef: string) => {
		if (currentQAs) {
			const qa = currentQAs.exhibits.filter((e) => e.exhibit.reference === exhibitRef)[0]
			if (qa.assessments.length > 0) {
				return !qa.assessments[qa.assessments.length - 1].completed
			}
		}

		return false
	}

	const formIsComplete = (): boolean => {
		if (
			qaBuilder.case === null ||
			qaBuilder.assessor === null ||
			qaBuilder.exhibits.length === 0
		) {
			return false
		} else {
			return true
		}
	}

	if (!caseRef) return <p>A case reference has not been speified.</p>

	if (error) return <p>{error}</p>

	return (
		<form method="GET" action={`./${caseRef}`}>
			<h1>Submit QA</h1>
			<p>
				Submit exhibits from <strong>{caseRef.toUpperCase()}</strong> to QA
			</p>

			{/* <pre>{JSON.stringify(currentQAs, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(qaBuilder, null, 2)}</pre> */}

			<div>
				<p>Select the exhibits to include in the QA</p>
				{qaBuilder.case?.exhibits.map((exhibit) => (
					<ExhibitSelect
						key={exhibit._id}
						exhibit={exhibit}
						currentlyInQA={exhibitIsInQA(exhibit.reference)}
						onClick={() => handleSelectExhibit(exhibit._id)}
					/>
				))}
			</div>

			<p>Select the person to QA the exhbits</p>
			<AssessorSelect onSelect={handleSelectAssessor} />

			{formIsComplete() && (
				<button className="button" type="submit" onClick={handleSubmitQA}>
					Submit QA
				</button>
			)}
		</form>
	)
}

export default SubmitQAPage
