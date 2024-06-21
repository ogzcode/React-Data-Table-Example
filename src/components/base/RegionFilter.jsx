
/* eslint-disable react/prop-types */
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const Region = ({ column, options }) => {
    return (
        <Select
            value={column.getFilterValue() || ""}
            onValueChange={(value) => column.setFilterValue(value)}
        >
            <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent side="top">
                {options.map((region, index) => (
                    <SelectItem key={index} value={region.value}>
                        {region.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}