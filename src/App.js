import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contract from "./pages/Contract";
import HomePage from "./pages/HomePage";
// import NFT from "./pages/NFT";
import ServerSideVerification from "./pages/ServerSideVerification";
import Transaction from "./pages/Transaction";
import { Web3AuthProvider } from "./services/web3auth";
function App() {
    return (React.createElement("div", null,
        React.createElement(Web3AuthProvider, null,
            React.createElement(BrowserRouter, null,
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/" },
                        React.createElement(Route, { index: true, element: React.createElement(HomePage, null) }),
                        React.createElement(Route, { path: "contract", element: React.createElement(Contract, null) }),
                        React.createElement(Route, { path: "transaction", element: React.createElement(Transaction, null) }),
                        React.createElement(Route, { path: "server-side-verification", element: React.createElement(ServerSideVerification, null) })))))));
}
export default App;
//# sourceMappingURL=App.js.map