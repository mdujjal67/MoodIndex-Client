import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogs from "../../../public/Json files/blogs.json"; // same data file

const BlogDetail = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id.toString() === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Blog not found.</p>
        <button onClick={() => navigate("/blogs")} className="ml-4 text-white bg-[#1BA9B5] px-4 py-2 rounded hover:bg-gray-500">
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-xs text-gray-600 mb-4">{blog.date || "June 1, 2025"} • {blog.readCount}</p>
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
      <p className="text-gray-700 mb-4">{blog.shortDescription}</p>
      <p className="text-gray-700">{blog.longDescription || blog.shortDescription}</p>
      <button onClick={() => navigate("/blogs")} className="mt-6 text-white bg-[#1BA9B5] px-4 py-2 rounded hover:bg-gray-500">
        Back to Blogs
      </button>
    </section>
  );
};

export default BlogDetail;