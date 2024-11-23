import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useRecordStore from "../stores/useRecordStore";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SaleForm = () => {
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/products`,
    fetcher
  );

  const { register, handleSubmit, reset } = useForm();

  const { addRecord, changeQuantity, records } = useRecordStore();

  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);
    const currentProductId = currentProduct.id;

    const isExisted = records.find(
      ({ product: { id } }) => currentProductId === id
    );
    // console.log(isExisted);

    if (isExisted) {
      changeQuantity(isExisted.id, data.quantity);
    } else {
      addRecord({
        id: Date.now(),
        product: currentProduct,
        Quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        created_at: new Date().toISOString(),
      });
    }

    reset();
    // console.log(data);
  };

  // const onSubmit = (data) => {
  //   try {
  //     const selectedProduct = JSON.parse(data.product);
  //     console.log({
  //       product: selectedProduct,
  //       Quantity: data.quantity,
  //       cost: selectedProduct.price * data.quantity,
  //       created_at: new Date().toISOString(),
  //     });
  //   } catch (error) {
  //     console.error("Invalid JSON for product:", error);
  //   }
  // };

  return (
    // error
    // <div>
    //   <form action="#" id="createRecordForm" onSubmit={handleSubmit(onSubmit)}>
    //     <div className="grid grid-cols-4 gap-3 bg-blue-100 rounded-lg shadow p-5 mb-5">
    //       <div className="col-span-2">
    //         <label
    //           htmlFor="productSelect"
    //           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         >
    //           Select Your Product
    //         </label>
    //         <select
    //           required
    //           id="productSelect"
    //           {...register("product")}
    //           name="product_select"
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         >
    //           <option value="">Select a product</option>
    //           {!isLoading &&
    //             data.map((product) => (
    //               <option key={product.id} value={JSON.stringify(product)}>
    //                 {product.product_name}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //       <div className="col-span-1">
    //         <div>
    //           <label
    //             htmlFor="quantity"
    //             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //           >
    //             Your Quantity
    //           </label>
    //           <input
    //             type="text"
    //             {...register("quantity")}
    //             id="quantity"
    //             name="quantity"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div className="col-span-1">
    //         <button
    //           type="submit"
    //           className="w-full h-full me-2 mb-2 text-sm font-medium text-blue-500 border-blue-500 focus:outline-none bg-white rounded-lg border hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    //         >
    //           Add Product
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>

    <div className=" bg-white p-5 rounded-lg border mb-5">
      <form action="#" id="recordForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2">
            <label
              htmlFor="productSelect"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Your Product
            </label>
            <select
              id="productSelect"
              {...register("product")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select a product</option>
              {!isLoading &&
                data.map((product) => (
                  <option key={product.id} value={JSON.stringify(product)}>
                    {product.product_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="quantityInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantityInput"
              {...register("quantity")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="text-blue-700 w-full h-full flex justify-center items-center hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
