import { useEffect } from "react";
import { useLoaderData, useRouteError, useSubmit } from "react-router-dom";
import AuthNavigation from "../components/AuthNavigation";
import MainNavigaion from "../components/MainNavigation";
import { Typography } from "@mui/material";
import { getAuthToken } from "../utils/auth";
import Footer from "../components/Footer";

function ErrorPage() {
    const token = getAuthToken();
    const submit = useSubmit();
    const error = useRouteError();
    console.log(error);
    // if (!token || token === 'EXPIRED') {
    //     submit(null, { action: '/logout', method: 'post' })
    //     return;
    // }

    return (
        <>
            {token ? <AuthNavigation /> : <MainNavigaion />}
            <main>
                <Typography variant="h3" p={4} textAlign={'center'}>Oops something happened</Typography>
                <Typography variant="h3" p={4} textAlign={'center'}>{error.data.message}</Typography>
            </main>
            <Footer />
        </>
    );
}

export default ErrorPage;