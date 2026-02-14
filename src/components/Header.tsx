const Header = () => {
    
  const date: string = String(new Date().toLocaleDateString().split("."))
  const monthsList: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthsList[Number(date.slice(3, 5)) - 1]

  return (
    <div className='flex flex-row w-full px-6 py-4 justify-between text-2xl border-b-2 border-white/40 lg:text-3xl font-bold'>
      <span data-safe-click="true">TASKFLOW PRO</span>
      <span data-safe-click="true" className="text-center">{date.slice(-4)} {month} {date.slice(0, 2)}</span>
    </div>
  ) 
}

export default Header