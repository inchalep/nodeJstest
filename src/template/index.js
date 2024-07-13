import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { setIllustrationdata } from '../store/slices/illustration';
const IllustrationView = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const data = useSelector((state) => state.policyIllustration.data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const tableColumns = [
    {
      accessorKey: "Policy Year",
      cell: (info) => info.getValue(),
      header: "Policy Year",
    },
    {
      accessorKey: "Premium",
      cell: (info) => info.getValue(),
      header: "Premium",
    },
    {
      accessorKey: "Sum Assured",
      cell: (info) => info.getValue(),
      header: "Sum Assured",
    },
    {
      accessorKey: "Bonus Rate",
      cell: (info) => info.getValue(),
      header: "Bonus Rate",
    },
    {
      accessorKey: "Bonus Amount",
      cell: (info) => info.getValue(),
      header: "Sum Assured",
    },
    {
      accessorKey: "Total Benefit",
      cell: (info) => info.getValue(),
      header: "Sum Assured",
    },
    {
      accessorKey: "Total Benefit",
      cell: (info) => info.getValue(),
      header: "Net Cashflows",
    },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handelBack = () => {
    dispatch(setIllustrationdata([]))
    navigate("/");
  };

  return (
    <div className='min-h-screen  bg-sky-900 p-8 text-gray-300 flex flex-col items-end'>
      <button
        className='p-2 px-8 shadow-lg bg-sky-800 rounded-md text-gray-300 text-right'
        onClick={handelBack}
      >
        Back
      </button>
      <table className='w-full table my-7'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center gap-3 justify-end'>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <button
          className='tableBtn'
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className='tableBtn'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className='tableBtn'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className='tableBtn'
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default IllustrationView;
