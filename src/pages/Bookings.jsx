import { useRouteLoaderData } from "react-router-dom";
import BookingCard from '../components/cards/BookingCard';
import { Stack, Typography } from "@mui/material";

function Bookings() {
    const { bookings } = useRouteLoaderData("account")
    return (
        <>
            <Typography variant="h3" gutterBottom>Bookings</Typography>
            <Stack gap={2}>
                {bookings.map(data => <BookingCard {...data} />)}
            </Stack>
            
        </>


    );
}

export default Bookings;