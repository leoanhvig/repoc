import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { useWeb3Auth } from "../services/web3auth";
const Drawer = ({ isOpen, setOpen }) => {
    const { logout } = useWeb3Auth();
    const navigate = useNavigate();
    function goToHome() {
        navigate("/");
    }
    function goToTransaction() {
        navigate("/transaction");
    }
    function goToContract() {
        navigate("/contract");
    }
    function goToServerSideVerification() {
        navigate("/server-side-verification");
    }
    const location = useLocation();
    function linktoGo(label, path) {
        return (React.createElement("div", { onClick: () => path(), className: "flex items-center px-4 py-2 mb-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-primary  cursor-pointer" },
            React.createElement("span", { className: "text-sm font-normal" }, label)));
    }
    function activePage(label) {
        return (React.createElement("div", { className: "flex items-center px-4 py-2 mb-2 rounded-lg bg-gray-100 text-primary  cursor-pointer" },
            React.createElement("span", { className: "text-sm font-bold" }, label)));
    }
    if (isOpen) {
        return (React.createElement("div", { className: "fixed flex w-full h-full  lg:hidden" },
            React.createElement("div", { onClick: () => setOpen(false), className: "w-full h-full bg-black/[.4]" }),
            React.createElement("div", { className: "flex right-0 flex-col justify-between h-screen p-5 bg-white w-80" },
                React.createElement("div", { className: "py-2" },
                    React.createElement("strong", { className: "px-4 block p-1 text-xs font-medium text-gray-400 uppercase" }, "MENU"),
                    React.createElement("nav", { className: "flex flex-col mt-6" },
                        location.pathname === "/" ? activePage("Main Page") : linktoGo("Main Page", goToHome),
                        location.pathname === "/transaction" ? activePage("Transactions") : linktoGo("Transactions", goToTransaction),
                        location.pathname === "/contract" ? activePage("Smart Contract Interactions") : linktoGo("Smart Contract Interactions", goToContract),
                        location.pathname === "/server-side-verification"
                            ? activePage("Server Side Verification")
                            : linktoGo("Server Side Verification", goToServerSideVerification),
                        React.createElement("div", { onClick: () => {
                                setOpen(false);
                                logout();
                            }, className: "flex items-center px-4 py-2 mb-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-primary  cursor-pointer" },
                            React.createElement("span", { className: "text-sm font-normal" }, "Disconnect")))),
                React.createElement(UserProfile, null))));
    }
    return null;
};
export default Drawer;
//# sourceMappingURL=Drawer.js.map