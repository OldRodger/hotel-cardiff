import { ChevronRight, Favorite, FavoriteBorder, LocationOn } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Link, defer, useFetcher, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from './HotelDetails.module.css';
import Rating from "../components/Rating";
import Room from "../components/Room";
import Amenities from "../components/Amenities";
import Reviews from "../components/Reviews";
import { fireBaseInstance } from "../utils/axios-config";
import { getFavourites } from "../utils/helper";
import { useState } from "react";

function HotelDetails() {
    const { hotelData } = useRouteLoaderData('hotel-detail');
    const {authToken} = useRouteLoaderData('root');
    const hotelImage = hotelData.images.hero;
    const hotelRoomsEntries = Object.entries(hotelData.rooms).sort((arr1, arr2) => arr1[1] - arr2[1]);
    const amenities = Object.values(hotelData.amenities);
    const [isFavourite, setIsFavourite] = useState(hotelData?.isFav ?? false);
    const fetcher = useFetcher()
    const toggleFavourite = () => {
        const key = hotelData.name.split(" ").join("");
        setIsFavourite(prev => {
            const newValue = !prev;
            if (newValue) {
                fetcher.submit({ key }, { method: 'post', action: "/add-favourite" })
            } else {
                fetcher.submit({ key }, { method: 'post', action: "/remove-favourite" })
            }
            return newValue;
        })

    }



    return (
        <>
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

                <Box className={classes.details}>
                    <Box className={classes["details__left"]}>
                        <Stack direction="row" gap={2} alignItems="center" marginBottom={1.5}>
                            <Typography variant="h4" fontWeight={700}>{hotelData.name}</Typography>
                            <Stack direction="row" alignItems="center" gap={1.5}>
                                <div>
                                    <Rating fontSize="small" rating={hotelData.rating} />
                                </div>
                                <Typography variant="body1">{hotelData.rating} Star Hotel</Typography>
                            </Stack>

                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <LocationOn color="action" sx={{ fontSize: "17px" }} />
                            <Typography variant="body2" color="GrayText" >{hotelData.location}</Typography>
                        </Stack>
                    </Box>
                    <Box className={classes["details__right"]}>
                        <Typography variant="h4" gutterBottom sx={{ color: orange[700], fontWeight: 700 }}>
                            &pound;{hotelData.rooms.single || hotelData.rooms.double}
                            <Typography component="span" variant="h6" color="warning">/night</Typography>
                        </Typography>

                       {authToken && <Button
                            onClick={toggleFavourite}
                            variant={isFavourite ? "contained" : "outlined"}
                            color={isFavourite ? "warning" : "dark"}
                            data-type={isFavourite && "stagnant"}
                            sx={{ height: 50 }}>
                            {isFavourite ? <Favorite /> : <FavoriteBorder />}
                        </Button>}

                    </Box>
                </Box>

                <Box className={classes.gallery}>
                    <div className={`${classes["gallery__item"]} ${classes["gallery__item--big"]}`}>
                        <img src={hotelData.images.gallery[0]} alt="gallery_img" />
                    </div>
                    {
                        hotelData.images.gallery.slice(1, 5).map((_, idx) => (
                            <div key={idx} className={`${classes["gallery__item"]} ${classes["gallery__item--small"]}`}>
                                <img src={hotelData.images.gallery[idx + 1]} alt="gallery_img" />
                            </div>
                        ))
                    }

                </Box>

                <Divider />

                <Stack gap={4}>
                    <Typography variant="h5" fontWeight={700}>Overview</Typography>
                    <Typography variant="body1" color="GrayText" fontWeight={600}>
                       {hotelData.description}
                    </Typography>
                </Stack>

                <Divider />

                <Stack gap={4}>
                    <Typography variant="h5" fontWeight={700}>Available Rooms</Typography>
                    <ul className={classes.rooms}>
                        {
                            hotelRoomsEntries.map(([name, price]) => <Room
                                key={name}
                                name={name}
                                image={hotelImage}
                                price={price}
                            />)
                        }
                    </ul>
                </Stack>

                <Divider />

                <Stack gap={4}>
                    <Typography variant="h5" fontWeight={700}>Amenities</Typography>
                    <Amenities amenities={amenities} />
                </Stack>

                <Divider />

                <Stack gap={4}>
                    <Reviews />
                </Stack>
            </Stack>

        </>
    );
}

export default HotelDetails;

async function loadHotelData(hotelID) {
    try {
        const { data } = await fireBaseInstance.get(`hotels/${hotelID}.json`);
        const favourite = await getFavourites();
        if (favourite.includes(data.id)) {
            data.isFav = true;
        }
        return data;
    } catch (error) {
        throw json({ message: "can't load hotel data" }, { status: 500 })
    }
}

async function loadHotelReviews(hotelID) {
    try {
        const { data } = await fireBaseInstance.get(`reviews/${hotelID}.json`);
        return data;
    } catch (error) {
        throw json({ message: "can't load reviews" }, { status: 500 })
    }
}

async function loadRecentSearch() {
    try {
        const { data } = await fireBaseInstance(`search.json`);
        return data;
    } catch (error) {
        throw json({ message: "can't load reviews" }, { status: 500 })
    }
}

export async function loader({ params }) {
    const id = params.hotelID;
    return defer({
        hotelData: await loadHotelData(id),
        hotelReviews: await loadHotelReviews(id),
        searchData: await loadRecentSearch()
    })

}