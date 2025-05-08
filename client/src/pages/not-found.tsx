import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Calendar, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-serif font-bold text-magenta mb-4">404</h1>
          <h2 className="text-2xl font-serif font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button className="bg-magenta text-white hover:bg-magenta/90 flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Homepage
            </Button>
          </Link>
          
          {/* Added better guidance section */}
          <div className="mt-12 space-y-6">
            <p className="text-gray-600 font-medium">You might want to check out:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/blog">
                <Button variant="outline" className="flex items-center border-gray-300 hover:border-magenta hover:text-magenta">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Blog
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" className="flex items-center border-gray-300 hover:border-magenta hover:text-magenta">
                  <Calendar className="mr-2 h-4 w-4" />
                  Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="flex items-center border-gray-300 hover:border-magenta hover:text-magenta">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
}
