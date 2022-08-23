import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "./Input";

interface SelectProps {
    options: string[];
    placeholder: string;
    emitSelectedValues: (values: string[]) => void;
}

const StyledSelect = styled.div`
    position: relative;

    input[type="text"] {
        display: block;
        width: 100%;
    }

    section {
        position: absolute;
        top: 85px;
        border: 1px solid black;
        padding: 5px 5px 0;
        background-color: ${props => props.theme.colors.secondary[0]};
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

            input, label {
                pointer-events: none;
            }
        }
    }
`;

export default function Select({ options, placeholder, emitSelectedValues }: SelectProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const toggleDropdown = useCallback(() => {
        emitSelectedValues(selectedValues);
        setIsDropdownVisible(!isDropdownVisible);
        setTimeout(() => searchRef.current?.focus(), 0);
    }, [isDropdownVisible, selectedValues]);

    const checkIfClickOutsideDropdown = useCallback((e: Event) => {
        const isClickOnSelect = e.target === selectRef.current;
        const isClickInsideSection = sectionRef.current?.contains(e.target as Node);

        if (isClickOnSelect) return;

        if (isDropdownVisible && !isClickInsideSection) {
            toggleDropdown();
        }
    }, [isDropdownVisible, toggleDropdown]);

    useEffect(() => {
        document.body.addEventListener('click', checkIfClickOutsideDropdown);

        return () => {
            document.body.removeEventListener('click', checkIfClickOutsideDropdown);
        }
    }, [checkIfClickOutsideDropdown]);

    const handleOptionClick = (option: string) => {
        if (selectedValues.includes(option)) {
            setSelectedValues(currentValues => currentValues.filter(value => value !== option));
        } else {
            setSelectedValues(currentValues => [...currentValues, option]);
        }
    }

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <StyledSelect>
            <>
                <Input ref={selectRef} type="text" placeholder={placeholder} readOnly value={selectedValues.join(', ')} onClick={toggleDropdown} />
                {
                    isDropdownVisible && (
                        <section ref={sectionRef}>
                            <Input variation="small" ref={searchRef} type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Filter by country..." />
                            <ul>
                                {filteredOptions.map(option => (
                                    <li key={option} role="option" onClick={() => handleOptionClick(option)}>
                                        <Input id={option} type="checkbox" checked={selectedValues.includes(option)} readOnly />
                                        <label htmlFor={option}>{option}</label>
                                    </li>
                                ))}
                                {filteredOptions.length === 0 && <li>No options match your search</li>}
                            </ul>
                        </section>
                    )
                }
            </>
        </StyledSelect>
    );
}