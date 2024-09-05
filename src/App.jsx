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
        coinbaseWallet(),
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
        metamaskWallet(),
        walletConnect(),
      ]}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
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
