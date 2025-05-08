import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Loader, Check } from "lucide-react";
import SuccessConfetti from "@/components/SuccessConfetti";

interface JoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  country: string;
  reason: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
}

const countries = [
  "United States", "Mexico", "Colombia", "Argentina", "Spain", 
  "Peru", "Chile", "Ecuador", "Venezuela", "Guatemala", 
  "Cuba", "Dominican Republic", "Puerto Rico", "Bolivia", 
  "Honduras", "El Salvador", "Nicaragua", "Costa Rica", 
  "Panama", "Uruguay", "Paraguay", "Other"
];

const JoinModal = ({ open, onOpenChange }: JoinModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    reason: ""
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on field change
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
    
    // Clear error on field change
    if (formErrors.country) {
      setFormErrors(prev => ({ ...prev, country: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    
    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
    
    // Validate country
    if (!formData.country) {
      errors.country = "Please select your country";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - In a real app, this would connect to a backend
      console.log("Form data submitted:", formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success state and confetti
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowConfetti(true);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      country: "",
      reason: ""
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  const handleClose = () => {
    // Reset the form when modal is closed
    if (!isSubmitting) {
      resetForm();
      onOpenChange(false);
    }
  };

  return (
    <>
      <SuccessConfetti active={showConfetti} />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden rounded-3xl">
          {isSubmitted ? (
            // Success state
            <div className="py-8 px-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-2xl font-bold mb-4 text-black">Thank You for Joining!</DialogTitle>
              <p className="mb-6 text-gray-700">
                We're excited to have you join the Latina Empire Elite Program. Check your email for next steps and welcome information.
              </p>
              <Button 
                className="accent-button py-2 px-6 justify-center"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            // Form state
            <>
              <div className="bg-black p-6 text-white">
                <DialogTitle className="text-2xl font-bold">Join the Elite Program</DialogTitle>
                <p className="text-white/80 mt-2">
                  Fill out this form to begin your journey with our premium coaching program
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`rounded-xl border-gray-300 py-3 ${formErrors.name ? 'border-red-500 ring-red-500' : 'focus:border-black focus:ring-black'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.name && (
                    <div className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.name}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`rounded-xl border-gray-300 py-3 ${formErrors.email ? 'border-red-500 ring-red-500' : 'focus:border-black focus:ring-black'}`}
                    disabled={isSubmitting}
                  />
                  {formErrors.email && (
                    <div className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.email}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Select 
                    value={formData.country} 
                    onValueChange={handleSelectChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="country" className={`rounded-xl border-gray-300 py-6 ${formErrors.country ? 'border-red-500' : 'focus:border-black focus:ring-black'}`}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.country && (
                    <div className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.country}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium text-gray-700">
                    Why do you want to join? <span className="text-gray-400">(Optional)</span>
                  </label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Tell us a bit about your goals and what you hope to achieve"
                    rows={3}
                    className="rounded-xl border-gray-300 focus:border-black focus:ring-black"
                    disabled={isSubmitting}
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full accent-button py-3 px-6 justify-center" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Join Now"
                    )}
                  </Button>
                </DialogFooter>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinModal;