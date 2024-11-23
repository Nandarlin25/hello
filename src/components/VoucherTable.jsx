import React from "react";
import useRecordStore from "../stores/useRecordStore";
import VoucherTableRow from "./VoucherTableRow";

const VoucherTable = () => {
  const { records } = useRecordStore();

  const total = records.reduce((a, b) => a + b.cost, 0);
  const tax = total * 0.05;
  const netTotal = total + tax;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr className="px-6 py-4">
            <th scope="col" className="px-6 py-3">
              # 
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Cost
            </th>
            <th scope="col" className="px-6 py-3">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody id="recordGroup">
          {records === 0 && (
            <tr className="hidden last:table-row odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td
                colSpan={6}
                className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                There is no record. Buy Something
              </td>
            </tr>
          )}
          {records.map((record, index) => (
            <VoucherTableRow key={record.id} record={record} index={index} />
          ))}
        </tbody>
        <tfoot>
          <tr className=" border-b dark:border-gray-700">
            <td
              colSpan={4}
              className="text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Total
            </td>
            <td className="px-6 py-4 text-end ">
              {total.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-end"></td>
          </tr>

          <tr className=" border-b dark:border-gray-700">
            <td
              colSpan={4}
              className="text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Tax ( Vat 5% )
            </td>
            <td className="px-6 py-4 text-end ">
              {tax.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-end"></td>
          </tr>

          <tr className=" border-b dark:border-gray-700">
            <td
              colSpan={4}
              className="text-end px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
             Net Total ( mmk )
            </td>
            <td className="px-6 py-4 text-end ">
              {netTotal.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-end"></td>
          </tr>

          
        </tfoot>
      </table>
    </div>
  );
};

export default VoucherTable;
