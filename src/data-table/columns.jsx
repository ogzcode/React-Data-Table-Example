/* eslint-disable react/prop-types */

import { ArrowUpDown, ArrowDown, ArrowUp, ChevronRight, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Region } from "@/components/base/RegionFilter";
import { regionOptions } from "@/lib/utils";


export const columns = [
    {
        accessorKey: "il_adi",
        header: "City Name",
        cell: ({ row }) => row.getCanExpand() ? (
            <div className="flex items-center">
                <button {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                }}
                className="text-slate-500 hover:text-slate-700 mr-2"
                >
                    {row.getIsExpanded() ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {row.original.il_adi}
            </div>
        ) : (
            row.original.il_adi
        ),
        filter: (props) => (
            <Input
                value={props.column.getFilterValue() || ""}
                onChange={(e) => props.column.setFilterValue(e.target.value)}
                placeholder="Filter City Name..."
            />
        ),
    },
    {
        accessorKey: "plaka_kodu",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex gap-2 items-center"
                >
                    <span>Plate Code</span>
                    {

                        column.getIsSorted() === "asc" ? <ArrowUp className="h-4 w-4" /> :
                            column.getIsSorted() === "desc" ? <ArrowDown className="h-4 w-4" /> :
                                <ArrowUpDown className="h-4 w-4" />

                    }
                </button>
            )
        },
        cell: ({ row }) => row.getValue("plaka_kodu"),
        filter: (props) => (
            <Input
                value={props.column.getFilterValue() || ""}
                onChange={(e) => props.column.setFilterValue(e.target.value)}
                placeholder="Filter Plate Code..."
            />
        ),
    },
    {
        accessorKey: "alan_kodu",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex gap-2 items-center"
                >
                    <span>Area Code</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => row.getValue("alan_kodu"),
    },
    {
        accessorKey: "nufus",
        header: "Population",
        cell: ({ row }) => row.getValue("nufus"),
    },
    {
        accessorKey: "bolge",
        header: "Region",
        cell: ({ row }) => row.getValue("bolge"),
        filter: (props) => (
            <div>
                <Region {...props} options={regionOptions} />
            </div>
        ),
    },
    {
        accessorKey: "yuzolcumu",
        header: "Area (km²)",
        cell: ({ row }) => row.getValue("yuzolcumu"),
    },
    {
        accessorKey: "nufus_artisi",
        header: "Population Growth (%)",
        cell: ({ row }) => row.getValue("nufus_artisi"),
    },
    {
        accessorKey: "erkek_nufus_yuzde",
        header: "Male Population (%)",
        cell: ({ row }) => row.getValue("erkek_nufus_yuzde"),
    },
    {
        accessorKey: "erkek_nufus",
        header: "Male Population",
        cell: ({ row }) => row.getValue("erkek_nufus"),
    },
    {
        accessorKey: "kadin_nufus_yuzde",
        header: "Female Population (%)",
        cell: ({ row }) => row.getValue("kadin_nufus_yuzde"),
    },
    {
        accessorKey: "kadin_nufus",
        header: "Female Population",
        cell: ({ row }) => row.getValue("kadin_nufus"),
    },
    {
        accessorKey: "nufus_yuzdesi_genel",
        header: "General Population (%)",
        cell: ({ row }) => row.getValue("nufus_yuzdesi_genel"),
    }
];


export const districtsColumns = [
    {
        accessorKey: "plaka_kodu",
        header: "Plate Code",
        cell: ({ row }) => row.getValue("plaka_kodu"),
    },
    {
        accessorKey: "ilce_kodu",
        header: "District Code",
        cell: ({ row }) => row.getValue("ilce_kodu"),
    },
    {
        accessorKey: "il_adi",
        header: "City Name",
        cell: ({ row }) => row.getValue("il_adi"),
    },
    {
        accessorKey: "ilce_adi",
        header: "District Name",
        cell: ({ row }) => row.getValue("ilce_adi"),
        filter: (props) => (
            <Input
                value={props.column.getFilterValue() || ""}
                onChange={(e) => props.column.setFilterValue(e.target.value)}
                placeholder="Filter City Name..."
            />
        ),
    },
    {
        accessorKey: "nufus",
        header: "Population",
        cell: ({ row }) => row.getValue("nufus"),
    },
    {
        accessorKey: "erkek_nufus",
        header: "Male Population",
        cell: ({ row }) => row.getValue("erkek_nufus"),
    },
    {
        accessorKey: "kadin_nufus",
        header: "Female Population",
        cell: ({ row }) => row.getValue("kadin_nufus"),
    },
];