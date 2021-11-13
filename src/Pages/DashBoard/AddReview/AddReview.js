import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import useAuth from '../../../Hooks/useAuth';
import './AddReview.css'

const AddReview = () => {

    const { user } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    //POSTING REVIEW
    const onSubmit = data => {

        axios.post('https://aqueous-reef-70969.herokuapp.com/reviews', data)
            .then(response => {
                if (response.data.insertedId) {
                    alert('Thank You For Your Review');
                    reset();
                }
            })
    }
    return (
        <div>
            <div className="review">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="fw-bold" {...register("name", { required: true, maxLength: 20 })} defaultValue={user.displayName} />
                    <input className="fw-bold" {...register("email", { required: true, maxLength: 20 })} defaultValue={user.email} />

                    <input className="fw-bold" {...register("img", { required: true })} placeholder=" Image Url " />

                    <textarea className="fw-bold" {...register("comment", { required: true })} placeholder="Your Comment" />

                    <input className="bg-warning border border-3 p-2fw-bold fs-4" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddReview;