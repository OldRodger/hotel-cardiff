import { Favorite } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import SearchHotelCard from "../components/cards/SearchHotelCard";

function FavouritesPage() {
    const loaderData = useLoaderData();
    let favourites = Object.values(loaderData).filter(hotel => hotel?.isFav === true).map(data => <SearchHotelCard
        key={data.id}
        id={data.id}
        title={data.name}
        city={data.city}
        hero={data.images.hero}
        location={data.location}
        rating={data.rating}
        isFav={data.isFav}
        basePrice={data.rooms.single || data.rooms.double}
    />)

    if (!favourites.length) {
        favourites = <Typography
            variant="h5"
            align="center"
            sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                gap: 2
            }}>
            No favourites yet
            <Favorite />
        </Typography>



    }


    return (
        <Stack component="section" className="section" gap={6}>
            <Typography variant="h4">Favourites</Typography>
            <Stack>
                {favourites}
            </Stack>
        </Stack>
    );
}

export default FavouritesPage;

