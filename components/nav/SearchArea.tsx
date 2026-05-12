import React from "react";
import { BiSearch } from "react-icons/bi";


const SearchArea = () => {
    return (
        <form className="w-full">
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-500 rounded-full"
                    placeholder="I'm shopping for..."
                    required
                />
                <button
                    type="submit"
                    className="absolute right-1.5 bottom-1.5 bg-secondary font-medium rounded-full text-sm p-2.5"
                >
                    <BiSearch className="text-white" />
                </button>
            </div>
        </form>
    );
};

export default SearchArea;
