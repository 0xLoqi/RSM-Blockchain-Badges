import React from "react";
import { ThirdwebProvider, ConnectWallet, metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react";

function ConnectButtonThirdweb() {
    return (
        <ThirdwebProvider
            supportedWallets={[
                metamaskWallet({ recommended: true }),
                coinbaseWallet(),
                walletConnect(),
            ]}
            clientId="9b75a93ae30f590afc1703447af59a84"
        >
            <ConnectWallet />
        </ThirdwebProvider>
    );
}

export default ConnectButtonThirdweb;
