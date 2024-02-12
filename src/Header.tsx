import React from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import './Header.css'

interface HeaderProps {
  onAddNewBlog?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNewBlog }) => {
  return (
    <header className="header">
      <div className="left">
        <FaHome size={32} onClick={()=> {window.location.reload();}} />
      </div>
      <div>
        <button onClick={onAddNewBlog} className="right">
          <FaPlus size={20} className="plus"/>
            Write a Blog...
        </button>
      </div>
    </header>
  );
};

export default Header;
