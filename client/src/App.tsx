
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/providers/ThemeProvider";

import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import EventCalendar from "@/pages/EventCalendar";
import Programs from "@/pages/Programs";
import Leaders from "@/pages/Leaders";
import LeaderDetail from "@/pages/LeaderDetail";
import Contact from "@/pages/Contact";
import Join from "@/pages/Join";
import AboutFounder from "@/pages/AboutFounder";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Manahood from "@/pages/Manahood";
import ManahoodStart from "@/pages/ManahoodStart";
import Shop from "@/pages/Shop";
import Membership from "@/pages/Membership";
import Donate from "@/pages/Donate";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollTopButton from "@/components/ScrollTopButton";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/events/:slug" component={EventDetail} />
          <Route path="/events-calendar" component={EventCalendar} />
          <Route path="/programs" component={Programs} />
          <Route path="/leaders" component={Leaders} />
          <Route path="/leaders/:slug" component={LeaderDetail} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/join" component={Join} />
          <Route path="/about-founder" component={AboutFounder} />
          <Route path="/manahood" component={Manahood} />
          <Route path="/manahood/start" component={ManahoodStart} />
          <Route path="/shop" component={Shop} />
          <Route path="/membership" component={Membership} />
          <Route path="/donate" component={Donate} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ScrollTopButton position="bottom-right" size="md" showAfter={300} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ScrollToTop />
            <Router />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
