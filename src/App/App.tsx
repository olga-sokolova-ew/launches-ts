import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { setupStore } from "redux/store";
import { Loader } from "../components/common/Loader";
import { AuthProvider } from "../contexts/AuthContext";
import AppIntlProvider from "../hocs/AppIntlProvider";
import Routes from "../routes";
import theme from "../theme";
import "./App.scss";

export const store = setupStore();
const persistor = persistStore(store);

const App: FC = () => {

	return (
		<Provider store={store}>
			<AppIntlProvider>
				<PersistGate
					loading={<Loader />}
					persistor={persistor}
				>
					<BrowserRouter>
						<AuthProvider>
							<ThemeProvider theme={theme}>
								<CssBaseline />
								<Routes />
								<ToastContainer
									position="bottom-right"
									autoClose={5000}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
								/>
							</ThemeProvider>
						</AuthProvider>
					</BrowserRouter>
				</PersistGate>
			</AppIntlProvider>
		</Provider>
	);
};

export default App;
