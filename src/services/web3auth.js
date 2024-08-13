import { getPublicCompressed } from "@toruslabs/eccrypto";
import { UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import * as jose from "jose";
import * as React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { chain } from "../config/chainConfig";
import { getWalletProvider } from "./walletProvider";
export const Web3AuthContext = createContext({
    web3Auth: null,
    provider: null,
    isLoading: false,
    connected: false,
    user: null,
    address: null,
    balance: null,
    chainId: null,
    playgroundConsole: "",
    connectedChain: chain["Sepolia Testnet"],
    loginAuth0: async () => null,
    loginGoogle: async () => null,
    loginGitHub: async () => null,
    loginFacebook: async () => null,
    logout: async () => { },
    getUserInfo: async () => null,
    getAddress: async () => "",
    getBalance: async () => "",
    getSignature: async () => "",
    sendTransaction: async () => "",
    getPrivateKey: async () => "",
    getChainId: async () => "",
    deployContract: async () => { },
    readContract: async () => "",
    writeContract: async () => "",
    verifyServerSide: async () => { },
    switchChain: async () => null,
    updateConnectedChain: () => { },
});
export function useWeb3Auth() {
    return useContext(Web3AuthContext);
}
export const Web3AuthProvider = ({ children }) => {
    const [web3Auth, setWeb3Auth] = useState(null);
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [playgroundConsole, setPlaygroundConsole] = useState("");
    const [chainId, setChainId] = useState(null);
    const [connectedChain, setConnectedChain] = useState(chain["Sepolia Testnet"]);
    const [connected, setConnected] = useState(false);
    const uiConsole = (...args) => {
        setPlaygroundConsole(`${JSON.stringify(args || {}, null, 2)}\n\n\n\n${playgroundConsole}`);
        console.log(...args);
    };
    const setWalletProvider = useCallback(async (web3authProvider) => {
        const walletProvider = getWalletProvider(web3authProvider, uiConsole);
        setProvider(walletProvider);
        setAddress(await walletProvider.getAddress());
        setBalance(await walletProvider.getBalance());
        setChainId(await walletProvider.getChainId());
    }, []);
    useEffect(() => {
        async function init() {
            try {
                setIsLoading(true);
                const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
                const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig: chain["Sepolia Testnet"] } });
                const web3AuthInstance = new Web3AuthNoModal({
                    clientId,
                    privateKeyProvider,
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
                });
                const openloginAdapter = new OpenloginAdapter({
                    privateKeyProvider,
                    loginSettings: {
                        mfaLevel: "optional",
                    },
                    adapterSettings: {
                        clientId,
                        uxMode: UX_MODE.REDIRECT,
                        loginConfig: {
                            auth0: {
                                verifier: "aggregate-sapphire",
                                verifierSubIdentifier: "w3a-a0-email-passwordless",
                                typeOfLogin: "jwt",
                                clientId: "QiEf8qZ9IoasbZsbHvjKZku4LdnRC1Ct",
                            },
                            facebook: {
                                verifier: "aggregate-sapphire",
                                verifierSubIdentifier: "w3a-facebook",
                                typeOfLogin: "facebook",
                                clientId: "1222658941886084",
                            },
                            github: {
                                verifier: "aggregate-sapphire",
                                verifierSubIdentifier: "w3a-a0-github",
                                typeOfLogin: "jwt",
                                clientId: "hiLqaop0amgzCC0AXo4w0rrG9abuJTdu",
                            },
                        },
                        mfaSettings: {
                            deviceShareFactor: {
                                enable: true,
                                priority: 1,
                                mandatory: true,
                            },
                            backUpShareFactor: {
                                enable: true,
                                priority: 2,
                                mandatory: true,
                            },
                            socialBackupFactor: {
                                enable: true,
                                priority: 3,
                                mandatory: true,
                            },
                            passwordFactor: {
                                enable: true,
                                priority: 4,
                                mandatory: true,
                            },
                        },
                    },
                });
                web3AuthInstance.configureAdapter(openloginAdapter);
                await web3AuthInstance.init();
                if (web3AuthInstance.status === "connected") {
                    setWalletProvider(web3AuthInstance.provider);
                    setUser(await web3AuthInstance.getUserInfo());
                    setConnected(true);
                }
                setWeb3Auth(web3AuthInstance);
            }
            catch (error) {
                uiConsole(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        init();
    }, [setWalletProvider]);
    const loginGoogle = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return;
        }
        await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "google",
        });
        if (web3Auth.status === "connected") {
            setWalletProvider(web3Auth.provider);
            setUser(await web3Auth.getUserInfo());
            setConnected(true);
        }
    };
    const loginAuth0 = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return;
        }
        await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "auth0",
            extraLoginOptions: {
                domain: "https://web3auth.au.auth0.com",
                verifierIdField: "email",
            },
        });
        if (web3Auth.status === "connected") {
            setWalletProvider(web3Auth.provider);
            setUser(await web3Auth.getUserInfo());
            setConnected(true);
        }
    };
    const loginGitHub = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return;
        }
        await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "github",
            extraLoginOptions: {
                domain: "https://web3auth.au.auth0.com",
                verifierIdField: "email",
            },
        });
        if (web3Auth.status === "connected") {
            setWalletProvider(web3Auth.provider);
            setUser(await web3Auth.getUserInfo());
            setConnected(true);
        }
    };
    const loginFacebook = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return;
        }
        await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "facebook",
        });
        if (web3Auth.status === "connected") {
            setWalletProvider(web3Auth.provider);
            setUser(await web3Auth.getUserInfo());
            setConnected(true);
        }
    };
    const logout = async () => {
        uiConsole("Logging out");
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            uiConsole("web3auth not initialized yet");
            return;
        }
        await web3Auth.logout();
        setProvider(null);
        setConnected(false);
    };
    const getUserInfo = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return;
        }
        const userInfo = await web3Auth.getUserInfo();
        setUser(userInfo);
        uiConsole(userInfo);
        return userInfo;
    };
    const getAddress = async () => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return "";
        }
        const updatedAddress = await provider.getAddress();
        setAddress(updatedAddress);
        uiConsole(updatedAddress);
        return address;
    };
    const getBalance = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return "";
        }
        const updatedBalance = await provider.getBalance();
        setBalance(updatedBalance);
        uiConsole(updatedBalance);
        return balance;
    };
    const getSignature = async (message) => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return "";
        }
        const signature = await provider.getSignature(message);
        uiConsole(signature);
        return signature;
    };
    const sendTransaction = async (amount, destination) => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return "";
        }
        const receipt = await provider.sendTransaction(amount, destination);
        uiConsole(receipt);
        return receipt;
    };
    const getPrivateKey = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return "";
        }
        const privateKey = await provider.getPrivateKey();
        uiConsole("Private Key: ", privateKey);
        return privateKey;
    };
    const getChainId = async () => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return "";
        }
        await provider.getChainId();
    };
    const deployContract = async (abi, bytecode, initValue) => {
        if (!web3Auth) {
            uiConsole("web3auth not initialized yet");
            return;
        }
        const receipt = await provider.deployContract(abi, bytecode, initValue);
        return receipt;
    };
    const readContract = async (contractAddress, contractABI) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const message = await provider.readContract(contractAddress, contractABI);
        uiConsole(message);
    };
    const writeContract = async (contractAddress, contractABI, updatedValue) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const receipt = await provider.writeContract(contractAddress, contractABI, updatedValue);
        uiConsole(receipt);
        if (receipt) {
            setTimeout(async () => {
                await readContract(contractAddress, contractABI);
            }, 2000);
        }
    };
    const parseToken = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64 || ""));
        }
        catch (err) {
            console.error(err);
            return null;
        }
    };
    const verifyServerSide = async (idTokenInFrontend) => {
        try {
            if (!provider) {
                uiConsole("provider not initialized yet");
                return;
            }
            const privKey = await web3Auth.provider?.request({
                method: "eth_private_key",
            });
            const pubkey = getPublicCompressed(Buffer.from(privKey, "hex")).toString("hex");
            const jwks = jose.createRemoteJWKSet(new URL("https://api.openlogin.com/jwks"));
            const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, {
                algorithms: ["ES256"],
            });
            if (jwtDecoded.payload.wallets[0].public_key === pubkey) {
                uiConsole("Validation Success!", "Public Key from Provider: ", pubkey, "Public Key from decoded JWT: ", jwtDecoded.payload.wallets[0].public_key, "Parsed Id Token: ", await parseToken(idTokenInFrontend));
            }
            else {
                uiConsole("Failed");
            }
        }
        catch (e) {
            uiConsole(e);
        }
    };
    const switchChain = async (network) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        await web3Auth.addChain(chain[network]);
        await web3Auth.switchChain(chain[network]);
        setChainId(await provider.getChainId());
        setAddress(await provider.getAddress());
        setBalance(await provider.getBalance());
        uiConsole("Chain Switched");
    };
    const updateConnectedChain = (network) => {
        setConnectedChain(chain[network]);
    };
    const contextProvider = {
        web3Auth,
        provider,
        user,
        isLoading,
        address,
        balance,
        chainId,
        playgroundConsole,
        connectedChain,
        connected,
        logout,
        loginGoogle,
        loginGitHub,
        loginAuth0,
        loginFacebook,
        getUserInfo,
        getAddress,
        getBalance,
        getSignature,
        sendTransaction,
        getPrivateKey,
        getChainId,
        deployContract,
        readContract,
        writeContract,
        verifyServerSide,
        switchChain,
        updateConnectedChain,
    };
    return React.createElement(Web3AuthContext.Provider, { value: contextProvider }, children);
};
//# sourceMappingURL=web3auth.js.map