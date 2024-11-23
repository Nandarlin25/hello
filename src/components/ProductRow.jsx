import React, { useState } from "react";
import { HiSearch, HiTrash } from "react-icons/hi";
import { HiOutlinePencil, HiPlus } from "react-icons/hi2";
import { useSWRConfig } from "swr";

import { bouncy } from "ldrs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";

bouncy.register();

const ProductRow = ({ product: { id, product_name, price, created_at } }) => {
  
  const { mutate } = useSWRConfig();
  
  const [isDeleting,setIsDeleting] = useState(false);
  
  const handelDeleteBtn = async () => {

    setIsDeleting(true);

    await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });

    toast.success("Product delete successfully");
    mutate(import.meta.env.VITE_API_URL + `/products`);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{id}</td>

      <th
        scope="row"
        className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>
      <td className="px-6 py-4 text-end">{price}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timeStamp={created_at} />
      </td>
      <td className="px-6 py-4 text-end">
        <div
          className="inline-flex rounded-md shadow-sm text-slate-900"
          role="group"
        >
          <Link
           to={`/product/edit/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <HiOutlinePencil className="size-5" />
          </Link>
          <button
            type="button"
            onClick={handelDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium text-red-600 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? (
              <l-bouncy size="20" speed="1.75" color="black"></l-bouncy>
            ) : (
              <HiTrash className="size-5" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
