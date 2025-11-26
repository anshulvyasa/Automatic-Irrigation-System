import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Amplify } from 'aws-amplify'
import { PubSub } from '@aws-amplify/pubsub';
import { IDENTITY_POOL_ID, IOT_ENDPOINT, REGION } from "./config";
import { Provider } from 'react-redux';
import { store } from "./lib/store";


const queryClient = new QueryClient();

Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: IDENTITY_POOL_ID,
      allowGuestAccess: true
    }
  }
})

export const pubsub = new PubSub({
  region: REGION,
  endpoint: IOT_ENDPOINT,
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
