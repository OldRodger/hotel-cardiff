import { Box, Typography } from "@mui/material";
import classes from './AccountNav.module.css';
import { NavLink } from "react-router-dom";

function AccountNav() {
    const activeClass = isActive => isActive ? classes.active : "";
    
    return (
        <Box className={classes.navigation}>
            <NavLink to="/account">
                <Typography variant="body1">Account</Typography>
            </NavLink>
            <NavLink to="/account/bookings">
                <Typography variant="body1">Bookings</Typography>
            </NavLink>
            <NavLink to="/account/cards">
                <Typography variant="body1">Payment methods</Typography>
            </NavLink>
        </Box>
    );
}

export default AccountNav;