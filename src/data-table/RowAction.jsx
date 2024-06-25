/* eslint-disable react/prop-types */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    EllipsisVertical
} from "lucide-react"


export const RowAction = ({ rowData, actions }) => {

    const getMenuItem = () => {
        return actions.map((action, index) => {
            if (action.label === "-") {
                return <DropdownMenuSeparator key={index} />
            }
            else {
                return (
                    <DropdownMenuItem key={index} onSelect={() => action.onSelect(rowData)}>
                        {
                            action.icon && (
                                <span className="mr-2">
                                    {action.icon}
                                </span>
                            )
                        }
                        {action.label}
                    </DropdownMenuItem>
                )
            }
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-slate-300 rounded-full text-slate-500 p-1">
                <EllipsisVertical className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    getMenuItem()
                }
            </DropdownMenuContent>
        </DropdownMenu>

    )
}