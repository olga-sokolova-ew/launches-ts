import { screen } from "@testing-library/react";
import { NewProductForm } from ".";
import { renderWithProvidersLogout } from "../../../utils/testHelper";

const initialValuesProduct = { productName: "TestName", file: "", productQnt: 5 };
const testSubmit = jest.fn();
const onInputChange = jest.fn(() => {
	return Promise.resolve();
});

describe(
	"Component: NewProductForm",
	() => {
		it(
			"should render correctly without user",
			() => {
				renderWithProvidersLogout(<NewProductForm
					initialValues={initialValuesProduct}
					onSubmit={testSubmit}
					onInputChange={onInputChange}
				/>);

				//button
				expect(screen.getByText(
					/Add new product/i,
					{ selector: "button" }
				)).toBeInTheDocument();

				//inputs

				//for email input
				expect(screen.getByRole(
					"textbox",
					{ name: "" }
				)).toBeInTheDocument();

				expect(screen.getByDisplayValue(/TestName/i)).toBeInTheDocument();
				expect(screen.getByDisplayValue(5)).toBeInTheDocument();

				//texts
				screen.getAllByText(/Accepted files/i).forEach((item) => {
					expect(item).toBeInTheDocument();
				});
				screen.getAllByText(/Rejected files/i).forEach((item) => {
					expect(item).toBeInTheDocument();
				});

				expect(screen.getByRole(
					"heading",
					{ name: "New Product" }
				)).toBeInTheDocument();

			}
		);

	}
);