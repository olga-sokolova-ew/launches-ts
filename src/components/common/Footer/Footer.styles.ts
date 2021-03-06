import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	footer: {
		position: "relative",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		border: 0,
		minHeight: theme.spacing(12.5),
		padding: theme.spacing(
			0,
			10
		),
		background: theme.palette.background.default,
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(2),
		},
	},
	footerContainer: {
		display: "flex",
		flexDirection: "column"
	},
	footerMenu: {
		maxWidth: theme.spacing(147.5),
		padding: theme.spacing(
			2.5,
			0
		),
		margin: "0 auto",
		display: "flex",
		alignItems: "center",

	},
	footerMenuLink: {
		display: "inline-flex",
		textDecoration: "none",
		transition: "0.3s ease",
		marginRight: theme.spacing(3.75),
		"&:hover": {
			opacity: "0.9",
		},
		"&.MuiTypography-root": {
			marginRight: theme.spacing(3.75)
		}
	},

	footerWrapper: {
		width: "100%",
		maxWidth: theme.spacing(147.5),
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column"
		},
	},
	footerLink: {
		width: theme.spacing(6.125),
		height: theme.spacing(6.875),
		transition: "0.3s ease",
		"&:hover": {
			opacity: "0.9",
		},

		"& svg": {
			width: theme.spacing(6.125),
			height: theme.spacing(6.875),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(3.75),
		},
	},
	footerCopyright: {
		color: theme.palette.info.main,

	}
}));
