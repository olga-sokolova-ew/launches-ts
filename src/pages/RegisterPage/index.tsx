import {
	Box,
	Container
} from "@material-ui/core";
import { FormikHelpers } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { RegisterForm } from "../../components/forms/RegisterForm";
import { IInitialValues } from "../../components/forms/RegisterForm/RegisterForm.types";
import { useAuth } from "../../contexts/AuthContext";

const RegisterPage: FC = () => {
	const authContext = useAuth();
	if (authContext === null) {
		return null;
	}
	const { signup } = authContext;

	const initialValuesSignIn = { email: "", password: "", passwordConfirm: "" };

	const onSubmit = (
		values: IInitialValues, form: FormikHelpers<IInitialValues>
	) => {
		signup(values);
		form.setSubmitting(false);
	};

	const validationSchema =
		Yup.object().shape({
			email: Yup.string().email("Must be a valid email")
				.max(255).required("Email is required"),
			password: Yup.string().max(255).required("Password is required")
		});

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			height="100vh"
			justifyContent="center"
		>
			<Container maxWidth="sm" >
				<RegisterForm
					initialValues={initialValuesSignIn}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				/>
			</Container>
		</Box>
	);
};

export default RegisterPage;
