import React, { useState } from "react";
import { useWeb3Auth } from "../services/web3auth";
const Dropdown = ({ options, rounded, label, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0] || "");
    let classSelect;
    if (rounded) {
        classSelect = "w-full pl-4	pr-12 text-sm border-gray-200 rounded-full z-0";
    }
    else {
        classSelect = "w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm z-0";
    }
    const { switchChain } = useWeb3Auth();
    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        switchChain(value);
        if (onChange)
            onChange(value);
    };
    return (React.createElement("div", null,
        label ? React.createElement("label", { className: "text-sm font-medium" }, label) : null,
        React.createElement("select", { value: selectedOption, onChange: handleChange, className: classSelect }, options.map((option) => (React.createElement("option", { key: option, value: option }, option))))));
};
export default Dropdown;
//# sourceMappingURL=DropDown.js.map