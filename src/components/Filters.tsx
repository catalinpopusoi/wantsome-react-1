import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Filters } from '../utils/models';
import Select from "./Select";

const StyledFilters = styled.form`
  background-color: ${props => props.theme.colors.secondary[0]};
  display: flex;
  align-items: center;

  > * {
    flex: 1;
  }

  > input[type="text"] {
    height: 80px;
  }
`;

interface FiltersProps {
    applyFilters: (event: React.FormEvent, filters: Filters) => void,
    locations: string[]
}

export default function FiltersSection({ applyFilters, locations }: FiltersProps) {
    const [filters, setFilters] = useState<Filters>({
        textSearch: '',
        location: [],
        fullTimeOnly: false
    });

    const handleFilterChange = (e: any) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }));
    }

    const handleLocationValues = (locations: string[]) => {
        setFilters(currentFilters => ({
            ...currentFilters,
            location: locations
        }));
    }

    return (
        <StyledFilters onSubmit={e => applyFilters(e, filters)}>
            <input
                type="text"
                placeholder="Filter by title, companies, expertise..."
                value={filters.textSearch}
                onChange={handleFilterChange}
                name="textSearch"
            />
            <Select options={locations} placeholder="Filter by location..." emitSelectedValues={handleLocationValues} />
            <div>
                <input
                    type="checkbox"
                    id="full-time-only"
                    checked={filters.fullTimeOnly}
                    onChange={handleFilterChange}
                    name="fullTimeOnly"
                />
                <label htmlFor="full-time-only">Full time only</label>
            </div>
            <Button>Search</Button>
        </StyledFilters>
    )
}