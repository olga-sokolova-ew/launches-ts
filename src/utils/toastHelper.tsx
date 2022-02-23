import { FormattedMessage, IntlShape } from "react-intl";
import { toast } from "react-toastify";

export const showToast = (): void => {
	const currentId = "errorServer";
	toast.error(
		<FormattedMessage
			id="errorServer"
		/>,
		{ toastId: currentId }
	);
};
export const showAddProductSuccessToast = (): void => {
	const currentId = "productSuccess";
	toast.success(
		<FormattedMessage
			id="addProductSuccess"
		/>,
		{ toastId: currentId }
	);
};
export const showAddProductFailToast = (): void => {
	const currentId = "productFail";
	toast.error(
		<FormattedMessage
			id="addProductFail"
		/>,
		{ toastId: currentId }
	);
};
export const showUploadFailToast = (): void => {
	const currentId = "uploadFail";
	toast.error(
		<FormattedMessage
			id="uploadFiletFail"
		/>,
		{ toastId: currentId }
	);
};

export const showServerDetail = (error: string): void => {
	const currentDetailId = "currentDetailId";
	toast.error(
		error,
		{ toastId: currentDetailId }
	);
};

export const outputtingError = (
	error: string, intl: IntlShape
): void => {

	switch (error) {
		case "auth/user-not-found": toast.error(intl.formatMessage({ id: "userNotFound" }));
			break;
		case "auth/email-already-exists":
			toast.error(intl.formatMessage({ id: "emailAlreadyExist" }));
			break;
		case "auth/email-already-in-use":
			toast.error(intl.formatMessage({ id: "emailAlreadyInUse" }));
			break;
		case "auth/wrong-password":
			toast.error(intl.formatMessage({ id: "invalidPassword" }));
			break;
		case "auth/too-many-requests":
			toast.error(intl.formatMessage({ id: "tooManyRequest" }));
			break;
		case "400":
			toast.error(intl.formatMessage({ id: "emailAlreadyExist" }));
			break;
		default:
			toast.error(intl.formatMessage({ id: "errorInLogin" }));
	}
};

export const outputtingGoogleError = (
	error: string, intl: IntlShape
): void => {

	switch (error) {
		case "auth/user-not-found":
			toast.error(intl.formatMessage({ id: "userNotFound" }));
			break;
		default:
			toast.error(intl.formatMessage({ id: "errorInGoogleLogin" }));
	}
};
