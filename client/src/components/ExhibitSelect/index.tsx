import React from "react"

import "./ExhibitSelect.scss"
import classFilter from "../../utils/classFilter"

interface ExhibitSelectProps {
	exhibit: { _id: string; reference: string }
	currentlyInQA: boolean
	onClick: (exhibitId: string) => void
}

const ExhibitSelect = ({ exhibit, currentlyInQA, onClick }: ExhibitSelectProps) => {
	const [selected, setSelected] = React.useState(false)

	const classes = classFilter({
		exhibitSelect: true,
		"exhibitSelect--selected": selected || currentlyInQA,
	})

	const toggle = () => {
		setSelected(!selected)
	}

	return (
		<button
			className={classes}
			key={exhibit._id}
			type="button"
			onClick={() => {
				if (!currentlyInQA) {
					onClick(exhibit._id)
					toggle()
				}
			}}
		>
			{exhibit.reference.toUpperCase()}{" "}
			{selected && <span className="exhibitSelect__selected-icon">✅</span>}
			{currentlyInQA && <span className="exhibitSelect__inQA-icon">🛑</span>}
		</button>
	)
}

export default ExhibitSelect
