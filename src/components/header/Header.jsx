import { useState } from "react";

const Header =() =>{
    const [visible, setVisible] = useState(true);
    
    if (!visible) return null;

    return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm flex justify-between items-center">
      <span>
        🚨 Important notice: System maintenance tonight at 11:00 PM.
      </span>
      <button
        className="ml-4 text-yellow-700 hover:text-yellow-900"
        onClick={() => setVisible(false)}
      >
        ✖
      </button>
    </div>
  );
}

export default Header;