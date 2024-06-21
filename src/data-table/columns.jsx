/* eslint-disable react/prop-types */

import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Region } from "@/components/base/RegionFilter";
import { regionOptions } from "@/lib/utils";

export const columns = [
    {
        accessorKey: "il_adi",
        header: "City Name",
        cell: ({ row }) => <div className="flex items-center gap-2">{row.getValue("il_adi")}</div>,
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
        cell: ({ row }) => row.getValue("nufus").toLocaleString(),
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
        cell: ({ row }) => row.getValue("yuzolcumu").toLocaleString(),
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
        cell: ({ row }) => row.getValue("erkek_nufus").toLocaleString(),
    },
    {
        accessorKey: "kadin_nufus_yuzde",
        header: "Female Population (%)",
        cell: ({ row }) => row.getValue("kadin_nufus_yuzde"),
    },
    {
        accessorKey: "kadin_nufus",
        header: "Female Population",
        cell: ({ row }) => row.getValue("kadin_nufus").toLocaleString(),
    },
    {
        accessorKey: "nufus_yuzdesi_genel",
        header: "General Population (%)",
        cell: ({ row }) => row.getValue("nufus_yuzdesi_genel"),
    }
];
