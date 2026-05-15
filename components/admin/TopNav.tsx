import { BiMenu } from 'react-icons/bi';

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="h-15 bg-white border-b border-slate-100 flex lg:hidden items-center justify-between px-4 md:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4 flex-1">
                <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
                    <BiMenu size={24} />
                </button>

                {/* <div className="relative max-w-md w-full hidden sm:block">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search your food..."
                        className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                </div> */}
            </div>

            {/* <div className="flex items-center gap-4">
                <button className="p-2 bg-slate-50 rounded-xl relative">
                    <BiBell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="w-10 h-10 rounded-xl bg-orange-100 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Admin" alt="User" />
                </div>
            </div> */}
        </header>
    );
}