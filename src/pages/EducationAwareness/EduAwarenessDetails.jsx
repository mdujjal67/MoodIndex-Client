import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const EduAwarenessDetails = () => {
  const eduPosts = useLoaderData(); // loader provides the blog directly
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-2">{eduPosts.title}</h1>
      <p className="text-xs text-gray-600 mb-4">
        {eduPosts.date || "June 1, 2025"} • {eduPosts.readCount}
      </p>
      <img
        src={eduPosts.image}
        alt={eduPosts.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      {/* <p className="text-gray-700 mb-4">{blog.shortDescription}</p> */}
      <p className="text-gray-700">{eduPosts.fullDescription || eduPosts.shortDescription}</p>
      <button
        onClick={() => navigate("/education-awareness")}
        className="mt-6 text-white bg-[#1BA9B5] px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
      >
        Back to Blogs
      </button>
    </section>
  );
};

export default EduAwarenessDetails;
