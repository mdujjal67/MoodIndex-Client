import React from 'react';
import Banner from '../Header/Banner';
import Faq from '../UnderDevelopment/Faqs/Faq';
import Blogs from '../Blogs/Blogs';
import blogs from '../../../public/Json files/blogs.json'
import Testimonials from '../../components/Testimonials';
import TestHomeSection from '../../components/TestHomeSection';
import Stats from '../../components/Stats';
import EducationAwareness from '../EducationAwareness/EducationAwareness';
import educationAwareness from '../../../public/Json files/EducationAwareness.json'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Blogs data={blogs.slice(0, 3)}></Blogs>
            <EducationAwareness data={educationAwareness.slice(0, 3)}></EducationAwareness>
            <TestHomeSection></TestHomeSection>
            <Stats></Stats>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;