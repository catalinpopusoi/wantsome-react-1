import { useRef, useState } from "react";
import styled from "styled-components";

interface SelectProps {
    options: string[];
    placeholder: string;
}

const StyledSelect = styled.div`
    position: relative;

    input[type="text"] {
        display: block;
        width: 100%;
    }

    > input {
        height: 80px;
    }

    section {
        position: absolute;
        top: 85px;
        border: 1px solid black;
        padding: 5px 5px 0;
        background-color: white;
        width: 100%;
        z-index: 1;
    }

    ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 0;

        li {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px 10px;
            cursor: pointer;

            &:hover {
                background-color: ${props => props.theme.colors.secondary[1]};
            }

            &:not(:last-child) {
                border-bottom: 1px solid black;
            }

            input {
                margin: 0;
            }
        }
    }
`;

export default function Select({ options, placeholder }: SelectProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const openDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTimeout(() => searchRef.current?.focus(), 0);
    }

    const handleOptionClick = (option: string) => {
        if (selectedValues.includes(option)) {
            setSelectedValues(currentValues => currentValues.filter(value => value !== option));
        } else {
            setSelectedValues(currentValues => [...currentValues, option]);
        }
    }

    return (
        <StyledSelect>
            <input type="text" placeholder={placeholder} readOnly value={selectedValues.join(', ')} onClick={openDropdown} />
            {
                isDropdownVisible && (
                    <section>
                        <input ref={searchRef} type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
                        <ul>
                            {options.map(option => {
                                return (
                                    <li key={option} role="option" onClick={() => handleOptionClick(option)}>
                                        <input id={option} type="checkbox" checked={selectedValues.includes(option)} />
                                        <label htmlFor={option}>{option}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )
            }
        </StyledSelect>
    );
}