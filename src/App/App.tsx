import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
//import { PersistGate } from "redux-persist/integration/react";

//import { Loader } from "../components/common/Loader";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { Main } from "../pages/Main";


const App: FC = () => {

	return (

	<Provider store={store}>
		<Main />				 
	</Provider>
	);
};

export default App;
