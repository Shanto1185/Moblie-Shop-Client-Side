import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import OrderModal from '../OrderModal/OrderModal';
import useAuth from './../../../Hooks/useAuth';
import { useHistory } from 'react-router-dom';
const PlaceOrder = () => {
    const { id } = useParams()
    const { user } = useAuth()

    const [details, setDetails] = useState({})


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useHistory();



    useEffect(() => {
        fetch(`https://aqueous-reef-70969.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setDetails(data))
    }, [id])

    return (
        <div className="booking mb-5">
            <br /> <br />
            <div className="container">
                <h5 className="fw-bolder">Hello !! {user.displayName}</h5>
                <h3 className="fw-bolder">You want to order this?</h3>
                <br />
                <img className="w-25 rounded-3" src={details?.img} alt="" /> <br />
                <h3 className="mt-3 fw-bolder">{details?.name}</h3>
                <h6 className="card-text">Storage: {details?.specification?.Storage}</h6>
                <h6 className="card-text">Camera: {details?.specification?.Camera}</h6>
                <h6 className="card-text">Battery: {details?.specification?.Battery}</h6>
                <p className="fw-bold  text-align-center">About Phone : {details?.description}</p>
            </div>


            <button onClick={handleOpen} className="btn btn-warning   mt-2 ms-3 mb-4 fw-bold px-5 py-2">
                Place Order
            </button>

            <OrderModal
                handleClose={handleClose}
                open={open}
                details={details}
                history={history}
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