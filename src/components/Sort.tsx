import { FaArrowDownWideShort, FaArrowUpWideShort } from "react-icons/fa6";

interface Props {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    reverseSort: boolean;
    setReverseSort: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sort = ({sortBy, setSortBy, reverseSort, setReverseSort}: Props) => {
    return (
        <div className='flex flex-col gap-3 mb-16'>
            <div data-safe-click="true" className="flex flex-row gap-1">
                <span className='text-xl block w-full'>Sort By:</span>
                <button className={"cursor-pointer rounded-full self-center p-2.5 text-xl text-cyan-900 " + (reverseSort ? "" : "bg-cyan-200")} onClick={() => setReverseSort(false)}><FaArrowUpWideShort /></button>
                <button className={"cursor-pointer rounded-full self-center p-2.5 text-xl text-cyan-900 " + (reverseSort ? "bg-cyan-200" : "")} onClick={() => setReverseSort(true)}><FaArrowDownWideShort /></button>
            </div>
            
            <div data-safe-click="true" className='grid grid-cols-3 gap-3 font-bold text-2xl text-center justify-center w-full border-2 rounded-4xl border-white/40 backdrop-blur-md'>
                <label className={
                    'border-2 rounded-4xl border-white/40 backdrop-blur-md cursor-pointer transition-all flex justify-center ' +
                    (sortBy === 'Priority' ? 'bg-transparent bg-linear-to-r from-pink-600/50 to-purple-600/50 bg-[length:100%_0.4em] bg-no-repeat bg-bottom' : 'bg-[#E6E6E6] ') +
                    (sortBy !== 'Priority' ? 'hover:bg-[#D6D6D6]' : '')
                }>
                    <span className='flex self-center'>Priority</span>
                    <input type='radio' name="sort" value="Priority" className='hidden' checked={sortBy === "Priority"} onChange={(event) => setSortBy(event.target.value)}></input>
                </label>
                <label className={
                    'p-2 border-2 rounded-4xl border-white/40 backdrop-blur-md cursor-pointer transition-all flex justify-center ' +
                    (sortBy === 'Status' ? 'bg-transparent bg-linear-to-r from-pink-600/50 to-purple-600/50 bg-[length:100%_0.4em] bg-no-repeat bg-bottom' : 'bg-[#E6E6E6] ') +
                    (sortBy !== 'Status' ? 'hover:bg-[#D6D6D6]' : '')
                }>
                    <span className="flex self-center">Status</span>
                    <input type='radio' name="sort" value="Status" className='hidden' checked={sortBy === "Status"} onChange={(event) => setSortBy(event.target.value)}></input>
                </label>
                <label className={
                    'p-2 border-2 rounded-4xl border-white/40 backdrop-blur-md cursor-pointer transition-all flex justify-center ' +
                    (sortBy === 'Date' ? 'bg-transparent bg-linear-to-r from-pink-600/50 to-purple-600/50 bg-[length:100%_0.4em] bg-no-repeat bg-bottom' : 'bg-[#E6E6E6] ') +
                    (sortBy !== 'Date' ? 'hover:bg-[#D6D6D6]' : '')
                }>
                    <span className="flex self-center">Date</span>
                    <input type='radio' name="sort" value="Date" className='hidden' checked={sortBy === "Date"} onChange={(event) => setSortBy(event.target.value)}></input>
                </label>
            </div>
        </div>
    )
}

export default Sort