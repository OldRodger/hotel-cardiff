import { Avatar } from '@mui/material';
import classes from './AccountBanner.module.css';

function AccountBanner(props) {




    return (
        <header className={classes.banner} style={{
            backgroundImage: `url(${props.hero})`
        }} >

            {
                props.profile ?
                    <Avatar sx={{ width: 125, height: 125 }} className={classes['banner__img']} src={props.profile} /> :
                    <Avatar sx={{ width: 125, height: 125 }} className={classes['banner__img']} />
            }

        </header>
    );
}

export default AccountBanner;