import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Job } from "../utils/models";

interface JobCardProps {
    job: Job;
}

const StyledJobCard = styled.article`
    ${props => {
        const { colors, spacings } = props.theme;

        return css`
            background-color: ${colors.secondary[0]};
            border-radius: 6px;
            padding: ${spacings.large} ${spacings.medium} ${spacings.medium};
            position: relative;

            div {
                width: 50px;
                height: 50px;
                border-radius: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: -25px;
                left: ${spacings.medium};
            }

            p:first-of-type, h3 {
                margin-bottom: ${spacings.small};
            }

            p:last-of-type {
                margin-bottom: ${spacings.large};
            }

            a {
                color: ${colors.primary[2]};
                text-decoration: none;

                h3 {
                    display: inline-block;
                }

                &:hover {
                    color: ${colors.secondary[3]};
                }
            }
        `;
    }}
`;

export default function JobCard({ job }: JobCardProps) {
    return (
        <StyledJobCard>
            <div style={{ backgroundColor: job.logoBackground }}>
                <img src={job.logo} alt={`${job.company} logo`} />
            </div>
            <p>{job.postedAt} - {job.contract}</p>
            <Link to={`/job/${job.id}`}>
                <h3>
                    {job.position}
                </h3>
            </Link>
            <p>{job.company}</p>
            <h4>{job.location}</h4>
        </StyledJobCard>
    )
}