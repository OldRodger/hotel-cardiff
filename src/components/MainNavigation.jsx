import { Bed } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import classes from './MainNavigation.module.css';
import { Link } from "react-router-dom";


function MainNavigaion() {
    return (
        <Box component="header" className={classes.header}  >
            <Button
                startIcon={<Bed />}
                size='large'
                color='neutral'
                disableElevation
                disableRipple
            >Find Stays</Button>
            <Typography variant="h6" color="white">Cardiff</Typography>
            <Stack direction="row" gap={2}>
                <Link to="/auth?mode=login">
                    <Button size="large" color="neutral">Login</Button>
                </Link>
                <Link to="/auth?mode=signup">
                    <Button size="large" variant="contained" color="neutral" disableElevation data-type="stagnant">Sign up</Button>
                </Link>
            </Stack>
        </Box>
    );
}

export default MainNavigaion;