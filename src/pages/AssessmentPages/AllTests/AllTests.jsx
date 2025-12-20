// src/components/AllTests.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const AllTests = ({ allTest: propData }) => {
  
  useEffect((() => {
          document.title = "MoodIndex | Assessments"
      }), []);

  const loaderData = useLoaderData(); // Always call the hook
  const allTest = propData || loaderData;

  const [openTestId, setOpenTestId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const toggleTest = (id) => setOpenTestId(openTestId === id ? null : id);

  const filteredTests = allTest.filter((test) => {
    const matchesCategory = categoryFilter === "All" || test.category === categoryFilter;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;

    
  });
  // useEffect(() => {
  //       if (allTest?.title) {
  //           document.title = `MoodIndex | ${allTest.title}`;
  //       }
  //   }, [allTest]);

  const categories = ["All", ...new Set(allTest.map((t) => t.category))];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-8 py-3 bg-[#1BA9B5] text-white rounded-full text-lg font-semibold tracking-wide shadow-xl">
            TRY THE UNIVERSAL MENTAL HEALTH SCREEN
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#1BA9B5]"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#1BA9B5]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => {
            const isOpen = test.id === openTestId;
            const baseBg = "bg-[#1e88e5] text-white";
            const expandedBg = "bg-[#e0f7fa] text-gray-900";

            return (
              <div
                key={test.id}
                tabIndex={0} // keyboard focus
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleTest(test.id);
                  }
                }}
                onClick={() => toggleTest(test.id)}
                className={`relative p-4 rounded-xl shadow-md cursor-pointer transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1 focus:outline-none hover:text-white hover:bg-[#1BA9B5] ${isOpen ? expandedBg : baseBg
                  }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center font-bold text-lg">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{test.icon}</span>
                    {test.title}
                  </span>
                  <span className="text-2xl">
                    {isOpen ? <XCircleIcon className="w-6 h-6" /> : <PlusCircleIcon className="w-6 h-6" />}
                  </span>
                </div>

                {/* Expandable Content with smooth slide */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out mt-4 ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                  <p className="mb-4 text-sm">{test.description}</p>
                  <NavLink
                    to={test.link}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block font-sans px-4 py-2 bg-[#1e88e5] text-white rounded-lg hover:bg-gray-500 hover:text-white transition duration-300 shadow-md "
                  >
                    Take Test
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllTests;
