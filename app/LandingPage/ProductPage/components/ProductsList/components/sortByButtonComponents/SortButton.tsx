import { FaArrowDown19, FaArrowUp19 } from 'react-icons/fa6'
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
type Props = {
    label: string
    active: boolean
    direction: 'ASC' | 'DESC'
    onClick: () => void
}

export const SortButton = ({ label, active, direction, onClick }: Props) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <button onClick={onClick} className="cursor-pointer flex items-center gap-1">
                {label}
                {active ? (direction === 'ASC' ? <FaArrowDown19 className='text-red-400' /> : <FaArrowUp19 className='text-green-400' />) : <FaArrowDownUpAcrossLine />}
            </button>
        </TooltipTrigger>
        <TooltipContent>
            <p>{`Order by ${label} ${active ? (direction == 'ASC' ? 'DESC' : 'ASC') : 'ASC'}`}</p>
        </TooltipContent>
    </Tooltip>

)
