import React from "react";
import Link from "next/link.js";
import typeColor from "../ColorType/colors.js";
import { useState, useEffect } from "react";

const Posts = ({ posts }) => {
  const [page, setPage] = useState(1);
  // console.log(posts.length / 10);

  const selectHandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= posts.length &&
      selectedpage != page
    )
      setPage(selectedpage);
  };

  return (
    <>
      <div className="relative sm:ml-10 md:mx-20 lg:mx-20 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 bg-white">
        {posts.slice(page * 20 - 20, page * 20).map((data, key) => {
          return (
            <div className="m-2 w-48 h-58 hover:-translate-y-2" key={key}>
              <Link href={`/pokedex/${data.id}`}>
                <img
                  src={data.image}
                  className="w-full h-44 bg-gray-200 rounded"
                  id="img"
                  alt=""
                />
              </Link>

              <p className="text-xs font-medium text-gray-500">
                #{data.number}
              </p>
              <p className="text-xl font-semibold">{data.name}</p>
              <div className="flex gap-x-4">
                {data.types.map((type,index) => {
                  return (
                    <p key={index} className={`text-xs px-2 rounded ${typeColor[type]}`}>
                      {type}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {posts.length > 0 && (
        <div className="pagination flex items-center justify-center my-5 py-5 gap-x-2">
          <button
            onClick={() => selectHandler(page - 1)}
            className={page > 1 ? "bg-blue-200 p-1" : "hidden"}
          >
            Prev
          </button>
          {[...Array(Math.ceil(posts.length / 20))].map((_, i) => {
            return (
              <span
                className={
                  page == i + 1
                    ? "bg-gray-300 border border-gray-300 px-1 cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => selectHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <button
            onClick={() => selectHandler(page + 1)}
            className={page < posts.length / 20 ? "bg-blue-200 p-1 " : "hidden"}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Posts;
