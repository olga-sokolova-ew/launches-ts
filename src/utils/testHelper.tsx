import { ThemeProvider } from "@mui/material/styles";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { AuthValues } from "../contexts/AuthContext.types";
import AppIntlProvider from "../hocs/AppIntlProvider";
import { setupStore } from "../redux/store";
import type { AppStore, RootState } from "../redux/store/store.types";
import theme from "../theme";
import { AuthorizationStatusEnum } from "../types/Enums";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store. For
// future dependencies, such as wanting to test with react-router, you can extend
// this interface to accept a path and route and use those in a <MemoryRouter />
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>
	store?: AppStore
}

const currentUser = {
	email: "test@test.com",
	userId: "test"
};

const currentUserNull = null;

const login = jest.fn(() => {
	return Promise.resolve();
});
const signup = jest.fn(() => {
	return Promise.resolve();
});
const logout = jest.fn(() => {
	return Promise.resolve();
});
const googlePopupSignIn = jest.fn(() => {
	return Promise.resolve();
});

const testValue = {
	currentUser,
	login,
	signup,
	logout,
	googlePopupSignIn
};

const testValueNull = {
	currentUser: currentUserNull,
	login,
	signup,
	logout,
	googlePopupSignIn
};

const history = createMemoryHistory({ initialEntries: ["/Private"] });
const historyCommon = createMemoryHistory({ initialEntries: ["/Common"] });

const renderWithProvidersUser = (testInfo: AuthValues) => (
	ui: React.ReactElement,

	{
		preloadedState = {},
		store = setupStore(preloadedState),

		...renderOptions
	}: ExtendedRenderOptions = {}
) => {
	const Wrapper = ({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element => {
		return (<Provider store={store}>
			<BrowserRouter>
				<AppIntlProvider>
					<AuthContext.Provider value={testInfo}>
						<ThemeProvider theme={theme}>
							{children}
						</ThemeProvider>
					</AuthContext.Provider>
				</AppIntlProvider>
			</BrowserRouter>
		</Provider>);
	};
	return {
		store, ...render(
			ui,
			{ wrapper: Wrapper, ...renderOptions }
		)
	};
};
const renderWithProvidersLogin = renderWithProvidersUser(testValue);
const renderWithProvidersLogout = renderWithProvidersUser(testValueNull);

/**
 * BrowserRouter ignores the history prop as it handles the history automatically for you.
 * If you need access to the history outside of a react component, then using Router should be fine
 */
const renderWithAuth = (
	ui: React.ReactElement,
	{
		preloadedState = {
			auth: {
				authorizationStatus: AuthorizationStatusEnum.AUTH,
			}
		},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) => {
	const Wrapper = ({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element => {
		return (<Provider store={store}>
			<Router history={history}>
				<AppIntlProvider>
					<AuthContext.Provider value={testValue}>
						<ThemeProvider theme={theme}>
							{children}
						</ThemeProvider>
					</AuthContext.Provider>
				</AppIntlProvider>
			</Router>
		</Provider>);
	};

	return {
		store, ...render(
			ui,
			{ wrapper: Wrapper, ...renderOptions }
		)
	};
};
const renderWithUnknown = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) => {
	const Wrapper = ({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element => {
		return (<Provider store={store}>
			<Router history={historyCommon}>
				{children}
			</Router>
		</Provider>);
	};

	return {
		store, ...render(
			ui,
			{ wrapper: Wrapper, ...renderOptions }
		)
	};
};

export { renderWithProvidersLogin, renderWithProvidersLogout, renderWithAuth, renderWithUnknown };
