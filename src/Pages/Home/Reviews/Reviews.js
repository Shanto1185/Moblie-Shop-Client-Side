import React, { useEffect, useState } from 'react';
import './Reviews.css'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://aqueous-reef-70969.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className="container">
            <h1 className="my-5 fw-bolder my-5">Our Happy <span className="text-warning"> Customer</span></h1>
            <div className="row row-cols-1 row-cols-md-2 g-2">

                {
                    reviews.map(review => <div>
                        <div className="card p-2">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={review.img} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title fw-bolder">{review.name}</h3>
                                        <h6 className="card-title fw-bold">{review.email}</h6>
                                        <p className="card-text">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Reviews;