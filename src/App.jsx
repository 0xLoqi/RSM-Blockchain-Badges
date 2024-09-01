import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { ThemeProvider } from "next-themes";
import { metamaskWallet, coinbaseWallet, walletConnect, embeddedWallet } from "@thirdweb-dev/react";
import { CustomThirdwebProvider } from "./components/CustomThirdwebProvider";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <CustomThirdwebProvider
      supportedWallets={[
        embeddedWallet({
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
            ],
          },
        }),
        coinbaseWallet(),
        metamaskWallet(),
        walletConnect(),
      ]}
      clientId="9b75a93ae30f590afc1703447af59a84"
    >
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CustomThirdwebProvider>
  </ThemeProvider>
);

export default App;
