import { Box, Container, Divider, Slider, Stack, Typography } from "@mui/material";
import SearchForm from "../components/SearchForm";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import classes from './SearchPage.module.css';
import { useState } from "react";
import SearchHotelCard from "../components/cards/SearchHotelCard";
import Footer from '../components/Footer';
import { json, redirect, useLoaderData, useSearchParams } from "react-router-dom";
import { fireBaseInstance } from "../utils/axios-config";
import { getFavourites } from "../utils/helper";

function SearchPage() {
    const [value, setValue] = useState([50, 1200]);
    const loaderData = useLoaderData();
    const [searchParam] = useSearchParams();
    let hotelData = Object.values(loaderData);

    if (searchParam.get('destination')) {
        hotelData = hotelData
            .filter(hotel => hotel.city === searchParam.get('destination').toLowerCase())
            .filter(hotel => Object.keys(hotel.rooms).includes(searchParam.get('roomType')))

    }





    const hotelCards = hotelData.map(data => <SearchHotelCard
        key={data.id}
        id={data.id}
        title={data.name}
        city={data.city}
        hero={data.images.hero}
        location={data.location}
        rating={data.rating}
        isFav={data?.isFav ?? false}
        basePrice={data.rooms.single || data.rooms.double}
    />)



    const marks = [
        { label: "\u00A350", value: 50 },
        { label: "\u00A31200", value: 1200 },
    ]

    function valuetext(value) {
        return `${value}°C`;
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Stack component="section" className="section" gap={6}>
            <SearchForm />
            <Box className={classes.container}>
                <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>Filters</Typography>
                    <Stack className={classes.box} >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={3}>
                            <Typography variant="h6">Price</Typography>
                            <ExpandMore size="large" />
                        </Stack>
                        <Box sx={{ width: '95%', m: 'auto' }}>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                step={50}
                                min={50}
                                max={1200}
                                marks={marks}
                            />
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack className={classes.box}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={3}>
                            <Typography variant="h6">Rating</Typography>
                            <ExpandMore size="large" />
                        </Stack>
                        <Box>

                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Typography variant="h5">Hotels</Typography>
                    <Typography variant="subtitle2" color="text.secondary" marginBottom={2}>{hotelData.length} places</Typography>
                    <Stack>
                        <Typography variant="subtitle1" gutterBottom marginBottom={4}>Showing {hotelData.length} of {hotelData.length}</Typography>
                        <Box >
                            {hotelCards}
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Stack>

    );
}

export default SearchPage;

export async function loader() {
    try {
        const { data } = await fireBaseInstance('/hotels.json');
        const favourite = await getFavourites();
        for (const hotelKey of favourite) {
            data[hotelKey].isFav = true
        }
        return data;
    } catch (err) {
        throw json(
            { message: 'Could not load data.' },
            { status: 500 }
        )
    }

}

export async function action({ request }) {
    const formData = await request.formData();
    let bookingSearchString = '';
    const bookingSearch = {};
    for (const [key, val] of formData.entries()) {
        bookingSearchString += `${key}=${val}&`
        bookingSearch[key] = val;
    }

    try {
        await fireBaseInstance.post("/search.json", bookingSearch)
    } catch (error) {
        throw json({ message: "couldn't make search" }, { status: 500 })
    }



    return redirect("/hotels?" + bookingSearchString)
}