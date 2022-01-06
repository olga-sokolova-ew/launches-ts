import { Database } from "@firebase/database";
import { FirebaseStorage } from "@firebase/storage/dist/storage-public";
import { IInitialValues } from "components/forms/NewProductForm/NewProductForm.types";
import { ref, set } from "firebase/database";
import {
	getDownloadURL, ref as storeRef, uploadBytesResumable
} from "firebase/storage";
import { IValue } from "../contexts/AuthContext.types";
import { Ensure } from "../utils/helper";
import { showAddProductFailToast, showAddProductSuccessToast } from "../utils/toastHelper";

/*export interface IProductValues {
	id?: number;
	productName: string;
	productQnt: number;
	//file?: string;
	file?: File;
}*/
export interface IProductValues extends IInitialValues {
	id: number;
	//file?: File;
}

export type IAuthCurrentUserId = Ensure<IValue, "currentUserId">;

export const uploadFile = async (
	file: File, storage: FirebaseStorage
): Promise<string> => {
	const fileRef = storeRef(
		storage,
		"images/" + file.name
	);
	await uploadBytesResumable(
		fileRef,
		file
	);
	const fileUrl = await getDownloadURL(fileRef);
	return fileUrl;
};

export const setInfoToDatabase = (
	currentUserId: string,
	values: IInitialValues,
	fileUrl: string | null,
	database: Database,
) => {
	set(
		ref(
			database,
			`users/${currentUserId}/products/` + values.productName
		),
		{
			id: Date.now(),
			title: values.productName,
			quantity: values.productQnt,
			product_picture: fileUrl
		}
	)
		.then(() => {
			showAddProductSuccessToast();
		})
		.catch(() => {
			showAddProductFailToast();
		});
};
