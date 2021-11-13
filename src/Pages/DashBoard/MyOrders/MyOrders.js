import React, { useEffect, useState } from 'react';
import useAuth from './../../../Hooks/useAuth';

const MyOrders = () => {
    const { user } = useAuth();
    console.log(user);
    console.log(user.email);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const url = `https://aqueous-reef-70969.herokuapp.com/orders?email=${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)
            })
    }, [user.email])
    return (
        <div>
            <h1>Order list</h1>
            <ol>
                {
                    orders.map(order => <li
                        key={order._id}
                    >{order.productName}
                    </li>)
                }
            </ol>
        </div>
    );
};

export default MyOrders;