import { FormikHelpers } from "formik";

export interface IInitialValues {
	productName: string,
	file: File | null,
	productQnt: number,
}

export type Props = {
	initialValues: IInitialValues,
	validationSchema: unknown,
	onSubmit: (values: IInitialValues, form: FormikHelpers<IInitialValues>) => void,
	onInputChange: (files: File[]) => void
};
