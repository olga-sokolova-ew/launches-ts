
import "firebase/auth";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";
import {
	createContext,
	FC,
	useContext,
	useEffect,
	useState
} from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { stateType } from "../components/forms/LoginForm/LoginForm.types";
import { auth } from "../firebase/firebaseConfig";
import { requireAuthorization } from "../redux/auth/sliceReducer";
import { AppRouteEnum, AuthorizationStatusEnum } from "../types/Enums";
import {
	outputtingError,
	outputtingGoogleError
} from "../utils/toastHelper";
import {
	FirebaseError, IValue, Props, SProps
} from "./AuthContext.types";

const AuthContext = createContext<IValue | null>(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider: FC = ({ children }: Props) => {
	const intl = useIntl();
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(
		() => {
			setIsLoading(true);
			const unsubsribe = onAuthStateChanged(
				auth,
				(user) => {
					if (user) {
						setCurrentUser(user.email);
						setCurrentUserId(user.uid);
						dispatch(requireAuthorization(AuthorizationStatusEnum.AUTH));
					} else {
						setCurrentUser(null);
						setCurrentUserId(null);
						dispatch(requireAuthorization(AuthorizationStatusEnum.NO_AUTH));
					}
					setIsLoading(false);
				}
			);
			return unsubsribe;
		},
		[]
	);

	const signup = async ({
		email, password
	}: SProps) => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			history.push(AppRouteEnum.LOGIN);

		} catch (error) {
			outputtingError(
				(error as FirebaseError).code,
				intl
			);
		}
	};

	const login = async (
		{ email, password }: SProps, { from }: stateType
	) => {
		try {
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setCurrentUser(result.user.email);
			setCurrentUserId(result.user.uid);
			dispatch(requireAuthorization(AuthorizationStatusEnum.AUTH));
			//history.push(AppRouteEnum.DASHBOARD);
			history.replace(from);

		} catch (error) {
			outputtingError(
				(error as FirebaseError).code,
				intl
			);
		}
	};

	const logout = async () => {
		return signOut(auth).then(() => {
			dispatch(requireAuthorization(AuthorizationStatusEnum.NO_AUTH));
		});
	};

	const googlePopupSignIn = async ({ from }: stateType) => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(
				auth,
				provider
			);
			setCurrentUser(result.user.email);
			setCurrentUserId(result.user.uid);
			dispatch(requireAuthorization(AuthorizationStatusEnum.AUTH));
			//history.push(AppRouteEnum.DASHBOARD);
			history.replace(from);
		} catch (error) {
			outputtingGoogleError(
				(error as FirebaseError).code,
				intl
			);
		}
	};

	const value = {
		currentUser, // = user.emailVerified
		currentUserId,
		login,
		signup,
		logout,
		googlePopupSignIn
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};
