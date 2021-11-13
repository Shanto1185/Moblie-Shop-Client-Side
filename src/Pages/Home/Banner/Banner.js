import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

const Banner = () => {
    return (
        <div>
            <div className="banner-container">
                <div className="banner-image">
                    <div className="title-container text-center">
                        <div className="title-container">
                            <div className="title">
                                <h1>Mobile Shop</h1>
                                <Link to="/explore">
                                    <button className="btn btn-warning rounded px-5 ">Explore</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;