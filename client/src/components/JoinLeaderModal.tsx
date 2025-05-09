import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import SuccessConfetti from "@/components/SuccessConfetti";

interface JoinLeaderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  location: z.string().min(2, { message: "Please enter your city and country" }),
  socialMedia: z.string().optional(),
  reason: z.string().min(20, { message: "Please tell us why you want to lead a Latina Empire chapter (min 20 characters)" }),
});

type FormData = z.infer<typeof formSchema>;

const JoinLeaderModal = ({ open, onOpenChange }: JoinLeaderModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      socialMedia: "",
      reason: "",
    },
  });

  async function onSubmit(data: FormData) {
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", data);
    
    // Simulate a delay for API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Show success state
    setIsSubmitted(true);
    setShowConfetti(true);
    
    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    toast({
      title: "Application submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  }

  const resetForm = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(newOpen) => {
        // Reset form when closing the modal
        if (!newOpen) {
          resetForm();
        }
        onOpenChange(newOpen);
      }}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <SuccessConfetti active={showConfetti} />
          
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <span className="text-magenta mr-2">
                <Star className="h-5 w-5 fill-current" />
              </span>
              Join the Global Leaders Network
            </DialogTitle>
            <DialogDescription>
              Apply to become a chapter leader and expand the Latina Empire network in your city.
            </DialogDescription>
          </DialogHeader>
          
          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City & Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Madrid, Spain" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialMedia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn or Instagram (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., https://linkedin.com/in/yourname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to lead a Latina Empire chapter?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your vision and why you want to be a part of this movement..."
                          className="resize-y min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full py-6 text-base font-semibold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Apply Now"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
              <div className="w-20 h-20 bg-magenta/10 rounded-full flex items-center justify-center">
                <Star className="h-10 w-10 text-magenta fill-current" />
              </div>
              <h3 className="text-2xl font-bold">Application Submitted!</h3>
              <p className="text-gray-600 max-w-md">
                Thank you for your interest in becoming a Global Leader. 
                Our team will review your application and contact you with next steps.
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                className="rounded-full px-6 py-2 bg-black text-white"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinLeaderModal;