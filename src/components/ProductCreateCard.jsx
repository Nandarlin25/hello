import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { ring2 } from "ldrs";
import toast from "react-hot-toast";

ring2.register();

const ProductCreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleCreateProduct = async (data) => {
    setIsSending(true);
    await fetch(import.meta.env.VITE_API_URL + "/products", {
      method: "POST",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSending(false);
    reset();
    if (data.back_to_product_list) {
      navigate("/product");
    }
    toast.success("Product create successfully");
    // console.log(data);
  };

  return (
    <div className="p-5 w-full rounded-lg md:w-1/2">
      <h1 className="text-2xl font-bold mb-3">Create New Product</h1>
      <p className="mb-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit debitis
        mollitia odit explicabo sunt .
      </p>

      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="mb-6">
          <label
            htmlFor="first_name"
            className={`block mb-2 text-sm font-medium ${
              errors.product_name
                ? "text-red-500 dark:text-white"
                : "text-gray-900 dark:text-white"
            }`}
          >
            New Product Name
          </label>
          <input
            {...register("product_name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            type="text"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg ${
              errors.product_name
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg. apple"
          />
          {errors.product_name?.type === "required" && (
            <p className="text-red-400 text-sm">Product name is required</p>
          )}
          {errors.product_name?.type === "minLength" && (
            <p className="text-red-400 text-sm">
              Product name must be greater than 3 characters
            </p>
          )}
          {errors.product_name?.type === "maxLength" && (
            <p className="text-red-400 text-sm">
              Product name must be less than 10 characters
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="last_name"
            className={`block mb-2 text-sm font-medium ${
              errors.price
                ? "text-red-500 dark:text-white"
                : "text-gray-900 dark:text-white"
            }`}
          >
            Product Price
          </label>
          <input
            {...register("price", {
              required: true,
              min: 50,
              max: 10000,
            })}
            type="number"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg ${
              errors.price
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg. 500mmk"
          />
          {errors.price?.type === "required" && (
            <p className="text-red-400 text-sm">Product price is required</p>
          )}
          {errors.price?.type === "min" && (
            <p className="text-red-400 text-sm">
              Product price must be greater than 50 characters
            </p>
          )}
          {errors.price?.type === "max" && (
            <p className="text-red-400 text-sm">
              Product price must be less than 10000 characters
            </p>
          )}
        </div>

        <div className="flex items-center mb-4">
          <input
            required
            {...register("all_correct")}
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="disabled-checkbox"
            className="ms-2 text-sm font-medium text-stone-700 dark:text-gray-500"
          >
            Make sure all field are correct
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            required
            {...register("back_to_product_list")}
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="back_to_product_list"
            className="ms-2 text-sm font-medium text-stone-700 dark:text-gray-500"
          >
            Back to product List
          </label>
        </div>

        <Link
          to={"/product"}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="text-white inline-flex gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Save Product</span>
          {isSending && (
            <l-ring-2
              size="20"
              stroke="5"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="0.8"
              color="white"
              className="text-white"
            ></l-ring-2>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductCreateCard;
