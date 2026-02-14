const Header = () => {
    
  const date: string = String(new Date().toLocaleDateString().split("."))
  const monthsList: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthsList[Number(date.slice(3, 5)) - 1]

  return (
    <div className='flex flex-col sm:flex-row w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 justify-between items-center sm:items-start gap-2 sm:gap-0 text-lg sm:text-xl md:text-2xl border-b-2 border-white/40 lg:text-3xl font-bold'>
      <span data-safe-click="true" className="text-center sm:text-left">TASKFLOW PRO</span>
      <span data-safe-click="true" className="text-center text-sm sm:text-lg md:text-xl lg:text-3xl">{date.slice(-4)} {month} {date.slice(0, 2)}</span>
    </div>
  ) 
}

export default Header