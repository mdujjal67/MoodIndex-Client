import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Header/navbar';
import Footer from '../Footer/footer';

const Root = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;