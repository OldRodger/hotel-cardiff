import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "../../ui/Card";
import classes from './BookingCard.module.css';
import { formatDate } from "../../utils/helper";
import { grey } from "@mui/material/colors";
import TimeBox from "../TimeBox";
import { SensorDoor, WatchLater } from "@mui/icons-material";
import { Link } from "react-router-dom";

function BookingCard(props) {
    return (
        <Card className={classes.booking}>
            <Box className={classes["img-box"]}>
                <img src={props.logo} alt="Logo" />
            </Box>
            <Box className={classes.date}>
                <Box>
                    <Typography variant="body1">check-in</Typography>
                    <Typography variant="h5">{formatDate(props.checkInDate, true, true)}</Typography>
                </Box>
                &mdash;
                <Box>
                    <Typography variant="body1">check-out</Typography>
                    <Typography variant="h5">{formatDate(props.checkOutDate, true, true)}</Typography>
                </Box>
            </Box>
            <Box sx={{ width: '1.5px', background: grey[400] }}>&nbsp;</Box>
            <Box className={classes.arrival}>
                <TimeBox title="Check-in-time" text={props.checkInTime} icon={<WatchLater sx={{ color: "#8dd3bb" }} />} />
                <TimeBox title="Room no." text={props.roomNumber} icon={<SensorDoor sx={{ color: "#8dd3bb" }} />} />
                <TimeBox title="Check-out-time" text={props.checkOutTime} icon={<WatchLater sx={{ color: "#8dd3bb" }} />} />
            </Box>

            <Link to={`/tickets/${props.ticketNumber}`}>
                <Button data-type="stagnant" variant="contained">View Ticket</Button>
            </Link>
        </Card>
    );
}

export default BookingCard;