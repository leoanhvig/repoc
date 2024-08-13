import React from "react";
import ConnectWeb3AuthButton from "./ConnectWeb3AuthButton";
import SourceCode from "./SourceCode";
const NotConnectedPage = () => {
    return (React.createElement("div", { className: "w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center overflow-scroll p-4" },
        React.createElement("div", { className: "max-w-md mx-auto mt-4 text-center text-gray-500" },
            React.createElement(ConnectWeb3AuthButton, null)),
        React.createElement(SourceCode, null)));
};
export default NotConnectedPage;
//# sourceMappingURL=NotConnectedPage.js.map