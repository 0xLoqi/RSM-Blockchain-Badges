import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { lightTheme } from "thirdweb/react";
import {
    inAppWallet,
    createWallet,
} from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";

const client = createThirdwebClient({
    clientId: "9b75a93ae30f590afc1703447af59a84",
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
                "apple",
            ],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
];

function ConnectButtonWrapper() {
    return (
        <ConnectButton
            client={client}
            wallets={wallets}
            theme={lightTheme({
                colors: {
                    borderColor: "#3f9c35",
                    separatorLine: "#3f9c35",
                    primaryText: "#009cde",
                    accentText: "#009cde",
                },
            })}
            connectButton={{ label: "Connect Wallet" }}
            connectModal={{
                size: "wide",
                titleIcon: "https://i.imgur.com/Ib78a77.png",
                showThirdwebBranding: false,
            }}
            accountAbstraction={{
                chain: ethereum, // replace with the chain you want
                sponsorGas: true,
            }}
        />
    );
}

export default ConnectButtonWrapper;
