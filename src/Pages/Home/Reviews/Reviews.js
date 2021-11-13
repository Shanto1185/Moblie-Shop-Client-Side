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
            <h1 className="my-5">Our Happy Customer</h1>
            <div className="row row-cols-1 row-cols-md-2 g-2">

                {
                    reviews.map(review => <div>
                        <div class="card p-2">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={review.img} class="img-fluid rounded-start" alt="..." />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h3 class="card-title fw-bolder">{review.name}</h3>
                                        <p class="card-text">{review.comment}</p>
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