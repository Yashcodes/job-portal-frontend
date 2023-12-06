import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Home/Banner";
import Card from "../components/Cards/Card";
import Jobs from "./Jobs";

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio based filtering
  const handleChnage = (e) => {
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
      <div>
        <Jobs result={result} />
      </div>
    </Layout>
  );
};

export default Home;
