import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/root';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from '../pages/Home/Home';
import Faq from '../pages/Faqs/Faq';
import Contact from '../pages/Contact/Contact'
import HelpCenter from '../pages/Contact/HelpCenter';
import Team from '../pages/Team/Team'
import Blogs from '../pages/Blogs/Blogs';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        // loader:()=>fetch('../../public/Json files/blogs.json'),     for importing single json data file----------
        path: "/",
        loader: async () => {
          const blogs = await fetch('/Json files/blogs.json').then(res => res.json());
          const edu = await fetch('/Json files/EducationAwareness.json').then(res => res.json());

          return { blogs, edu };
        },
        Component: Home,
      },
      {
        path: '/blogs',
        Component: Blogs,
        loader: async () => {
          const blogs = await fetch('/Json files/blogs.json').then(res => res.json());
          return blogs;
        }
      }
      ,
      {
        path: '/team-members',
        Component: Team,
      },
      {
        path: '/faqs',
        Component: Faq,
      },
      {
        path: '/contact-support',
        Component: Contact,
      },
      {
        path: '/help-center',
        Component: HelpCenter,
      },
    ]
  },
]);