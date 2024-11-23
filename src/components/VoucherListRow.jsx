import React, { useState } from "react";
import { HiArrowLeft, HiSearch, HiTrash } from "react-icons/hi";
import { HiComputerDesktop, HiOutlineArrowLongRight, HiOutlinePencil, HiPlus } from "react-icons/hi2";
import ShowDate from "./ShowDate";
import { useSWRConfig } from "swr";
import { bouncy } from "ldrs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

bouncy.register();


const VoucherListRow = ({voucher : {id,voucher_id,customer_name,customer_email,sale_date}}) => {
  const { mutate } = useSWRConfig();
  
  const [isDeleting,setIsDeleting] = useState(false);
  
  const handelDeleteBtn = async () => {

    setIsDeleting(true);

    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });

    toast.success("Voucher delete successfully");
    mutate(import.meta.env.VITE_API_URL + `/vouchers`);

    setIsDeleting(false);

  }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{voucher_id}</td>

      <th
        scope="row"
        className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {customer_name}
      </th>
      <td className="px-6 py-4 text-end">{customer_email}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timeStamp={sale_date} />
      </td>
      <td className="px-6 py-4 text-end">
        <div
          className="inline-flex rounded-md shadow-sm text-slate-900"
          role="group"
        >
          <button
          onClick={handelDeleteBtn}
            type="button"
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white rounded-s-lg"
          >
            {isDeleting ? (
              <l-bouncy size="20" speed="1.75" color="black"></l-bouncy>
            ) : (
              <HiTrash className="size-5" />
            )}
          </button>

          <Link
          to={`/voucher/detail/${id}`}
           className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white rounded-e-lg"
          >
            <HiOutlineArrowLongRight className="size-5" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRow;
