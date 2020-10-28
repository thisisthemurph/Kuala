import React from "react"

import { AllCasesTable } from "../components/tables"

import { getAllCases } from "../services/userServices"
import { getQAByCaseReference } from "../services/qaServices"
import { StoreContext } from "../store/user/userStore"

import { QA, isErrReturnType } from "../types"

const ProfilePage = () => {
	const { state } = React.useContext(StoreContext)
	const token = localStorage.getItem("token")

	const [allCases, setAllCases] = React.useState<QA[]>([])

	React.useEffect(() => {
		;(async () => {
			if (state.currentUser && token) {
				const cases = await getAllCases(state.currentUser.user.username, token)

				for (const caseRef in cases.cases) {
					const _case = cases.cases[caseRef]
					const qa = await getQAByCaseReference("michael.murphy", caseRef)

					if (isErrReturnType(qa)) {
						console.log(`Error fetching QA for ${caseRef}`)
					} else {
						setAllCases([...allCases, qa])
					}
				}
			}
		})()
	}, [])

	return (
		<>
			<h1>Profile</h1>

			<h2>All Cases</h2>
			<p>All cases submitted</p>

			{allCases && <AllCasesTable qaList={allCases} />}
			{/* <pre>{JSON.stringify(allCases, null, 2)}</pre> */}
		</>
	)
}

export default ProfilePage
