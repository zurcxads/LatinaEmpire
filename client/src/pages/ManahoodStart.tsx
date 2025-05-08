import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Loader, Check } from "lucide-react";
import { Link } from "wouter";
import SuccessConfetti from "@/components/SuccessConfetti";

// Form types
interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const ManahoodStart = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    goals: ""
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
    setFormData(prev => ({ ...prev, experience: value }));
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
    
    // Validate phone (optional validation, can be adjusted)
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      errors.phone = "Please enter a valid phone number";
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
      console.log("Manahood Start form data:", formData);
      
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

  return (
    <div className="container max-w-5xl mx-auto px-6 py-20">
      <SuccessConfetti active={showConfetti} />
      
      {isSubmitted ? (
        // Success state
        <div className="py-12 px-6 text-center bg-white rounded-2xl shadow-xl max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-black">Your Journey Begins!</h1>
          <p className="mb-6 text-gray-700 text-lg">
            Thank you for taking the first step in your Manahood journey. We've received your information and a mentor will contact you soon to get you started.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="primary-button py-2 px-6 justify-center"
            >
              <Link href="/manahood">
                Back to Manahood
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="py-2 px-6 justify-center"
            >
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        // Form state
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-black p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Begin Your Manahood Journey</h1>
            <p className="text-white/80 mt-4 text-lg">
              Fill out this form to join our transformative program designed for personal and professional growth.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 p-8">
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
                className={`rounded-lg border-gray-300 py-3 ${formErrors.name ? 'border-red-500 ring-red-500' : 'focus:border-black focus:ring-black'}`}
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
                className={`rounded-lg border-gray-300 py-3 ${formErrors.email ? 'border-red-500 ring-red-500' : 'focus:border-black focus:ring-black'}`}
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
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                className={`rounded-lg border-gray-300 py-3 ${formErrors.phone ? 'border-red-500 ring-red-500' : 'focus:border-black focus:ring-black'}`}
                disabled={isSubmitting}
              />
              {formErrors.phone && (
                <div className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.phone}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <Select 
                value={formData.experience} 
                onValueChange={handleSelectChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="experience" className="rounded-lg border-gray-300 py-6">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - Just starting my journey</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some leadership experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced leader seeking growth</SelectItem>
                  <SelectItem value="expert">Expert - Looking to mentor others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="goals" className="text-sm font-medium text-gray-700">
                Your Goals
              </label>
              <Textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="Tell us what you hope to achieve through the Manahood program..."
                rows={4}
                className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full primary-button py-3 px-6 justify-center" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Start My Journey"
                )}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our Privacy Policy and Terms of Service.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManahoodStart;