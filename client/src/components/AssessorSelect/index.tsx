import React from "react"

import classFilter from "../../utils/classFilter"
import { getAssessors } from "../../services/userServices"

import { StoreContext } from "../../store/user/userStore"

import "./AssessorSelect.scss"

interface Assessor {
	user: { isAssessor: boolean; _id: string; username: string; name: string }
	info: { qaCount: number }
}

interface AssessorSelectResultProps {
	assessor: Assessor
	selected: boolean
	onClick: () => void
}

const AssessorSelectResult = ({ assessor, selected, onClick }: AssessorSelectResultProps) => {
	const { state } = React.useContext(StoreContext)

	const classes = classFilter({
		"assessor-select__result": true,
		"assessor-select__result--selected": selected,
	})

	// Do not return the current user, you cannot QA your own work!
	if (state.currentUser?.user.username === assessor.user.username) return null

	return (
		<div className={classes} onClick={onClick}>
			<div className="assessor-select__result-name">{assessor.user.name}</div>
			<div className="assessor-select__result-progress">
				<progress max="10" value="7">
					70%
				</progress>
			</div>
			<div className="assessor-select__result-quantity">
				<span>{assessor.info.qaCount}</span>
			</div>
		</div>
	)
}

interface AssessorSelectProps {
	onSelect: (username: string) => void
}

const AssessorSelect = ({ onSelect }: AssessorSelectProps) => {
	const token = localStorage.getItem("token")

	const [assessors, setAssessors] = React.useState<Assessor[]>([])
	const [filteredAssessors, setFilteredAssessors] = React.useState<Assessor[]>([])
	const [filter, setFilter] = React.useState<string | null>(null)
	const [selectedAssessor, setSelectedAssessor] = React.useState<string>()

	React.useEffect(() => {
		;(async () => {
			if (token) {
				setAssessors(await getAssessors(token))
			}
		})()
	}, [])

	React.useEffect(() => {
		if (filteredAssessors.length === 0 && filter === null) {
			// This is the first run and filtered should equate to all assessors
			setFilteredAssessors(assessors)
		} else if (filter !== null) {
			const results = assessors.filter((assessor) => {
				return (
					assessor.user.name.toLowerCase().match(filter) ||
					assessor.user.username.toLowerCase().match(filter) ||
					assessor.user.username.toLowerCase().replace(".", " ").match(filter)
				)
			})
			setFilteredAssessors(results)
		}
	}, [assessors, filter])

	return (
		<>
			<div className="assessor-select">
				<div className="assessor-select__input">
					<input
						type="text"
						placeholder="Search for an assessor"
						onChange={(v) => setFilter(v.target.value.toLowerCase())}
					/>
				</div>
				<div className="assessor-select__results">
					{filteredAssessors.length ? (
						filteredAssessors.map((assessor) => (
							<AssessorSelectResult
								key={assessor.user.username}
								assessor={assessor}
								selected={selectedAssessor === assessor.user.username}
								onClick={() => {
									setSelectedAssessor(assessor.user.username)
									onSelect(assessor.user.username)
								}}
							/>
						))
					) : (
						<div className="assessor-select__error">
							There are no assessors to show here 😭
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default AssessorSelect
