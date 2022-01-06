import {
	Box,
	Container
} from "@material-ui/core";
import { IInitialValues } from "components/forms/NewProductForm/NewProductForm.types";
import { FormikHelpers } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { NewProductForm } from "../../components/forms/NewProductForm";
import { useAuth } from "../../contexts/AuthContext";
import {
	IAuthCurrentUserId, setInfoToDatabase,
	uploadFile
} from "../../firebase/actions";
import { database, storage } from "../../firebase/firebaseConfig";
import { PageLayout } from "../../layouts/PageLayout";

interface FileInfo {
	fileName: string,
	type: string,
	size: number,
}

const AddProductPage: FC = () => {
	//const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
	const initialValuesAddProduct = { productName: "", file: null, productQnt: 0 };

	const authContext = useAuth();
	if (authContext === null) {
		return null;
	}
	const { currentUserId } = authContext as IAuthCurrentUserId;

	//let fileInfoLine;

	const onInputChange = async (files: File[]) => {
		if (files.length === 0) {
			//setFileUrl(null);
			setFileInfo(null);
			return;
		}
		/*const currentFileUrl = await uploadFile(
			files[0],
			storage
		);*/

		setFileInfo({
			fileName: files[0].name,
			type: files[0].type,
			size: files[0].size,
		});

	};

	const onSubmit = async (
		values: IInitialValues,
		form: FormikHelpers<IInitialValues>
	) => {
		let fileUrl = null;
		if (values.file) {
			fileUrl = await uploadFile(
				values.file,
				storage
			);
		}

		setInfoToDatabase(
			currentUserId,
			values,
			fileUrl,
			database
		);

		form.setSubmitting(false);
		form.resetForm();
	};


	const validationSchema =
		Yup.object().shape({
			productName: Yup.string().min(2).max(255).required("Product name is required"),
			file: Yup.mixed()
				.nullable()
				.notRequired(),
			productQnt: Yup.number().min(0)
		});

	return (
		<PageLayout>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent="center"
				flexGrow="1"
			>
				<Container maxWidth="sm" >
					<NewProductForm
						initialValues={initialValuesAddProduct}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
						onInputChange={onInputChange}
					/>
				</Container>
			</Box>
		</PageLayout>
	);
};

export default AddProductPage;
