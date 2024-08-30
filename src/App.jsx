import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const queryClient = new QueryClient();

const App = () => (
  <ThirdwebProvider
    clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}
    activeChain="ethereum"
  >
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </ThirdwebProvider>
);

export default App;
