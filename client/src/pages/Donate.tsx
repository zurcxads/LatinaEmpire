import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";

const Donate = () => {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">Support Our Mission</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Your donation helps us empower Latina leaders and create lasting change in our communities. Every contribution makes a difference.
      </p>

      {/* Donation options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Choose Donation Amount</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['$25', '$50', '$100', '$250', '$500', 'Other'].map((amount) => (
              <Button 
                key={amount} 
                variant={amount === '$100' ? 'default' : 'outline'}
                className={amount === '$100' ? 'bg-magenta hover:bg-magenta/90' : 'border-magenta/30 text-magenta hover:bg-magenta/5'}
              >
                {amount}
              </Button>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Custom Amount</h3>
            <Input 
              type="number" 
              placeholder="Enter amount" 
              className="rounded-lg" 
              min="1"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Donation Frequency</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-magenta/30 text-magenta hover:bg-magenta/5">One-time</Button>
              <Button className="bg-magenta hover:bg-magenta/90">Monthly</Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                <Input id="firstName" className="rounded-lg" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                <Input id="lastName" className="rounded-lg" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input id="email" type="email" className="rounded-lg" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message (Optional)</label>
              <Textarea 
                id="message" 
                placeholder="Tell us why you're donating..." 
                className="rounded-lg"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto text-center">
        <Button className="primary-button w-full py-6 text-lg mb-4">
          Complete Donation
        </Button>
        <p className="text-sm text-gray-500 mb-8">
          Latina Empire is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.
        </p>
        <Button asChild variant="outline" className="px-8">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Donate;