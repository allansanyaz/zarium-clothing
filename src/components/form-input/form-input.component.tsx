import './form-input.styles';
import { Input, FormInputLabel, Group } from './form-input.styles';
import { InputHTMLAttributes, FC } from "react";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
};
const FormInput: FC<IFormInputProps> = ({ label, ...otherProps }) => {
	return (
		<Group>
			{ (label) ?
				(
					<>
						<Input className={"form-input"} {...otherProps} />
						<FormInputLabel
							shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}
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
