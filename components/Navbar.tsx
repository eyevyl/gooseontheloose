import React from "react";
import { FaHome, FaCamera } from "react-icons/fa";
import { GiGoose } from "react-icons/gi";

const Navbar: React.FC = () => {
    return (
        <nav className="absolute z-50 bottom-0 w-[430px] flex items-center justify-between p-4">
            <a href="/">
                <div className="border bg-gray-400 rounded-full p-2">
                    <FaHome className="text-white text-3xl" />
                </div>
            </a>
            <a href="/camera">
                <div className="border bg-gray-400 rounded-full p-2">
                    <FaCamera className="text-white text-3xl" />
                </div>
            </a>
            <a href="/collection">
                <div className="border bg-gray-400 rounded-full p-2">
                    <GiGoose className="text-white text-3xl" />
                </div>
            </a>
        </nav>
    );
};

export default Navbar;
