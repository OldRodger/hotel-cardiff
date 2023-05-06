import { Outlet, defer, json, useRouteLoaderData } from "react-router-dom";
import AccountBanner from "../components/AccountBanner";
import { Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import AccountNav from "../components/AccountNav";
import { fireBaseInstance } from "../utils/axios-config";
import { getUser } from "../utils/auth";

function AccountRoot() {
    const { user: userData } = useRouteLoaderData('root');

    return (
        <>
            <Stack component="section" className="section__small">
                <Stack gap={10} mb={10}>
                    <AccountBanner hero={userData.background_photo} profile={userData.profile_photo} />
                    <Stack textAlign={"center"} gap={1}>
                        <Typography variant="h5" textTransform={"capitalize"}>
                            {`${userData.first_name} ${userData.last_name}.`}
                        </Typography>
                        <Typography variant="subtitle1" textTransform={"capitalize"} gutterBottom marginBottom={4}>
                            {userData.email}
                        </Typography>
                        <AccountNav />
                    </Stack>
                </Stack>
                <Outlet />
            </Stack>
        </>
    );
}

export default AccountRoot;

async function getCards() {
    const username = getUser();
    const { data } = await fireBaseInstance(`cards/${username}.json`)
    if (!data) return []
    return Object.values(data)
}

async function getBookings() {
    try {
        const username = getUser();
        const { data } = await fireBaseInstance(`bookings/${username}.json`)
        if (!data) return [];
        return Object.values(data).map(arr => Object.values(arr)).flat()
    } catch (err) {
        throw err
    }
}

export async function loader() {
    return defer({
        bookings: await getBookings(),
        cards: await getCards()
    })
}