import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import classes from './Review.module.css';
import userImage from '../assets/images/users/user-image.jpg';
import { useRouteLoaderData } from 'react-router-dom';
function Review(props) {
    const { user } = useRouteLoaderData('root');
    console.log(user);
    const userId = atob(props.id);
    let avatar = <Avatar sx={{ bgcolor: '#1d6d64', width: 56, height: 56 }} >{`${props.user[0]}`}</Avatar>;
    if (props.img.length) {
        avatar = <Avatar alt="profile image" src={props.img} sx={{ width: 56, height: 56 }} />;
    }
    if (user && userId === user.username) {
        avatar = <Avatar alt="profile image" src={user.profile_photo} sx={{ width: 56, height: 56 }} />;
    }


    return (
        <>
            <li className={classes.review}>
                {avatar}
                <Stack className={classes.details} gap={1}>
                    <Stack direction="row" gap={1}>
                        <Typography variant='subtitle1' fontWeight={700}>
                            {props.rating.toFixed(1)} {props.title}
                        </Typography>
                        <Box sx={{ borderRight: '0.06em solid black', height: '0.50em', alignSelf: 'center' }}></Box>
                        <Typography variant='subtitle1'>
                            {props.user}
                        </Typography>

                    </Stack>
                    <Typography variant='body1'>
                        {props.review}
                    </Typography>
                </Stack>
            </li>
            <Divider />
        </>
    );
}

export default Review;