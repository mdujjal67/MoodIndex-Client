import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Header/navbar';
import Footer from '../Footer/footer';
import ScrollToTop from '../../components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '../../components/ScrollToTopButton';


const Root = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollToTop></ScrollToTop> 
            <Navbar />
            <Outlet />
            <ScrollToTopButton></ScrollToTopButton>
            <Footer />
        </div>
    );
};

export default Root;
