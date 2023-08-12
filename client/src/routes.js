import AboutUs from "./page/AboutUs"
import Admin from "./page/Admin"
import Auth from "./page/Auth"
import Contacts from "./page/Contacts"
import MainPage from "./page/MainPage"
import Profile from "./page/Profile"
import TourPage from "./page/TourPage"
import ToursPage from "./page/ToursPage"
import { ABOUTUS_ROUTE, ADMIN_ROUTE, CONTACTS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, TOUR_ROUTE, TOURS_ROUTE, USER_ROUTE } from "./utils/consts"

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]
export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: Profile
    }
]
export const publicRoutes = [
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },

    {
        path: ABOUTUS_ROUTE,
        Component: AboutUs
    },

    {
        path: TOURS_ROUTE,
        Component: ToursPage
    },

    {
        path: TOUR_ROUTE + '/:id',
        Component: TourPage
    },

    {
        path: MAIN_ROUTE,
        Component: MainPage
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]