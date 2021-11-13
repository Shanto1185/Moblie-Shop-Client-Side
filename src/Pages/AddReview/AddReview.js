import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './AddReview.css'

const AddReview = () => {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);

        axios.post('https://aqueous-reef-70969.herokuapp.com/reviews', data)
            .then(response => {
                if (response.data.insertedId) {
                    alert('Your booking is successfully add');
                    reset();
                }
                console.log(response);
            })
    }

    return (
        <div className="review">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="fw-bold" {...register("img", { required: true })} placeholder=" Image Url " />

                <input className="fw-bold" {...register("name", { required: true, maxLength: 20 })} placeholder="Your Name" />

                <textarea className="fw-bold" {...register("comment", { required: true })} placeholder="Your Comment" />

                <input className="bg-warning border border-3 p-2fw-bold fs-4" type="submit" />
            </form>
        </div>
    );
};

export default AddReview;


// const handleSubmit = e => {
//     e.preventDefault();
//     // alert('Your submission is completed');
//     //collect data
//     const appoinment = {
//         ...bookingInfo,
//         time,
//         serviceName: name,
//         date: date.toLocaleDateString()
//     }
//     // console.log(appoinment)
//     //send data to server
//     fetch('https://aqueous-reef-70969.herokuapp.com/appoinments', {
//         method: "POST",
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(appoinment)
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.insertedId) {
//                 setBookingSuccess(true)
//                 handleClose();
//             }
//         })


// }