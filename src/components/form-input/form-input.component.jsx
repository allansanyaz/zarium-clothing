import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
	return (
		<div className={"group"}>
			{ (label) ?
				(
					<>
						<input className={"form-input"} {...otherProps} />
						<label
							className={`${otherProps.value.length ? `shrink` : ''} 
							form-input-label`}
						>
							{label}
						</label>
					</>
				) :
				(
					<>
						null
					</>
				)
			}
		</div>
	)
}

export default FormInput;
