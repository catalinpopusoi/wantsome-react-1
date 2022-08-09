import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../components";
import FiltersSection from "../components/Filters";
import JobCard from "../components/JobCard";
import { getJobs } from "../utils/http";
import { Filters, Job } from "../utils/models";

const StyledJobList = styled.section`
  display: grid;
  margin-top: ${props => props.theme.spacings.xLarge};
  grid-template-columns: repeat(3, 1fr);
  gap: 65px ${props => props.theme.spacings.medium};
  margin-bottom: 65px;
`;

const StyledButtonContainer = styled.div`
  text-align: center;
`;

export default function JobList() {
    const fullDataRef = useRef<Job[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setTimeout(() => {
            getJobs().then(jobs => {
              fullDataRef.current = jobs;
              setJobs(jobs);
            });
        }, 1000);
    }, []);

    const applyFilters = (e: any, filters: Filters) => {
      e.preventDefault();
      const filteredJobs = fullDataRef.current.filter(item => {
        return ((!filters.fullTimeOnly) || (filters.fullTimeOnly && item.contract === "Full Time"))
        && ((filters.location === '') || (filters.location.toLowerCase() === item.location.toLowerCase()))
        && ((filters.textSearch === '') || item.description.toLowerCase().includes(filters.textSearch.toLowerCase()))
      });
      setJobs(filteredJobs);
    }

    const getUniqueLocations = () => {
      const allLocations = fullDataRef.current.map(item => item.location);
      return Array.from(new Set([...allLocations]));
    }

    return (
      <>
        <FiltersSection applyFilters={applyFilters} locations={getUniqueLocations()} />
        <StyledJobList>
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </StyledJobList>
        <StyledButtonContainer>
          <Button>Load More</Button>
        </StyledButtonContainer>
      </>
    )
}