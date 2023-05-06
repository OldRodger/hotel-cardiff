import { Apartment, ChevronRight, LocationOn, PropaneSharp, SensorDoor, WatchLater } from "@mui/icons-material";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { Link, json, useLoaderData } from "react-router-dom";
import { fireBaseInstance } from "../utils/axios-config";
import { getUser } from "../utils/auth";
import classes from './TicketPage.module.css';
import { grey, orange } from "@mui/material/colors";
import { formatDate } from "../utils/helper";
import { useSelector } from "react-redux";
import TimeBox from "../components/TimeBox";
import Footer from "../components/Footer";

function TicketPage() {
    const loaderData = useLoaderData();
    console.log(loaderData.profile_photo);
    return (
        <Stack component="section" className="section__small" gap={5} >
            <Stack direction="row" gap={1.5} alignItems={"center"}>
                <Typography variant="body1" fontWeight={600}>{loaderData.country}</Typography>
                <ChevronRight />
                <Typography variant="body1" fontWeight={600}>{loaderData.city}</Typography>
                <ChevronRight />
                <Typography variant="body1" color={'InactiveCaptionText'} fontWeight={600}>{loaderData.name}</Typography>
            </Stack>

            <Stack direction={"row"} justifyContent={"space-between"} marginBottom={4}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>{loaderData.name}</Typography>
                    <Stack direction="row" alignItems="center">
                        <LocationOn color="dark" sx={{ fontSize: 18 }} />
                        <Typography variant="subtitle2" fontWeight={700} color="GrayText">{loaderData.location}</Typography>
                    </Stack>
                </Box>
                <Typography variant="h4" fontWeight={700} color={orange[600]}>&pound;{loaderData.price}</Typography>
            </Stack>

            <Stack direction={'row'} gap={.5} marginBottom={5}>
                <Card sx={{ borderRadius: 4 }} className={classes.ticket}>
                    <Box className={classes['ticket__date']}>
                        <Stack>
                            <Typography variant="h4" fontWeight={700}>{formatDate(loaderData.checkInDate, true, true)}</Typography>
                            <Typography variant="subtitle2" color="InactiveCaptionText">Check-In</Typography>
                            <Apartment color="disabled" sx={{ my: 3, fontSize: 30 }} />
                            <Typography variant="h4" fontWeight={700}>{formatDate(loaderData.checkOutDate, true, true)}</Typography>
                            <Typography variant="subtitle2" color="InactiveCaptionText">Check-Out</Typography>
                        </Stack>
                    </Box>
                    <Box className={classes['ticket__details']}>
                        <Box className={classes['ticket__user-details']}>
                            {
                                loaderData.profile_photo ?
                                    <Avatar alt="profile photo" sx={{ width: 60, height: 60 }} src={loaderData.profile_photo} /> :
                                    <Avatar sx={{ bgcolor: '#1d6d64' }}>{loaderData.user[0].toUpperCase()}</Avatar>
                            }
                            <Typography variant="h5" textTransform={"capitalize"} fontWeight={700} mr={"auto"}>{loaderData.user}</Typography>
                            <Typography variant="h6" textTransform={"capitalize"}>{loaderData.room} room</Typography>

                        </Box>
                        <Stack p={3} direction={"row"} gap={2}>
                            <TimeBox title="Check-in-time" text={loaderData.checkInTime} icon={<WatchLater sx={{ color: "#8dd3bb" }} />} />
                            <TimeBox title="Check-out-time" text={loaderData.checkOutTime} icon={<WatchLater sx={{ color: "#8dd3bb" }} />} />
                            <TimeBox title="Room no." text={loaderData.roomNumber} icon={<SensorDoor sx={{ color: "#8dd3bb" }} />} />
                        </Stack>

                        <Box p={3} sx={{ position: 'absolute', bottom: 0, padding: 2 }}>
                            <Typography variant="h4" fontWeight={700} mr={"auto"}>{loaderData.ticketID}</Typography>
                            <Typography variant="body2" color={"GrayText"}>{loaderData.ticketNumber}</Typography>
                        </Box>
                    </Box>
                </Card>
                <Card sx={{ borderRadius: 4 }} className={classes['logo-box']}>
                    <img src={loaderData.logo} alt="logo" />
                </Card>
            </Stack>

            <Stack>
                <Typography variant="h4" marginBottom={3} gutterBottom>Terms and Conditions</Typography>
                <Typography variant="h5" gutterBottom>Payments</Typography>
                <ul >
                    <li>
                        <Typography variant="body1">
                            If you are purchacing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information. if we become aware of, or is notified of any fraud or illegal activity associated with the payment for the booking, the booking will be cancelled and you will be liable for all costs aand expenses arising from such cancellation without prejudice to any action that may be taken against us.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Cardiff may requir the card holder to provide additional payment verification upon request.Credit card details are held in a secured environment and transferred through an internationally accepted system.
                        </Typography>
                    </li>
                </ul>
            </Stack>
        </Stack>
    );
}

export default TicketPage;

export async function loader({ params }) {
    const { ticketNumber } = params;
    try {
        const { data } = await fireBaseInstance(`bookings/${getUser()}/${ticketNumber}.json`);
        const { data: userData } = await fireBaseInstance(`users/${getUser()}.json`)


        let [ticketData] = Object.values(data);
        ticketData = {
            ...ticketData,
            user: `${userData.first_name} ${userData.last_name}`,
            profile_photo: userData.profile_photo
        }
        return ticketData;
    } catch (error) {
        throw json({ message: 'Ticket Not Found' }, { status: 500 })
    }
}