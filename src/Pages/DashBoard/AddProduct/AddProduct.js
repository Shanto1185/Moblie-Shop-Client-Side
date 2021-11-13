import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import useAuth from './../../../Hooks/useAuth';
import './AddProduct.css';



const AddProduct = () => {

    const { user } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    //POSTING REVIEW
    const onSubmit = data => {

        axios.post('https://aqueous-reef-70969.herokuapp.com/products', data)
            .then(response => {
                if (response.data.insertedId) {
                    alert('An Admin Added a Product');
                    reset();
                }
            })
    }
    return (
        <div>
            <div className="addProduct">
                <h1>Add A Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="fw-bold" {...register("name", { required: true, maxLength: 20 })} placeholder="Product Name" />
                    <input className="fw-bold" {...register("img", { required: true })} placeholder="Product Image Url " />
                    <input className="fw-bold" {...register("number", { required: true })} defaultValue="$" placeholder="Product Price" />

                    <input className="bg-warning border border-3 p-2fw-bold fs-4" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;