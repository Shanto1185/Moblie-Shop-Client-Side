import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import OrderModal from '../OrderModal/OrderModal';
import useAuth from './../../../Hooks/useAuth';

const PlaceOrder = () => {
    const { id } = useParams()
    const { user } = useAuth()

    const [details, setDetails] = useState({})


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        fetch(`https://aqueous-reef-70969.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setDetails(data))
    }, [])

    // const handlePlaceOrder = () => {
    //     const orders = {
    //         name: details?.name
    //     }
    //     fetch('https://aqueous-reef-70969.herokuapp.com/orders', {
    //         method: "POST",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(orders)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.insertedId) {
    //                 alert('your order is successfully added')
    //             }
    //         })
    // }
    return (
        <div className="booking mb-5">
            <br /> <br />
            <h5 className="fw-bolder">Hello !! {user.displayName}😎</h5>
            <h3 className="fw-bolder">You want to order this?</h3>
            <br />
            <img className="w-25 rounded-3" src={details?.img} alt="" /> <br />
            <h3 className="mt-3 fw-bolder">{details?.name}</h3>
            <p className="fw-bolder">Tota cost : {details?.description}</p>


            <button onClick={handleOpen} className="btn btn-warning   mt-2 ms-3 mb-4 fw-bold px-5 py-2">
                Place Order
            </button>

            <OrderModal
                handleClose={handleClose}
                open={open}
                details={details}
            >
            </OrderModal>

        </div>
    );
};

export default PlaceOrder;



// <div className="booking mb-5">
// <br /> <br />
// <h5 className="fw-bolder">Hello !! {user.displayName}😎</h5>
// <h3 className="fw-bolder">Do you want to book this package?</h3>
// <h3 className="fw-bolder">  Click  here 👇 to book this..  </h3>
// <br />
// <img className="w-25 rounded-3" src={details?.img} alt="" /> <br />
// <h3 className="mt-3 fw-bolder">{details?.name}</h3>
// <p className="fw-bolder">Tota cost : {details?.description}</p>


// <button onClick={handleOpen} className="btn btn-warning   mt-2 ms-3 mb-4 fw-bold px-5 py-2">
//     Place Order
// </button>


// <OrderModal
//     handleClose={handleClose}
//     open={open}
//     details={details}
// >
// </OrderModal>

// </div>