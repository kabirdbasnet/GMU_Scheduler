import React, { useRef } from 'react';
import './style.css';
import { useMajor } from './/../../UserContexts/MajorContext';  // Path might change based on your folder structure

const MajorSelection = ({ onChange }) => {
    const { selectedMajor, setSelectedMajor } = useMajor();
    const selectRef = useRef();

    const handleTriangleClick = () => {
        if (selectRef.current) {
            selectRef.current.click();
        }
    };

    const handleDropdownChange = (event) => {
        setSelectedMajor(event.target.value);
        onChange(event);
    };

    const containerClass = selectedMajor ? 'custom-button container-yellow' : 'custom-button container-white';
    const buttonTextClass = selectedMajor ? 'button-text filled-text' : 'button-text white-text';

    return (
        <div className={containerClass}>
            <select
                className={buttonTextClass}
                value={selectedMajor}
                onChange={handleDropdownChange}
                ref={selectRef}
            >
                <option value="" disabled>UNDERGRADUATE MAJOR</option>
                <option value="electrical">ELECTRICAL ENGINEERING</option>
                <option value="computer">COMPUTER ENGINEERING</option>
            </select>
            <span className="triangle-container" onClick={handleTriangleClick}>
                <div className="triangle"></div>
            </span>
        </div>
    );
}

export default MajorSelection;
