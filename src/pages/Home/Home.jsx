import React from 'react';
import Banner from '../Header/Banner';
import Faq from '../UnderDevelopment/Faqs/Faq';
import Blogs from '../Blogs/Blogs';
import blogs from '../../../public/Json files/blogs.json'
import Testimonials from '../../components/Testimonials';
import TestHomeSection from '../../components/TestHomeSection';
import Stats from '../../components/Stats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Blogs data={blogs.slice(0, 4)}></Blogs>
            <TestHomeSection></TestHomeSection>
            <Stats></Stats>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;