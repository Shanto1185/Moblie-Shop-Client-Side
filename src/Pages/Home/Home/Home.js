import React from 'react';
import Footer from '../../Shared/Footer/Footer'
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
import Reviews from '../Reviews/Reviews';
import Navigation from './../../Shared/Navigation/Navigation';
import BestSelling from './../BestSelling/BestSelling';


const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <Products></Products>
            <Reviews></Reviews>
            <BestSelling></BestSelling>
            <Footer></Footer>
        </div>
    );
};

export default Home;