import { Button, FormControl, Stack, TextField } from "@mui/material";
import Card from "../ui/Card";
import { Form, useRouteLoaderData } from "react-router-dom";
import React from "react";

function AccountForm() {
    const { user: userData } = useRouteLoaderData('root');
    const password = atob(userData.password);
    return (
        <Card>
            <Form method="post">
                <Stack px={3} py={4} gap={3}>
                    <TextField name="name" label="Name" defaultValue={`${userData.first_name} ${userData.last_name}`} required />
                    <input type="text" readOnly name="username" hidden defaultValue={userData.username} />
                    <TextField required name="email" label="Email" defaultValue={userData.email} />
                    <TextField required type="password" name="password" label="Password" defaultValue={password} />
                    <TextField name="address" label="Address" defaultValue={userData.address} />
                    <TextField type="date" name="dob" label="Date of birth" defaultValue={userData.dob ? new Date(userData.dob).toLocaleDateString('en-CA') : ''} InputLabelProps={{
                        shrink: true
                    }} />
                    <TextField name="profile_photo" label="Profile photo" defaultValue={userData.profile_photo} />
                    <TextField name="background_photo" label="Background photo" defaultValue={userData.background_photo} />
                    <Button
                        type="submit"
                        variant="contained"
                        data-type="stagnant"
                        sx={{ height: 60 }}>Update</Button>
                </Stack>
            </Form>
        </Card>
    );
}

export default React.memo(AccountForm);

