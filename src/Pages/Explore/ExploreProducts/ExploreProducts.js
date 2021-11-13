import React from 'react';
import { Link } from 'react-router-dom';

const ExploreProducts = (props) => {
    const { _id, img, name, description, price, specification } = props.product;
    return (
        <div className="col mb-5">
            <div className="card product-style">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <h6 className="card-text">Storage: {specification?.Storage}</h6>
                    <h6 className="card-text">Camera: {specification?.Camera}</h6>
                    <h6 className="card-text">Battery: {specification?.Battery}</h6>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Starts From: {price}</p>

                    <Link to={`/placeorder/${_id}`}>
                        <button className="btn btn-warning rounded px-5 ">Buy Now</button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ExploreProducts;