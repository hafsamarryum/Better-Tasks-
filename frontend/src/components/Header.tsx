import React from 'react';
import { ClipboardCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-[100%] h-[72px] text-[#FFF] flex justify-between items-center font-bold bg-[#104225]">
      <div className="flex items-center space-x-2 pl-[10px]">
        <ClipboardCheck />
        <span className="text-white font-bold text-lg ml-[10px]"><h2> Todo List</h2></span>
      </div>
      <nav className="w-[35%] space-x-6 bg-gradient-to-br from-[#1b6438] via-[#356b4a] to-[#bdc3c7]
          px-6 py-2">
        <ul className='h-[62px] flex justify-center items-center list-none gap-[20px] my-[5px]'>
        <li className="text-white text-sm tracking-wide hover:underline">
          MY TODO LISTS
        </li>
        <li className="text-white text-sm tracking-wide hover:underline">
          NOTES
        </li>
        <li className="text-white text-sm tracking-wide hover:underline">
          ABOUT
        </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
