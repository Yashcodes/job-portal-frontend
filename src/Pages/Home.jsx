import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Home/Banner";
import Card from "../components/Cards/Card";
import Jobs from "./Jobs";
import Sidebar from "../components/Sidebar/Sidebar";

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);

    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio based filtering
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Button based filtering
  const handleClick = (e) => {
    selectedCategory(e.target.value);
  };

  // Main functions
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    // Category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          Number(maxPrice) <= Number(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredData);
    }

    return filteredJobs.map((data, index) => <Card key={index} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <Layout>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main Job Content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* Left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Job cards */}
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="bg-white p-4 rounded">Right</div>
      </div>
    </Layout>
  );
};

export default Home;
