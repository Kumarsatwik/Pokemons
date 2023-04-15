import React from "react";
import Link from "next/link.js";
// import typeColor from "../ColorType/colors.js";
import { useState } from "react";
import Image from 'next/image';

const typeColor={
  'Grass':"bg-[#9bcc50]",
  'Poison':"bg-[#b97fc9]",
  'Fire':"bg-[#fd7d24]",
  'Water':"bg-[#4592c4]",
  'Bug':"bg-[#729f3f]",
  'Flying':"bg-[#3dc7ef]",
  'Normal':"bg-[#a4acaf]",
  'Electric':"bg-[#eed535]",
  'Ground':"bg-[#ab9842]",
  'Fairy':"bg-[#fdb9e9]",
  'Fighting':"bg-[#d56723]",
  'Psychic':"bg-[#f366b9]",
  'Rock':"bg-[#a38c21]",
  'Ghost':"bg-[#7b62a3]",
  'Dark':"bg-[#313131]",
  'Steel':"bg-[#9eb7b8]",
  'Ice':"bg-[#51c4e7]",
}


const Posts = ({ posts }={}) => {
  const [page, setPage] = useState(1);

  const selectHandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= posts?.length &&
      selectedpage != page
    )
      setPage(selectedpage);
  };

  return (
    <>
      <div className="relative sm:ml-10 md:mx-20 lg:mx-20 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 bg-white">
        {posts?.slice(page * 20 - 20, page * 20).map((data, key) => {
          return (
            <div className="m-2 w-48 h-58 hover:-translate-y-2" key={key}>
              <Link href={`/pokedex/${data?.id}`}>
                <Image
                  src={data?.image}
                  width={200}
                  height={400}
                  className="bg-gray-200 rounded"
                  id="img"
                  alt=""
                />
              </Link>

              <p className="text-xs font-medium text-gray-500">
                #{data?.number}
              </p>
              <p className="text-xl font-semibold">{data?.name}</p>
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
      {posts?.length > 0 && (
        <div className="pagination flex items-center justify-center my-5 py-5 gap-x-2">
          <button
            onClick={() => selectHandler(page - 1)}
            className={page > 1 ? "bg-blue-200 p-1" : "hidden"}
          >
            Prev
          </button>
          {[...Array(Math.ceil(posts?.length / 20))].map((_, i) => {
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
            className={page < posts?.length / 20 ? "bg-blue-200 p-1 " : "hidden"}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Posts;
