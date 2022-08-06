import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../components";
import JobCard from "../components/JobCard";
import { getJobs } from "../utils/http";
import { Job } from "../utils/models";

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
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setTimeout(() => {
            getJobs().then(jobs => setJobs(jobs.slice(0, 6)));
        }, 1000);
    }, []);

    return (
      <>
        <StyledJobList>
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </StyledJobList>
        <StyledButtonContainer>
          <Button>Load More</Button>
        </StyledButtonContainer>
      </>
    )
}