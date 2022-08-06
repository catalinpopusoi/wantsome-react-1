import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled, { css } from "styled-components";
import { Button } from "../components";
import { getJobById } from "../utils/http";
import { Job } from "../utils/models";

const StyledCompanyInfo = styled.section`
    ${props => {
        const { colors, spacings } = props.theme;

        return css`
            background-color: ${colors.secondary[0]};
            display: flex;
            align-items: center;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: ${spacings.medium};

            div {
                &:first-child {
                    height: 140px;
                    width: 140px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                &:last-child {
                    padding: ${spacings.medium};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex: 1;
                }
            }
        `;
    }}
`;

const StyledJobDescription = styled.section`
    ${props => {
        const { spacings, colors } = props.theme;

        return css`
            padding: ${spacings.large};
            background-color: ${colors.secondary[0]};
            border-radius: 6px;

            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: ${spacings.large};

                h1 {
                    margin: ${spacings.xSmall} 0;
                }
            }

            h3 {
                margin-top: ${spacings.large};
                margin-bottom: ${spacings.medium};
            }

            li::marker {
                color: ${colors.primary[0]};
            }

            ol li::marker {
                font-weight: 700;
            }
        `;
    }}
`;

export default function JobDetails() {
    const params = useParams();
    const { jobId = 0 } = params;
    const [job, setJob] = useState<Job | null>(null);

    useEffect(() => {
        getJobById(+jobId).then(job => setJob(job));
    }, []);

    if (!job) return null;
    
    return (
        <>
            <StyledCompanyInfo>
                <div style={{ backgroundColor: job.logoBackground }}>
                    <img src={`/${job.logo}`} alt={`${job.company} logo`} />
                </div>
                <div>
                    <h2>{job.company}</h2>
                    <Button>Company site</Button>
                </div>
            </StyledCompanyInfo>
            <StyledJobDescription>
                <header>
                    <div>
                        <p>{job.postedAt} - {job.contract}</p>
                        <h1>
                            {job.position}
                        </h1>
                        <h4>{job.location}</h4>
                    </div>
                    <Button>Apply Now</Button>
                </header>
                <p>{job.description}</p>
                <h3>Requirements</h3>
                <p>{job.requirements.content}</p>
                <ul>
                    {job.requirements.items.map(item => <li>{item}</li>)}
                </ul>
                <h3>What You Will Do</h3>
                <p>{job.role.content}</p>
                <ol>
                    {job.role.items.map(item => <li>{item}</li>)}
                </ol>
            </StyledJobDescription>
        </>
    )
}