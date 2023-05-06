import { useFetcher, useSearchParams } from "react-router-dom";
import classes from './SearchForm.module.css';
import Card from "../ui/Card";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { BedOutlined, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import moment from "moment/moment";

function SearchForm() {
    const fetcher = useFetcher();
    const [searchParams] = useSearchParams();
    const destination = searchParams?.get('destination');
    const checkIn = searchParams?.get('checkIn');
    const checkOut = searchParams?.get('checkOut');
    const roomType = searchParams?.get('roomType');

    const today = new Date();
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)


    const [formData, setFormData] = useState({
        destination: destination ?? 'cardiff',
        checkIn: checkIn ?? today.toLocaleDateString('en-CA'),
        checkOut: checkOut ?? tomorrow.toLocaleDateString('en-CA'),
        roomType: roomType ?? 'single'
    })


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        fetcher.submit(formData, { action: '/hotels', method: 'post' });
    }, [formData])








    return (
        <Card className={classes.searchForm}>
            <fetcher.Form method="post" action="/hotels">
                <Stack direction="row" gap={2} marginBottom={4}>
                    <TextField required onChange={handleChange} value={formData.destination} label="Enter Destination" name="destination" sx={{ flex: 2 }} InputProps={{
                        endAdornment: <BedOutlined fontSize="small" />
                    }} />
                    <TextField required onChange={handleChange} value={formData.checkIn} label="Check In" name="checkIn" type="date" InputLabelProps={{
                        shrink: true,
                    }} inputProps={{
                        min: today.toLocaleDateString('en-CA')
                    }} />
                    <TextField required onChange={handleChange} value={formData.checkOut} label="Check Out" name="checkOut" type="date" InputLabelProps={{
                        shrink: true,
                    }} inputProps={{
                        min: formData.checkIn
                    }} />
                    <FormControl required sx={{ flex: 1 }}>
                        <InputLabel id="room-type-label">Rooms</InputLabel>
                        <Select name="roomType" labelId="room-type-label" label="Rooms" onChange={handleChange} value={formData.roomType}>
                            <MenuItem value="single">Single Room</MenuItem>
                            <MenuItem value="twin">Twin Room</MenuItem>
                            <MenuItem value="double">Double Room</MenuItem>
                            <MenuItem value="queen">Queen Room</MenuItem>
                            <MenuItem value="superiorDouble">Superior Double Room</MenuItem>
                            <MenuItem value="superiorQueen">Superior Queen Room</MenuItem>
                            <MenuItem value="deluxe">Deluxe Room</MenuItem>
                            <MenuItem value="studio">Studio Room</MenuItem>
                            <MenuItem value="family">Family Room</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" data-type="stagnant" variant="contained">
                        <Search fontSize="large" />
                    </Button>
                </Stack>
            </fetcher.Form>
        </Card>
    );
}

export default SearchForm;