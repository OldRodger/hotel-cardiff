import { Link, json, redirect, useFetcher, useLoaderData, useRouteLoaderData, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import { orange } from "@mui/material/colors";
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { Add, Apartment, ChevronRight, Favorite, LocationOn, Lock, Payment, Payments, Try } from "@mui/icons-material";
import Card from "../ui/Card";
import classes from './BookingPage.module.css';
import testImg from '../assets/images/hero-1.jpg';
import { REVIEW_REMARKS, formatDate, generateTicketID, generateTicketNumber } from "../utils/helper";
import { useSelector } from "react-redux";
import { getCard, getUser } from "../utils/auth";
import { useEffect, useState } from "react";
import Modal from "../layouts/Modal";
import SmartCardForm from "../components/SmartCardForm";
import { fireBaseInstance } from "../utils/axios-config";

function BookingPage() {
    const { hotelData, hotelReviews, searchData } = useRouteLoaderData('hotel-detail');

    const { authToken: isAuthenticated } = useRouteLoaderData('root');
    const fetcher = useFetcher();
    const loaderData = useLoaderData();
    const [searchParam] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    const [card, setCard] = useState('');
    const roomName = searchParam.get('room') || 'single';
    const [recentSearch] = Object.values(searchData).reverse();
    const booking = useSelector(store => store.bookingSlice)
    const dayDiff = (new Date(recentSearch.checkOut).getDate() + 1) - new Date(recentSearch.checkIn).getDate();
    const price = (hotelData.rooms[roomName] * dayDiff) + booking.tax + booking.service - booking.discount;

    const bookingData = {
        logo: hotelData?.logo,
        country: hotelData.country,
        city: hotelData.city,
        location: hotelData.location,
        name: hotelData.name,
        checkInDate: recentSearch.checkIn,
        checkOutDate: recentSearch.checkOut,
        checkInTime: '12:00am',
        checkOutTime: '11:59pm',
        room: roomName,
        roomNumber: 'On arrival',
        price,

    }

    const hiddenInputs = Object.keys(bookingData).map(key => <input
        key={key}
        name={key}
        value={bookingData[key]}
        type="hidden"
    />)



    let cards = <Typography variant="body2" fontWeight={600} color={"GrayText"}>No payment card</Typography>

    if (loaderData) {
        cards = loaderData.map((card, idx) => {
            const [lastDigits] = card.card_number.split('-').reverse();
            return <FormControlLabel
                className={classes.paymentCard}
                key={idx}
                value={`${card.card_number}`}
                control={<Radio required />}
                label={`****${lastDigits} ${card.expiry_date}`} />

        })
    }

    useEffect(() => {
        if (fetcher.data) {
            console.log("open modal");
            setShowModal(true);
        }

    }, [fetcher.data])



    let reviews = {
        rating: 0,
        remark: {
            text: 'No reviews',
            color: 'dark'
        },
        count: 0
    }


    if (hotelReviews) {
        const data = Object.values(hotelReviews);
        reviews.count = data.length;

        const accumulativeReview = data.map(review => review.rating).reduce((acc, val) => acc + val);
        const totalReviewRate = (accumulativeReview * 5) / (data.length * 5)
        reviews.rating = totalReviewRate;
        const reviewRemark = REVIEW_REMARKS[Math.floor(totalReviewRate)];
        reviews.remark = reviewRemark;


    }

    if (!hotelData.rooms[roomName]) {
        throw json({ message: 'room does not exist' }, { status: 500 })
    }




    return (
        <>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <SmartCardForm closeForm={() => setShowModal(false)} />
            </Modal>}

            <fetcher.Form method="post">
                {hiddenInputs}
                <Stack component="section" className="section" gap={5} >
                    <Stack direction="row" gap={1.5} alignItems={"center"}>
                        <Link to="..">
                            <Typography variant="body1" color={orange[700]} fontWeight={600}>{hotelData.country}</Typography>
                        </Link>
                        <ChevronRight />
                        <Link to="..">
                            <Typography variant="body1" color={orange[700]} fontWeight={600}>{hotelData.city}</Typography>
                        </Link>
                        <ChevronRight />
                        <Typography variant="body1" fontWeight={600}>{hotelData.name}</Typography>
                    </Stack>
                    <Box className={classes.layout}>
                        <Stack className={classes['layout__first']} gap={3}>
                            <Card className={classes.card}>
                                <Stack gap={3}>
                                    <Stack direction="row" justifyContent={"space-between"}>
                                        <Typography variant="h4" fontWeight={700} textTransform={"capitalize"}>{roomName} room</Typography>

                                        <Typography variant="h4" gutterBottom sx={{ color: orange[700], fontWeight: 700 }}>
                                            &pound;{hotelData.rooms[roomName]}
                                            <Typography component="span" variant="h6" color="warning">/night</Typography>
                                        </Typography>
                                    </Stack>

                                    <Stack border={1} borderColor="var(--color-primary)" sx={{ borderRadius: 3, p: 1.5 }}>
                                        <Typography variant="body1" fontWeight={700}>{hotelData.name}</Typography>
                                        <Stack direction="row" alignItems="center">
                                            <LocationOn color="action" sx={{ fontSize: "17px" }} />
                                            <Typography variant="body2" color="GrayText" >{hotelData.location}</Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>{formatDate(recentSearch.checkIn)}</Typography>
                                            <Typography variant="subtitle1" color="GrayText">Check-in</Typography>
                                        </Box>
                                        <Apartment sx={{ width: 50, height: 50 }} />
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>{formatDate(recentSearch.checkOut)}</Typography>
                                            <Typography variant="subtitle1" color="GrayText">Check-out</Typography>
                                        </Box>
                                    </Stack>


                                </Stack>
                            </Card>
                            {
                                isAuthenticated &&
                                <Card className={classes.card}>
                                    <Stack gap={4}>
                                        <FormControl>
                                            <FormLabel id="user-cards">Cards</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="user-cards"
                                                name="cards"
                                                value={card}
                                                onChange={(e) => setCard(e.target.value)}
                                            >
                                                {cards}

                                            </RadioGroup>
                                        </FormControl>
                                        <Box onClick={() => setShowModal(true)}
                                            p={2} sx={{
                                                height: 100,
                                                border: `2px dashed #1d6d64`,
                                                borderRadius: 3,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer'
                                            }}>
                                            <Typography color='#1d6d64' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Add /> Add Card</Typography>
                                        </Box>
                                    </Stack>
                                </Card>
                            }
                        </Stack>

                        <Card className={`${classes.card} ${classes.details}`}>
                            <Box className={classes['details__top']} marginBottom={2}>
                                <Box className={classes['details__img-box']} marginBottom={2}>
                                    <img src={hotelData.images.hero} alt="hotel_img" />
                                </Box>
                                <Box className={classes['details__hotel-detail']}>
                                    <Typography variant="h6" color={"GrayText"} noWrap>{hotelData.name}</Typography>
                                    <Typography textTransform={"capitalize"} variant="h5" fontWeight={700} gutterBottom>{roomName} room</Typography>
                                    <Box className={classes['details__review-box']}>
                                        <Typography variant="body2" className={classes['details__review']} sx={{ color: reviews.remark.color }}>{reviews.rating.toFixed(1)}</Typography>
                                        <Typography variant="body2" fontWeight={700}>{reviews.remark.text}</Typography>
                                        <Typography variant="body2">{reviews.count} review(s)</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider />
                            <Typography variant="h6" my={1} fontSize={17}>
                                Your booking is protected by <span style={{ fontWeight: 900 }}>Cardiff</span>
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Stack gap={1}>
                                <Typography variant="h6">Price Details</Typography>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Base Fee</Typography>
                                    <Typography variant="subtitle1" fontWeight={700}>&pound;{hotelData.rooms[roomName]}</Typography>
                                </Stack>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Days</Typography>
                                    <Typography variant="subtitle1" fontWeight={700}>{dayDiff}</Typography>
                                </Stack>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Discount</Typography>
                                    <Typography variant="subtitle1" fontWeight={700}>&pound;{booking.discount}</Typography>
                                </Stack>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Taxes</Typography>
                                    <Typography variant="subtitle1" fontWeight={700}>&pound;{booking.tax}</Typography>
                                </Stack>
                                <Stack direction={"row"} justifyContent={"space-between"} marginBottom={2}>
                                    <Typography variant="subtitle1">Service Fee</Typography>
                                    <Typography variant="subtitle1" fontWeight={700}>&pound;{booking.service}</Typography>
                                </Stack>
                                <Stack direction={"row"} justifyContent={"space-between"} marginBottom={2}>
                                    <Typography variant="subtitle1">Total</Typography>
                                    <Typography variant="subtitle1" fontWeight={700}>&pound;{price}</Typography>
                                </Stack>
                                <Button
                                    data-type="stagnant"
                                    disabled={!isAuthenticated}
                                    variant="contained"
                                    sx={{ height: 50, cursor: isAuthenticated ? 'pointer' : 'not-allowed' }}
                                    endIcon={isAuthenticated ? <Payments /> : <Lock />}
                                    type="submit">
                                    {isAuthenticated ? 'Book' : 'Login to book'}
                                </Button>
                            </Stack>
                        </Card>

                    </Box>
                </Stack>
            </fetcher.Form>

        </>
    );

}

export default BookingPage;

export async function loader() {
    const fetchedCards = await getCard();
    if (!fetchedCards) return null;
    const cards = Object.values(fetchedCards);
    return cards;
}

export async function action({ request }) {
    const formData = await request.formData();
    const isCard = formData?.get('cards') || null;
    if (!isCard) return { message: 'No card found' };

    const payLoad = {};
    for (const [key, val] of formData.entries()) {
        payLoad[key] = val;
    }


    const ticketID = generateTicketID()
    const ticketNumber = generateTicketNumber();

    payLoad.ticketID = ticketID;
    payLoad.ticketNumber = ticketNumber;


    try {
        await fireBaseInstance.post(`bookings/${getUser()}/${ticketNumber}.json`, payLoad);
        return redirect(`/tickets/${ticketNumber}`)

    } catch (err) {
        throw json({ message: 'couldn\'t book hotel' }, { status: 500 })
    }


}
