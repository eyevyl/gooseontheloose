import React from "react";
import { FaHome, FaCamera } from "react-icons/fa";
import { GiGoose } from "react-icons/gi";

const Navbar: React.FC = () => {
    return (
        <nav className="absolute z-50 bottom-0 w-[430px] flex items-center justify-between p-4">
            <div className="border bg-gray-400 rounded-full p-2">
                <a href="/">
                    <FaHome className="text-white text-3xl" />
                </a>
            </div>
            <div className="border bg-gray-400 rounded-full p-2">
                <a href="/camera">
                    <FaCamera className="text-white text-3xl" />
                </a>
            </div>
            <div className="border bg-gray-400 rounded-full p-2">
                <a href="/collection">
                    <GiGoose className="text-white text-3xl" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
