import { Typography } from "@mui/material";
import Card from "../../ui/Card";
import classes from './LittleCard.module.css';

function LittleCard(props) {
    const classValue = `${classes.littleCard} ${props.noWrap && classes.noWrapper}`
    return (
        <Card className={classValue}>
            <div className={classes.imageBox}>
                <img src={props.image} alt="image" />
            </div>
            <div className={classes.contentBox}>
                <Typography variant="subtitle1" color="GrayText" fontWeight={700}>
                    {props.city}, {props.country}
                </Typography>
                {props.children}
            </div>

        </Card>
    );
}

export default LittleCard;