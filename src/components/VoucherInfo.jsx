import { data } from "autoprefixer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRecordStore from "../stores/useRecordStore";

import { tailspin } from "ldrs";
import toast from "react-hot-toast";
import useSWR from "swr";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import { useNavigate } from "react-router-dom";

tailspin.register();

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);

  const { records, resetRecord } = useRecordStore();

  const onSubmit = async (data) => {
    setIsSending(true);

    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.05;
    const netTotal = total + tax;

    const currentVoucher = { ...data, records, total, tax, netTotal };

    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    console.log(json);

    toast.success("Voucher created successful");

    resetRecord();

    reset();

    setIsSending(false);

    if (data.redirect_to_detail) {
      navigate(`/voucher/detail/${json.id}`);
    }
  };

  // Utility function to generate a unique invoice number
  function generateInvoiceNumber() {
    // Get the current date
    const date = new Date();

    // Format the date as YYYYMMDD
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Combine the formatted date and the random number
    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  }
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-3">
        <SaleForm />

        <VoucherTable />
      </div>

      <div className="col-span-1 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} id="infoForm">
          <div className="">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.product_name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Voucher Id
              </label>
              <input
                type="text"
                {...register("voucher_id", {
                  required: true,
                })}
                defaultValue={generateInvoiceNumber()}
                className={`bg-gray-50 border ${
                  errors.voucher_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.voucher_id?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Voucher Id is required
                </p>
              )}
            </div>

            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Name
              </label>
              <input
                type="text"
                {...register("customer_name", {
                  required: true,
                })}
                defaultValue={data.customer_name}
                className={`bg-gray-50 border ${
                  errors.customer_name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.customer_name?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer name is required
                </p>
              )}
            </div>

            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_email ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Email
              </label>
              <input
                type="text"
                {...register("customer_email", {
                  required: true,
                })}
                defaultValue={data.customer_email}
                className={`bg-gray-50 border ${
                  errors.customer_email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.customer_email?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer Email is required
                </p>
              )}
            </div>

            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.sale_date ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Voucher Id
              </label>
              <input
                type="date"
                {...register("sale_date", {
                  required: true,
                })}
                defaultValue={new Date().toISOString().slice(0, 10)}
                className={`bg-gray-50 border ${
                  errors.sale_date
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.sale_date?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Sale date is required
                </p>
              )}
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center mb-2">
            <input
              required
              {...register("all_correct")}
              type="checkbox"
              form="infoForm"
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
          <div className="flex items-center -ml-5 mb-2">
            <input
              required
              {...register("redirect_to_detail")}
              type="checkbox"
              form="infoForm"
              id="redirect_to_detail"
              defaultValue
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="redirect_to_detail"
              className="ms-2 text-sm font-medium text-stone-700 dark:text-gray-500"
            >
              Redirect to Voucher Detail
            </label>
          </div>
          <button
          form="infoForm"
          type="submit"
          className="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Comfirm Voucher</span>
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
        </div>
      </div>
    </div>
  );
};

export default VoucherInfo;
