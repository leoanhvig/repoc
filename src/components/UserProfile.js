import React from "react";
import { useWeb3Auth } from "../services/web3auth";
const UserProfile = () => {
    const { user, connected } = useWeb3Auth();
    if (connected) {
        try {
            return (React.createElement("div", { className: "sticky px-4 inset-x-0 bottom-0 border-t border-gray-100" },
                React.createElement("div", { className: "flex items-center justify-flex-start py-4 shrink-0 overflow-hidden" },
                    user.profileImage && React.createElement("img", { className: "object-fill w-10 h-10 rounded-full", src: user?.profileImage, referrerPolicy: "no-referrer" }),
                    !user.profileImage && (React.createElement("span", { className: "flex justify-center items-center bg-purple_100 font-bold w-10 h-10 rounded-full text-[28px] text-purple_800" }, user?.name.charAt(0).toUpperCase())),
                    React.createElement("div", { className: "ml-1.5 overflow-hidden" },
                        React.createElement("strong", { className: "text-xs block font-medium truncate" }, user.name)))));
        }
        catch (e) {
            return null;
        }
    }
    else {
        return null;
    }
};
export default UserProfile;
//# sourceMappingURL=UserProfile.js.map