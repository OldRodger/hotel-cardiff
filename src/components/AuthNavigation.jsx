import { Box, Button, Stack, Typography } from '@mui/material';
import classes from './MainNavigation.module.css';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import Profile from './Profile';
import ProfileCard from './cards/ProfileCard';
import { useSelector } from 'react-redux';

function AuthNavigation() {
    const { user } = useRouteLoaderData('root');
    
    const alias = `${user.first_name} ${user.last_name[0]}.`;
    return (
        <Box component="header" className={classes.authHeader}  >
            <Link to="/">
                <Typography variant="h6">Cardiff</Typography>
            </Link>
            <Stack direction="row" gap={2} sx={{ alignSelf: 'stretch' }}>
                <Link to="/favourites" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button startIcon={<Favorite />} color='black' size='large'>Favourites</Button>
                </Link>
                <Box sx={{ borderRight: '0.1em solid black', height: '0.55em', alignSelf: 'center' }}></Box>
                <Profile alias={alias} img={user.profile_photo}>
                    <ProfileCard alias={alias} img={user.profile_photo} />
                </Profile>
            </Stack>
        </Box>
    );
}

export default AuthNavigation;