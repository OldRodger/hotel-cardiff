import { ThemeProvider } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import theme from "./utils/theme";
import AuthenticationPage, { action as authAction } from "./pages/AuthenticationPage";
import AuthHomePage from "./pages/AuthHomePage";
import { action as searchAction } from './components/SearchFormHome';
import BookingPage,
{
  loader as bookingPageLoader,
  action as bookingAction
}
  from './pages/BookingPage';
import SearchPage, {
  loader as searchPageLoader,
  action as searchPageAction,
  loader
} from "./pages/SearchPage";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import HotelDetails, { loader as hotelDetailsLoader } from "./pages/HotelDetails";
import { action as makeReviewAction } from "./components/ReviewForm";
import { authLoader, getAuthToken } from "./utils/auth";
import { logoutAction } from "./pages/Logout";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import { addCardAction, addFavouriteAction, removeCardAction, removeFavouriteAction } from "./utils/helper";
import TicketPage, { loader as ticketLoader } from "./pages/TicketPage";
import AccountRoot, { loader as accountLoader } from "./pages/AccountRoot";
import AccountPage, { action as accountUpdateAction } from "./pages/AccountPage";
import Bookings from "./pages/Bookings";
import PaymentMethod from "./pages/PaymentMethod";
import FavouritesPage from "./pages/FavouritesPage";
import NotFound from "./pages/NotFound";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: authLoader,
      id: 'root',
      children: [
        { index: true, action: searchAction, element: <LandingPage /> },
        {
          path: "hotels",
          action: searchPageAction,
          children: [
            { index: true, loader: searchPageLoader, element: <SearchPage /> },
            {
              path: ":hotelID",
              loader: hotelDetailsLoader,
              id: 'hotel-detail',
              children: [
                { index: true, element: <HotelDetails />, action: makeReviewAction },
                { path: 'book', loader: bookingPageLoader, action: bookingAction, element: <BookingPage /> }
              ]
            }
          ]
        },
        {
          path: 'account',
          id: 'account',
          loader: accountLoader,
          element: <AccountRoot />,
          children: [
            { index: true, element: <AccountPage />, action: accountUpdateAction },
            { path: 'bookings', element: <Bookings /> },
            { path: 'cards', element: <PaymentMethod /> }
          ]
        },
        { path: 'tickets/:ticketNumber', loader: ticketLoader, element: <TicketPage /> },
        { path: 'favourites', loader: searchPageLoader, element: <FavouritesPage /> },
        { path: 'logout', action: logoutAction },
        { path: 'add-card', action: addCardAction },
        { path: 'remove-card', action: removeCardAction },
        { path: 'add-favourite', action: addFavouriteAction },
        { path: 'remove-favourite', action: removeFavouriteAction },
        { path: '*', element: <NotFound />},
      ]
    },
    { path: '/auth', action: authAction, element: <AuthenticationPage /> },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  )
}

export default App
