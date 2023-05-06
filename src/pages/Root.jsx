import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigaion from "../components/MainNavigation";
import AuthNavigation from "../components/AuthNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";
import Footer from "../components/Footer";

function Root() {
    const { authToken: token } = useLoaderData();
    const submit = useSubmit();



    useEffect(() => {
        if (!token) return;
        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' })
            return;
        }

        const remainingDuration = getTokenDuration();
        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' })
        }, remainingDuration)
    }, [token, submit])


    return (
        <>
            {token ? <AuthNavigation /> : <MainNavigaion />}
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}

export default Root;
