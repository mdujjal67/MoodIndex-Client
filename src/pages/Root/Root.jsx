import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Header/navbar';
import Footer from '../Footer/footer';
import ScrollToTop from '../../components/ScrollToTop';


const Root = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <ScrollToTop></ScrollToTop> 
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;
