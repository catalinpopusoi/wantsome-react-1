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

const MAX_ITEMS_PER_CHUNK = 6;

export default function JobList() {
    const fullDataRef = useRef<Job[]>([]);
    const [chunkStart, setChunkStart] = useState(0);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setTimeout(() => {
            getJobs().then(jobs => {
              fullDataRef.current = jobs;
              setJobs(jobs.slice(chunkStart, MAX_ITEMS_PER_CHUNK));
              setChunkStart(MAX_ITEMS_PER_CHUNK);
            });
        }, 1000);

        return () => {
          setJobs([]);
          setChunkStart(0);
        }
    }, []);

    const loadMore = () => {
      setJobs(currentJobs => [...currentJobs, ...fullDataRef.current.slice(chunkStart, chunkStart + MAX_ITEMS_PER_CHUNK)]);
      setChunkStart(chunkStart => chunkStart + MAX_ITEMS_PER_CHUNK);
    }

    const applyFilters = (e: any, filters: Filters) => {
      e.preventDefault();
      const filteredJobs = fullDataRef.current.filter(job => {
        return ((!filters.fullTimeOnly) || (filters.fullTimeOnly && job.contract === "Full Time"))
        && ((filters.location.length === 0) || (filters.location.includes(job.location)))
        && ((filters.textSearch === '') || job.description.toLowerCase().includes(filters.textSearch.toLowerCase()))
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
        {
          // jobs.length !== fullDataRef.current.length && (
          chunkStart < fullDataRef.current.length && (
            <StyledButtonContainer>
              <Button onClick={loadMore}>Load More</Button>
            </StyledButtonContainer>
          )
        }
      </>
    )
}