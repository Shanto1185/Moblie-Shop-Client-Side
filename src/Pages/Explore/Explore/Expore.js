import React, { useEffect, useState } from 'react';
import ExploreProducts from '../ExploreProducts/ExploreProducts';

const Expore = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://aqueous-reef-70969.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className="container">
            <h1 className="my-5">Exclusive Phone Of 2021</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {
                    products.map(product => <ExploreProducts
                        key={product.id}
                        product={product}
                    >
                    </ExploreProducts>)
                }
            </div>
        </div>
    );
};

export default Expore;