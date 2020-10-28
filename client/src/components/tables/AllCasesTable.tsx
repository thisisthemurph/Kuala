import React from "react"

import Table from "../Table"
import numberToOrdinal from "../../utils/numberToOrdinal"
import { Exhibit, Assessment, QA } from "../../types"

interface CaseTableDataRow {
	caseref: string
	exhibitref: string
	created: string
	state: string
}

interface CasesProps {
	qaList: QA[]
}

const makeData = (qaList: QA[]) => {
	const data: CaseTableDataRow[] = []

	qaList.forEach((qa) => {
		qa.exhibits.forEach((exhibit) => {
			data.push({
				caseref: qa.reference.toUpperCase(),
				exhibitref: exhibit.exhibit.reference.toUpperCase(),
				created: exhibit.exhibit.createdAt,
				state: determineState(exhibit.exhibit, exhibit.assessments),
			})
		})
	})

	return data
}

const determineState = (exhibit: Exhibit, assessments: Assessment[]) => {
	if (!assessments || assessments.length === 0) {
		return "⏳ Pending"
	}

	const qaOrd = numberToOrdinal(assessments.length)
	if (assessments[assessments.length - 1].completed) {
		return `🏁 ${qaOrd} QA Complete`
	} else {
		return `🔎 In ${qaOrd} QA`
	}
}

const AllCasesTable = ({ qaList }: CasesProps) => {
	const columns = React.useMemo(
		() => [
			{
				Header: "All Cases",
				columns: [
					{
						Header: "Case Reference",
						accessor: "caseref",
					},
					{
						Header: "Exhibit Reference",
						accessor: "exhibitref",
					},
					{
						Header: "Created",
						accessor: "created",
					},
					{
						Header: "State",
						accessor: "state",
					},
				],
			},
		],
		[]
	)

	const data = makeData(qaList)

	return (
		<div>
			<Table columns={columns} data={data} />
		</div>
	)
}

export default AllCasesTable
