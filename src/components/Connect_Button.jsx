import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import {
    inAppWallet,
    createWallet,
} from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";

const client = createThirdwebClient({
    clientId: "....",
});

const wallets = [
    inAppWallet({
        auth: {
            options: [
                "google",
                "discord",
                "telegram",
                "farcaster",
                "email",
                "facebook",
                "passkey",
                "phone",
            ],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
];

function Example() {
    return (
        <ConnectButton
            client={client}
            wallets={wallets}
            theme={darkTheme({
                colors: {
                    modalBg: "#e1dbdb",
                    borderColor: "#3f9c35",
                    primaryText: "#000000",
                },
            })}
            connectModal={{ size: "compact" }}
            accountAbstraction={{
                chain: ethereum, // replace with the chain you want
                sponsorGas: true,
            }}
            auth={{
                async doLogin(params) {
                    // call your backend to verify the signed payload passed in params
                },
                async doLogout() {
                    // call your backend to logout the user if needed
                },
                async getLoginPayload(params) {
                    // call your backend and return the payload
                },
                async isLoggedIn() {
                    // call your backend to check if the user is logged in
                },
            }}
        />
    );
}

export default Connect_Button;