import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashBoardLayout from "../Layout/DashBoardLayout";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome/DashBoardHome";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import BioData from "../Pages/BioData/BioData/BioData";
import BioDataDetails from "../Pages/BioData/BioDataDetails/BioDataDetails";
import EditBioData from "../Pages/DashBoard/EditBioData/EditBioData";
import ViewBio from "../Pages/DashBoard/ViewBio/ViewBio";
import ContactRequest from "../Pages/DashBoard/ContactRequest/ContactRequest";
import FavoriteBio from "../Pages/DashBoard/FavoriteBio/FavoriteBio";
import CreateStory from "../Pages/DashBoard/CreateStory/CreateStory";
import SuccessStoryDetails from "../Pages/Home/SuccessStory/SuccessStoryDetails";
import Payment from "../Pages/BioData/Payment/Payment";
import AdminDashBoard from "../Pages/DashBoard/AdminDashBoard/AdminDashBoard/AdminDashBoard";
import ApproveContact from "../Pages/DashBoard/AdminDashBoard/ApproveContact/ApproveContact";
import ApprovePremium from "../Pages/DashBoard/AdminDashBoard/ApprovePremium/ApprovePremium";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "/successReview/:id",
          element: <SuccessStoryDetails></SuccessStoryDetails>,
          loader: ({ params }) => fetch(`http://localhost:3000/successReview/${params.id}`)
        },
        {
          path: "/bioData",
          element: <BioData></BioData>,
          loader: (() => fetch('http://localhost:3000/bioDataCount'))
        },
        {
          path: "/bioData/:id",
          element: <BioDataDetails></BioDataDetails>,
          loader: ({ params }) => fetch(`http://localhost:3000/bioData/${params.id}`)
        },
        {
          path: "payment/:id",
          element: <Payment></Payment>
        },
        {
          path: "/aboutUs",
          element: <AboutUs></AboutUs>
        },
        {
          path:"/contactUs",
          element: <ContactUs></ContactUs>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        }
    ]
  },
  {
    path: "dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        index: true,
        element: <DashBoardHome></DashBoardHome>
      },
      {
        path: "editBio",
        element: <EditBioData></EditBioData>
      },
      {
        path: "viewBio",
        element: <ViewBio></ViewBio>
      },
      {
        path: "contact-request",
        element: <ContactRequest></ContactRequest>
      },
      {
        path: "favoriteBio",
        element: <FavoriteBio></FavoriteBio>
      },
      {
        path: "createStory",
        element: <CreateStory></CreateStory>
      },

      // admin route
      {
        path: "adminDashboard",
        element: <AdminDashBoard></AdminDashBoard>
      },
      {
        path: "approvePremium",
        element: <ApprovePremium></ApprovePremium>
      },
      {
        path: "approvedContact",
        element: <ApproveContact></ApproveContact>
      }
    ]
  },
]);

