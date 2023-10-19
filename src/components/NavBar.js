import React from "react";
import { ThemeChange } from "./ThemeChange";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export const NavBar = () => {
  return (
    <div className="navbar bg-base-100 container mx-auto px-8 md:px-0">
      <div className="flex-1 gap-16">
        <h1 className="font-pattaya text-3xl">Image gallery</h1>
        <div className="form-control hidden lg:flex">
          <input
            type="text"
            placeholder="Search images here"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div>
      <div className="flex-none gap-2 hidden lg:flex">
        <button className="btn-sm btn btn-ghost">Explore</button>
        <button className="btn-sm btn btn-ghost">Collection</button>
        <button className="btn-sm btn btn-ghost">Community</button>
        <ThemeChange />
      </div>
      <div className="flex lg:hidden">
        <div>
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={() => document.getElementById("search_modal").showModal()}
          >
            <SearchIcon />
          </label>
          <dialog id="search_modal" className="modal">
            <div className="modal-box">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search images here"
                  className="input w-full"
                />
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <MenuIcon />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 gap-2 outline outline-1"
          >
            <li>
              <button className="btn-sm btn btn-ghost">Explore</button>
            </li>
            <li>
              <button className="btn-sm btn btn-ghost">Collection</button>
            </li>
            <li>
              <button className="btn-sm btn btn-ghost">Community</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
