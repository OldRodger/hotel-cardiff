import { useRouteLoaderData } from "react-router-dom";
import AuthHomePage from "./AuthHomePage";
import HomePage from './HomePage';

function LandingPage() {
    const {authToken} = useRouteLoaderData('root');
    return authToken ? <AuthHomePage /> : <HomePage />;
}

export default LandingPage;