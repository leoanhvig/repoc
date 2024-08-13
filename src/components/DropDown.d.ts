import { FC } from "react";
interface DropdownProps {
    options: string[];
    rounded?: boolean;
    label?: string;
    onChange?: (value: string) => void;
}
declare const Dropdown: FC<DropdownProps>;
export default Dropdown;
