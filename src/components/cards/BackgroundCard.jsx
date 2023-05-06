import { Button } from '@mui/material';
import Card from '../../ui/Card';
import classes from './BackgroundCard.module.css';

function BackgroundCard(props) {
    const style = {
        backgroundImage: `linear-gradient(
            rgba(0,0,0, .25),
            rgba(0,0,0, .35),
            rgba(0,0,0, .65)
        ), url('${props.bgImage}')`
    }
    return (
        <Card>
            <figure style={style} className={classes.card}>
                {props.children}
            </figure>
        </Card>
    );
}

export default BackgroundCard;