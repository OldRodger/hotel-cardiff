import Banner from "../components/Banner";
import heroImage from '../assets/images/hero-1.jpg'
import hotelImage from '../assets/images/hotel-img.jpg'
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import PageContent from "../components/PageContent";
import LittleCard from "../components/cards/LittleCard";
import { GridLayout } from "../layouts/layout";
import BackgroundCard from "../components/cards/BackgroundCard";
import { Domain } from "@mui/icons-material";
import ReviewCard from "../components/cards/ReviewCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const perfectTrips = [
    {
        image: 'https://media.istockphoto.com/id/164122964/photo/cardiff-bay-wales.jpg?s=612x612&w=0&k=20&c=cdO2CKfkz4oKMuuLzQ_sHOpXvJRzrq3H1fE0pCZGbgY=',
        city: 'Cardiff',
        country: 'Wales'
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/The_Old_Bridge%2C_Pontypridd.jpg",
        city: 'Pontypridd',
        country: 'Wales'
    },
    {
        image: 'https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner/public/live_banner/London-1.jpg',
        city: 'London',
        country: 'England'
    },
]

const REVIEWS = [
    {
        id: 'rev1',
        title: 'A real Sense of community nurtured',
        text: 'Really appreciate the help and support from the staff',
        rating: 4.5,
        name: 'Isaac'
    },
    {
        id: 'rev2',
        title: 'A real Sense of community nurtured',
        text: 'Really appreciate the help and support from the staff',
        rating: 3,
        name: 'Thomas'
    },
    {
        id: 'rev3',
        title: 'A real Sense of community nurtured',
        text: 'Really appreciate the help and support from the staff',
        rating: 3.5,
        name: 'Celestine'
    },

]

function UnauthorizedHomePage() {
    return (
        <>
            <Banner bgImage={heroImage}>
                <Stack gap={1} textAlign="center">
                    <Typography variant="h2">Helping Others</Typography>
                    <Typography variant="h1" fontWeight={700}>Live & Travel</Typography>
                    <Typography variant="h5">Special offers to suit your plan</Typography>
                </Stack>
            </Banner>

            <Stack gap={10} sx={{ paddingY: 10, maxWidth: '80%', mx: 'auto' }}>
                <PageContent
                    title="Plan your perfect trip"
                    subtitle="Search Cities & Book our popular hotels around you">
                    <GridLayout columns={3}>
                        {perfectTrips.map(props => <LittleCard key={props.city} {...props}>
                            <Typography variant="subtitle2">Hotels . Resorts</Typography>
                        </LittleCard>)}
                    </GridLayout>
                    <Stack paddingY={10}>
                        <GridLayout columns={2} rows={35} gap={3}>
                            <BackgroundCard bgImage={heroImage}>
                                <Stack gap={1} textAlign="center">
                                    <Typography variant="h3">Flights</Typography>
                                    <Typography variant="h6" fontWeight={100}>Coming soon...</Typography>
                                </Stack>
                            </BackgroundCard>
                            <BackgroundCard bgImage={hotelImage}>
                                <Box gap={1} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'

                                }}>
                                    <Typography variant="h3">Hotels</Typography>
                                    <Typography variant="h6" fontWeight={100}>
                                        Search Hotels & Place Hire to our most popular destinations
                                    </Typography>

                                    <Link to="/hotels">
                                        <Button
                                            size="large"
                                            variant="contained"
                                            startIcon={<Domain />}
                                            data-type="stagnant">
                                            show hotels
                                        </Button>
                                    </Link>
                                </Box>
                            </BackgroundCard>
                        </GridLayout>
                    </Stack>
                </PageContent>

                <PageContent
                    title="Reviews"
                    subtitle="What people say about Us">
                    <GridLayout columns={3}>
                        {REVIEWS.map(review => <ReviewCard
                            key={review.id} {...review}
                        />)}
                    </GridLayout>
                </PageContent>

            </Stack>

        </>
    );
}

export default UnauthorizedHomePage;