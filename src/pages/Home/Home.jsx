import React, { useEffect } from 'react';
import Banner from '../Header/Banner';
import Faq from '../Faqs/Faq';
import Blogs from '../Blogs/Blogs';
// import blogs from '../../../public/Json files/blogs.json'
import Testimonials from '../../components/Testimonials';
import TestHomeSection from '../../components/TestHomeSection';
import Stats from '../../components/Stats';
import EducationAwareness from '../EducationAwareness/EducationAwareness';
// import educationAwareness from '../../../public/Json files/EducationAwareness.json'
import { useLoaderData } from 'react-router';

const Home = () => {
    const {blogs, edu} =useLoaderData();
    
    // dynamic title
    useEffect((() => {
        document.title = "MoodIndex | Home"
    }), []);
    return (
        <div>
            <Banner></Banner>
            <Blogs data={blogs.slice(0, 3)} isHome={true}></Blogs>
            <EducationAwareness data={edu.slice(0, 3)} isHome={true}></EducationAwareness>
            <TestHomeSection></TestHomeSection>
            <Stats></Stats>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;