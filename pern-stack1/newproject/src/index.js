import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Secondpage from './pages/secondpage';
import Contact from './pages/contact';
import Donaciones from './pages/donaciones';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/Secondpage",
        element: <Secondpage/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
      path: "/donaciones",
      element: <Donaciones/>,
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <RouterProvider router={router}/>
  
);


