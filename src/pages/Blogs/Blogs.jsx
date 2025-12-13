import React, { useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

const Blogs = ({ data: propData, isHome }) => {
  const navigate = useNavigate();
  const loaderData = useLoaderData(); // ALWAYS call the hook

  const data = propData || loaderData; // then decide which data to use

  // dynamic title
      useEffect((() => {
          document.title = "MoodIndex | Blogs"
      }), []);

  return (
    <section className="w-full py-6 sm:py-12 dark:bg-gray-100 mt-20 dark:text-gray-800">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="font-serif text-4xl font-bold">Latest Articles</h2>
          <p className="text-sm dark:text-gray-600">
            Explore our latest blogs on mental health, wellbeing, and lifestyle tips.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-14 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ">
          {data.map((blog) => (
            <article
              key={blog.id}
              className="flex flex-col dark:bg-gray-50 shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2"
            >
              <a aria-label={blog.title}>
                <img
                  alt={blog.title}
                  src={blog.image}
                  className="object-cover w-full h-40 dark:bg-gray-500"
                />
              </a>
              <div className="flex flex-col flex-1 p-4">
                <a
                  href={blog.link}
                  className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
                >
                  {blog.category}
                </a>
                <h3 className="flex-1 py-1 text-lg font-semibold leading-snug font-serif">
                  {blog.title}
                </h3>
                <p className="text-gray-700 mb-2 line-clamp-3 font-sans">
                  {blog.shortDescription}
                </p>
                <div className="flex flex-wrap justify-between pt-2 space-x-2 text-xs dark:text-gray-600">
                  <span>{blog.date || "June 1, 2025"}</span>
                  <span>{blog.readCount}</span>
                </div>
                <div className="mt-2">
                  <button
                    title={`Read more about: ${blog.title}`}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="btn btn-sm text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* Empty "More Blogs" card shows only on Home page */}
          {isHome && (
            <article className="flex flex-col dark:bg-gray-100 shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2 items-center justify-center p-6 text-center">
              <div className="flex flex-col flex-1 justify-center items-center space-y-4">
                <h3 className="text-lg font-semibold leading-snug font-serif">
                  More Blogs
                </h3>
                <p className="text-gray-600 font-sans">
                  Explore all our articles on mental health, wellbeing, and lifestyle.
                </p>
                <button
                title="Click to see all blogs"
                  onClick={() => navigate("/blogs")}
                  className="btn btn-sm text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white"
                >
                  See All Blogs
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
