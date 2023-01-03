import './form-input.styles';
import { Input, FormInputLabel, Group } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
	return (
		<Group>
			{ (label) ?
				(
					<>
						<Input className={"form-input"} {...otherProps} />
						<FormInputLabel
							shrink={otherProps.value.length}
						>
							{label}
						</FormInputLabel>
					</>
				) :
				(
					<>
						null
					</>
				)
			}
		</Group>
	)
}

export default FormInput;
