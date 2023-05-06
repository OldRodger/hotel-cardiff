import { BedOutlined, Domain, PersonOutlined, PlusOne } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Form, redirect } from "react-router-dom";
import Card from '../ui/Card'
import { fireBaseInstance } from "../utils/axios-config";
import { useState } from "react";

function SearchFormHome() {
    const [checkIn, setCheckIn] = useState('');
    const handleChange = (e) => {
        setCheckIn(e.target.value)
    }

    return (
        <Card className="searchFormHome" sx={{ p: 5, borderRadius: 6 }}>
            <Typography variant="h5" marginBottom={3} fontWeight={600} color="CaptionText">Where are you?</Typography>
            <Form method="post">
                <Stack direction="row" gap={2} marginBottom={4}>
                    <TextField required label="Enter Destination" name="destination" sx={{ flex: 2 }} InputProps={{
                        endAdornment: <BedOutlined fontSize="small" />
                    }} />
                    <TextField required label="Check In" name="checkIn" type="date" InputLabelProps={{
                        shrink: true,
                    }} inputProps={{
                        min: new Date().toLocaleDateString('en-CA'),
                        value: checkIn,
                        onChange: handleChange
                    }} />
                    <TextField required label="Check Out" name="checkOut" type="date" InputLabelProps={{
                        shrink: true,
                    }} inputProps={{
                        min: checkIn || new Date().toLocaleDateString('en-CA'),
                    }} />
                    <FormControl required sx={{ flex: 1 }}>
                        <InputLabel id="room-type-label">Rooms</InputLabel>
                        <Select name="roomType" labelId="room-type-label" label="Rooms" defaultValue="single">
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
                </Stack>
                <Stack direction="row" justifyContent="flex-end" gap={1}>
                    <Button type="submit" data-type="stagnant" variant="contained" size="medium" startIcon={<Domain />}>show places</Button>
                </Stack>

            </Form>
        </Card>
    );
}

export default SearchFormHome;

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