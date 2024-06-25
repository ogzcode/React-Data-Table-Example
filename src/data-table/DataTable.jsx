/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DataTablePagination from "./Pagination"

export function DataTable({ columns, data, fetchFn, total, rowExpansionTemplate, rowAction }) {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 0,
    })
    const [expanded, setExpanded] = useState({})

    const manualPagination = !!fetchFn;
    const pageCount = manualPagination ? Math.ceil(total / pagination.pageSize) : undefined;


    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onExpandedChange: setExpanded,
        getSubRows: row => row.ilceler,
        getExpandedRowModel: getExpandedRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination,
            expanded,
        },
        manualPagination,
        pageCount,
        manualExpanding: true,
    })

    useEffect(() => {
        if (fetchFn) {
            fetchFn({
                sorting,
                columnFilters,
                pagination,
            })
        }
    }, [sorting, columnFilters, pagination, fetchFn])

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="border-b ">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="p-2">
                                            {header.isPlaceholder
                                                ? null
                                                : (
                                                    <div className="w-[10rem] text-slate-700">
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getCanFilter() ? (
                                                            <div className="mt-2">
                                                                {
                                                                    flexRender(header.column.columnDef.filter, { column: header.column })
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                        </TableHead>
                                    )
                                })}
                                {rowAction && <TableHead className="p-2">
                                    <div className="text-slate-700 mb-2">
                                        Actions
                                    </div>
                                </TableHead>}

                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                        {rowAction && (
                                            <TableCell>
                                                {rowAction(row.original)}
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    {row.getIsExpanded() && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                {rowExpansionTemplate({ row })}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
