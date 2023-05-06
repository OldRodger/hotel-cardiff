import { Button, Stack, Typography } from '@mui/material';
import classes from './Room.module.css';
import { Link } from 'react-router-dom';

function Room(props) {



    return (
        <li className={classes.room}>
            <Stack direction="row" alignItems="center" gap={1.5} marginRight="auto">
                <div className={classes.imgBox}>
                    <img src={props.image} alt="room_img" />
                </div>
                <Typography variant='subtitle1' textTransform="capitalize">{props.name} room</Typography>
            </Stack>
            <Typography variant="h5" fontWeight={700}>
                &pound;{props.price}
                <Typography component="span" variant="subtitle2">/night</Typography>
            </Typography>

            <Link to={`book?room=${props.name}`}>
                <Button data-type="stagnant" variant='contained'>Book Now</Button>
            </Link>
        </li>
    );
}

export default Room;