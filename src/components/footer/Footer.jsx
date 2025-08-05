// src/components/Footer.jsx
import { useState } from "react";

const Footer = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gray-100 text-gray-700 px-4 py-2 text-sm flex justify-between items-center">
      <span>
        📢 Follow us on Twitter @ProductBasket for updates and offers.
      </span>
      <button
        className="ml-4 text-gray-600 hover:text-gray-800"
        onClick={() => setVisible(false)}
        aria-label="close footer"
      >
        ✖
      </button>
    </div>
  );
};

export default Footer;
