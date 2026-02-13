interface Props {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
  }

const Sort = ({sortBy, setSortBy}: Props) => {
    return (
        <div className='flex flex-col gap-3 mb-16 text-center'>
            <span data-safe-click="true" className='text-xl block w-full'>Sort By:</span>
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