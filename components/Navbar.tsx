"use client";

import React from "react";
import { FaHome, FaCamera } from "react-icons/fa";
import { GiGoose } from "react-icons/gi";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <nav className="absolute z-50 bottom-0 w-[430px] flex items-center justify-between p-8">
            <motion.a
                href="/"
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 1 }}
                className="cursor-pointer"
            >
                <div className="bg-cyan-400 duration-300 ease-in-out hover:bg-cyan-500 rounded-full p-3 shadow-lg">
                    <FaHome className="text-white text-3xl" />
                </div>
            </motion.a>
            <motion.a
                href="/camera"
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 1 }}
                className="cursor-pointer"
            >
                <div className=" bg-cyan-400 duration-300 ease-in-out hover:bg-cyan-500 rounded-full p-3 shadow-lg">
                    <FaCamera className="text-white text-3xl" />
                </div>
            </motion.a>
            <motion.a
                href="/collection"
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 1 }}
                className="cursor-pointer"
            >
                <div className=" bg-cyan-400 duration-300 ease-in-out hover:bg-cyan-500 rounded-full p-3 shadow-lg">
                    <GiGoose className="text-white text-3xl" />
                </div>
            </motion.a>
        </nav>
    );
};

export default Navbar;
