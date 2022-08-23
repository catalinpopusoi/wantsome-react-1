import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as LocationIcon } from './icon-location.svg';
import { ReactComponent as SearchIcon } from './icon-search.svg';
import Button from "./Button";
import { Filters } from '../utils/models';
import Select from "./Select";
import Input from './Input';

const StyledFilters = styled.form`
  background-color: ${props => props.theme.colors.secondary[0]};
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding-right: 16px;
  position: sticky;
  top: 0;
  z-index: 1;

  .form-field-with-icon {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }

  .text-search {
    flex: 4;
    border-right: 1px solid ${props => props.theme.colors.secondary[2]};

    > input[type="text"] {
        flex: 1;    
    }
  }

  .location-search {
    flex: 3;
    border: none;
    border-right: 1px solid ${props => props.theme.colors.secondary[2]};

    > div {
        flex: 1;
    }
  }

  > div:last-of-type {
    flex: 2;
    padding: 0 32px;

    label {
        font-weight: 700;
        margin-left: 8px;
    }
  }

  > button {
    flex: 1;
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
            <div className="form-field-with-icon text-search">
                <SearchIcon />
                <Input
                    type="text"
                    placeholder="Filter by title, companies, expertise..."
                    value={filters.textSearch}
                    onChange={handleFilterChange}
                    name="textSearch"
                />
            </div>
            <div className="form-field-with-icon location-search">
                <LocationIcon />
                <Select options={locations} placeholder="Filter by location..." emitSelectedValues={handleLocationValues} />
            </div>
            <div>
                <Input
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