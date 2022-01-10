import React from "react";
import { stateType } from "../pages/Login";

export type Props = {
	children?: React.ReactNode;
};

export type SProps = {
	email: string,
	password: string,
};
export type FirebaseError = {
	code: string,
	message: string,
	name: string,
};

export interface IValue {
	currentUser: string | null;
	currentUserId: string | null;
	login: ({ email, password }: SProps, { from }: stateType) => Promise<void>
	signup: ({
		email, password
	}: SProps) => Promise<void>;
	logout: () => Promise<void>;
	googlePopupSignIn: () => Promise<void>;
}
