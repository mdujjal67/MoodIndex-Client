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
import EduAwarenessDetails from '../pages/EducationAwareness/EduAwarenessDetails';
import UnderDevelopment from '../pages/UnderDevelopment/UnderDevelopment';
import AllTests from '../pages/AssessmentPages/AllTests/AllTests';
import ResourcesPage from '../pages/Resources/ResourcesPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Register/SignUp';
import UserProfile from '../pages/UserProfile/UserProfile';
import PrivateRoutes from './PrivateRoutes';
import UniversalTest from '../pages/AssessmentPages/UniversalTestPage/UniversalTest';
import AssessmentHistory from '../pages/AssessmentHistoryPage/AssessmentHistory';
import Features from '../pages/Features/Features';
import Privacy from '../pages/Privacy/Privacy';
// import Developers from '../pages/Developers/Developers';
import AccessibilityPage from '../pages/AccessibilityPage/AccessibilityPage';
import Developers from '../pages/Developers/Developers';

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
        path:'/register',
        Component: SignUp,
      },

      {
        path: '/login',
        Component: Login
      },

      {
        path:'/profile',
        element: <PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>
      },

      {
        path:'/resources',
        Component:ResourcesPage,
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
        path: "/education-awareness/:id",
        Component: EduAwarenessDetails,
        loader: async ({ params }) => {
          const eduPosts = await fetch("/Json files/EducationAwareness.json").then(res => res.json());
          const eduPost = eduPosts.find(b => b.id.toString() === params.id);
          if (!eduPost) throw new Response("Not Found", { status: 404 });
          return eduPost;
        }
      },

      {
        path: '/team-members',
        Component: Team,
        loader: async () => {
          const teamMembers = await fetch("/Json files/teamMembers.json").then(res => res.json());
          return teamMembers;
        }
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
        element: <PrivateRoutes><HelpCenter></HelpCenter></PrivateRoutes>
      },

      {
        path: '/accessibility-support',
        Component: UnderDevelopment,
      },

      {
        path: '/under-development',
        Component: UnderDevelopment,
      },
      {
        path: '/features',
        Component: Features,
      },
      {
        path: '/privacy',
        Component: Privacy,
      },
      {
        path: '/developers',
        element: <PrivateRoutes><Developers></Developers></PrivateRoutes> ,
      },

      {
        path: '/accessibility',
        Component: AccessibilityPage,
      },


      // -------routes for the all tests--------     
      {
        path: '/assessments',
        Component: AllTests,
        loader: async () => {
          const allTest = await fetch("/Json files/allTests.json").then(res => res.json());
          return allTest;
        }
      },
      // DYNAMIC TEST ROUTE (Replaces individual routes)
      {
        path: '/assessments/:testSlug',
        Component: UniversalTest,
        loader: async ({ params }) => {
          const allTests = await fetch("/Json files/allTests.json").then(res => res.json());
          // Match the URL slug to the JSON 'slug'
          const testData = allTests.find(t => t.slug === params.testSlug);
          if (!testData) throw new Response("Test Not Found", { status: 404 });
          return testData;
        }
      },

      {
        path:'/assessment-history',
        element: <PrivateRoutes><AssessmentHistory></AssessmentHistory></PrivateRoutes>,
        loader: async () => {
          const allTest = await fetch("/Json files/allTests.json").then(res => res.json());
          return allTest;
        }
      }
    ]
  },
]);