import { Box, Button, CardContent, Divider, Stack, Typography } from "@mui/material";
import Card from "../../ui/Card";
import { Favorite, FavoriteBorder, FavoriteOutlined, LocationOn } from "@mui/icons-material";
import classes from './SearchHotelCard.module.css';
import Rating from "../Rating";
import { orange } from "@mui/material/colors";
import { Link, useFetcher, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";

function SearchHotelCard(props) {
    const {authToken} = useRouteLoaderData('root');
    const [isFavourite, setIsFavourite] = useState(props.isFav);
    const fetcher = useFetcher()
    const toggleFavourite = () => {
        const key = props.title.split(" ").join("");
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
        <Card className={classes.searchHotel}>
            <Box className={classes.imgBox}>
                <img src={props.hero} alt="hotel_img" />
            </Box>
            <CardContent className={classes.content}>
                <Stack direction="row" justifyContent="space-between" marginBottom={2}>
                    <Box>
                        <Typography variant="h6">{props.title}</Typography>
                        <Typography variant="subtitle1">{props.city}</Typography>
                    </Box>
                    <Stack>
                        <Typography variant="body2" color="text.secondary">starting from</Typography>
                        <Typography variant="h5" sx={{ color: orange[700], fontWeight: 700 }}>
                            &pound;{props.basePrice}
                            <Typography component="span" variant="body1" color="warning">/night</Typography>
                        </Typography>
                        <Typography alignSelf="flex-end" variant="body2" color="text.secondary">excl. tax</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center">
                    <LocationOn color="action" sx={{ fontSize: "17px" }} />
                    <Typography variant="caption" color="GrayText" >{props.location}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1.5}>
                    <div>
                        <Rating fontSize="small" rating={props.rating} />
                    </div>
                    <Typography variant="body1">{props.rating} Star Hotel</Typography>
                </Stack>

                <Divider sx={{ mt: 2, mb: 4 }} />
                <Stack direction="row" gap={2} sx={{ height: 50 }}>
                    {authToken && <Button
                        data-type={isFavourite && 'stagnant'}
                        variant={isFavourite ? 'contained' : 'outlined'}
                        color={isFavourite ? "warning" : "dark"}
                        onClick={toggleFavourite}>
                        {isFavourite ? <Favorite color="white" /> : <FavoriteBorder />}
                    </Button>}
                    <Link to={`/hotels/${props.id}`} style={{ flex: 1, display: 'grid' }}>
                        <Button data-type="stagnant" variant="contained" >View place</Button>
                    </Link>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default SearchHotelCard;