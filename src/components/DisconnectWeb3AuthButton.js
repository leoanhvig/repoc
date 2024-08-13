import React from "react";
import web3AuthLogoWhite from "../assets/web3authLogoWhite.svg";
import { useWeb3Auth } from "../services/web3auth";
const DisconnectWeb3AuthButton = () => {
    const { connected, logout } = useWeb3Auth();
    if (connected) {
        return (React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer", style: { backgroundColor: "#0364ff" }, onClick: logout },
            React.createElement("img", { src: web3AuthLogoWhite, className: "headerLogo" }),
            "Disconnect"));
    }
    return null;
};
export default DisconnectWeb3AuthButton;
//# sourceMappingURL=DisconnectWeb3AuthButton.js.map