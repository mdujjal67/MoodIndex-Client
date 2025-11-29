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
import EducationAwareness from '../pages/EducationAwareness/EducationAwareness';
import BlogDetail from '../pages/Blogs/BlogDetails';
import MissionVisionPage from '../pages/MissionVision/MissionVision';
import AboutProjectPage from '../pages/AboutTheProject/AboutProject';

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
      },

      {
        path: "/blog/:id",
        Component: BlogDetail,
        loader: async ({ params }) => {
          const blogs = await fetch("/Json files/blogs.json").then(res => res.json());
          const blog = blogs.find(b => b.id.toString() === params.id);
          if (!blog) throw new Response("Not Found", { status: 404 });
          return blog;
        }
      },

      {
        path: '/education-awareness',
        Component: EducationAwareness,
        loader: async () => {
          const edu = await fetch('/Json files/EducationAwareness.json').then(res => res.json());
          return edu;
        }
      },

      {
        path: '/team-members',
        Component: Team,
      },

      {
        path: '/faqs',
        Component: Faq,
      },

      {
        path: '/mission-vision',
        Component: MissionVisionPage,
      },

      {
        path: '/about-project',
        Component: AboutProjectPage,
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