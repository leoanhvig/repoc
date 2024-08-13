import { CustomChainConfig } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import * as React from "react";
import { ReactNode } from "react";
import { IWalletProvider } from "./walletProvider";
export interface IWeb3AuthContext {
    web3Auth: Web3AuthNoModal | null;
    connected: boolean;
    provider: IWalletProvider | null;
    isLoading: boolean;
    user: any;
    address: string;
    balance: string;
    chainId: string;
    playgroundConsole: string;
    connectedChain: CustomChainConfig;
    loginAuth0: () => Promise<void>;
    loginGoogle: () => Promise<void>;
    loginGitHub: () => Promise<void>;
    loginFacebook: () => Promise<void>;
    logout: () => Promise<void>;
    getUserInfo: () => Promise<any>;
    getAddress: () => Promise<string>;
    getBalance: () => Promise<string>;
    getSignature: (message: string) => Promise<string>;
    sendTransaction: (amount: string, destination: string) => Promise<string>;
    getPrivateKey: () => Promise<string>;
    getChainId: () => Promise<string>;
    deployContract: (abi: any, bytecode: string, initValue: string) => Promise<any>;
    readContract: (contractAddress: string, contractABI: any) => Promise<string>;
    writeContract: (contractAddress: string, contractABI: any, updatedValue: string) => Promise<string>;
    verifyServerSide: (idToken: string) => Promise<any>;
    switchChain: (network: string) => Promise<void>;
    updateConnectedChain: (network: string) => void;
}
export declare const Web3AuthContext: React.Context<IWeb3AuthContext>;
export declare function useWeb3Auth(): IWeb3AuthContext;
interface IWeb3AuthProps {
    children?: ReactNode;
}
export declare const Web3AuthProvider: ({ children }: IWeb3AuthProps) => React.JSX.Element;
export {};
