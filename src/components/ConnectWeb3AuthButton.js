import React from "react";
import Auth0Logo from "../assets/auth0Logo.png";
import FacebookLogo from "../assets/facebookLogo.png";
import GitHubLogo from "../assets/githubLogo.png";
import GoogleLogo from "../assets/googleLogo.png";
import { useWeb3Auth } from "../services/web3auth";
const ConnectWeb3AuthButton = () => {
    const { connected, loginGoogle, loginFacebook, loginAuth0, loginGitHub } = useWeb3Auth();
    if (connected) {
        return null;
    }
    return (React.createElement("div", { className: "flex flex-col items-center justify-center space-y-5" },
        React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-start align-center cursor-pointer w-full", style: { backgroundColor: "#DB4437" }, onClick: loginGoogle },
            React.createElement("img", { src: GoogleLogo, className: "headerLogo" }),
            "Login via Google"),
        React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-start align-center cursor-pointer w-full", style: { backgroundColor: "#3b5998" }, onClick: loginFacebook },
            React.createElement("img", { src: FacebookLogo, className: "headerLogo" }),
            "Login via Facebook"),
        React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-start align-center cursor-pointer w-full", style: { backgroundColor: "#1f2328" }, onClick: loginGitHub },
            React.createElement("img", { src: GitHubLogo, className: "headerLogo" }),
            "Login via GitHub"),
        React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-start align-center cursor-pointer w-full", style: { backgroundColor: "#eb5424" }, onClick: loginAuth0 },
            React.createElement("img", { src: Auth0Logo, className: "headerLogo" }),
            "Login via Auth0")));
};
export default ConnectWeb3AuthButton;
//# sourceMappingURL=ConnectWeb3AuthButton.js.map