import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Membership = () => {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">Membership Plans</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Join our vibrant community of Latina leaders and gain exclusive access to resources, events, and networking opportunities.
      </p>

      {/* Membership tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Basic tier */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all">
          <div className="p-6 bg-gray-50">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <div className="text-3xl font-bold mb-2">$9.99<span className="text-sm font-normal text-gray-500">/month</span></div>
            <p className="text-gray-600">Perfect for those just starting their journey</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Access to digital resources
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Monthly newsletter
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Community forum access
              </li>
            </ul>
            <Button className="w-full primary-button-outline">Join Now</Button>
          </div>
        </div>

        {/* Premium tier */}
        <div className="border-2 border-magenta rounded-xl overflow-hidden bg-white shadow-lg transform scale-105">
          <div className="p-6 bg-magenta text-white">
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="text-3xl font-bold mb-2">$29.99<span className="text-sm font-normal text-white/80">/month</span></div>
            <p className="text-white/90">Our most popular membership tier</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                All Basic features
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Exclusive webinars and workshops
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                1:1 mentoring sessions (monthly)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Discounts on events and merchandise
              </li>
            </ul>
            <Button className="w-full primary-button">Join Now</Button>
          </div>
        </div>

        {/* Elite tier */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all">
          <div className="p-6 bg-gray-50">
            <h3 className="text-2xl font-bold mb-2">Elite</h3>
            <div className="text-3xl font-bold mb-2">$99.99<span className="text-sm font-normal text-gray-500">/month</span></div>
            <p className="text-gray-600">For established leaders seeking growth</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                All Premium features
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                VIP access to all events
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Weekly coaching calls
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Featured profile in our directory
              </li>
            </ul>
            <Button className="w-full primary-button-outline">Join Now</Button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button asChild className="primary-button px-8 py-6 text-lg">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Membership;