import { ButtonUnstyled } from "@mui/core";
import {
	Box, Link, Typography
} from "@mui/material";
import { FC } from "react";
import { useIntl } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ArrowLeftSvg } from "../../../assets/common/arrow_left.svg";
import { ReactComponent as LogoSvg } from "../../../assets/common/logo.svg";
import { useAuth } from "../../../contexts/AuthContext";
import { AppRouteEnum } from "../../../types/Enums";
import { useStyles } from "./Header.styles";
import type { IAuth, Props } from "./Header.types";
import { UserMenu } from "./UserMenu";

export const Header: FC<Props> = ({ isMain = false }) => {
	const classes = useStyles();
	const intl = useIntl();
	const { currentUser, logout } = useAuth() as IAuth;
	const onLogoutClick = () => logout();

	return (
		<Box
			component="div"
			className={classes.header}
		>
			<Box className={classes.headerContainer}>
				<Box className={classes.loginWrap}>
					{currentUser && currentUser?.email &&
						<>
							<Typography
								variant="body1"
								component="div"
								className={classes.headerStyled}
							>
								{intl.formatMessage({ id: "loginAs" })}
								{"  " + currentUser?.email}
							</Typography>
							<ButtonUnstyled
								color="primary"
								size="small"
								className={classes.logoutBtn}
								onClick={onLogoutClick}
							>{intl.formatMessage({ id: "logout" })}
							</ButtonUnstyled>
						</>}

					{(!currentUser) &&
						<Link
							to={AppRouteEnum.LOGIN}
							component={RouterLink}
							className={classes.headerLoginLink}
						>
							{intl.formatMessage({ id: "login" })}
						</Link>}

				</Box>
				{isMain ? (

					<Box className={classes.headerWrapperMain}>
						<LogoSvg />
					</Box>

				) : (

					<Box className={classes.headerWrapper}>
						<Link
							component={RouterLink}
							to={AppRouteEnum.ROOT}
							className={classes.headerBack}
						>
							<ArrowLeftSvg />
							<Typography variant="h3">Back To Home</Typography>
						</Link>
						<Link
							component={RouterLink}
							to={AppRouteEnum.ROOT}
							className={classes.headerLink}
						>
							<LogoSvg />
						</Link>
					</Box>

				)}
				{currentUser && <UserMenu />}
			</Box>
		</Box>
	);
};
