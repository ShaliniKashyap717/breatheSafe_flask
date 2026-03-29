import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  // State matches your old schema perfectly
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    isSmoker: false,
    hasAsthma: false,
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData({ ...formData, [field]: checked });
  };

  const handleSignup = async () => {
    try {
        console.log('Sending User Data:', formData);
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData);
        alert('Signup successful! Please login.');
        navigate('/login');
    } catch (error) {
        alert('An error occurred during signup: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-xl">
            <div className="flex justify-center mb-4">
              <img
                src="/breathsafe.jpeg"
                alt="BreathSafe Logo"
                className="h-16 w-auto rounded-lg shadow-md"
              />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">Join BreathSafe</CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Health Profile (ML Fields) */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <Label className="text-base font-medium">Health Profile</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSmoker"
                  checked={formData.isSmoker}
                  onCheckedChange={(checked) => handleCheckboxChange('isSmoker', checked)}
                  className="data-[state=checked]:bg-teal-500"
                />
                <Label htmlFor="isSmoker" className="font-normal cursor-pointer">
                  I am currently a smoker
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasAsthma"
                  checked={formData.hasAsthma}
                  onCheckedChange={(checked) => handleCheckboxChange('hasAsthma', checked)}
                  className="data-[state=checked]:bg-teal-500"
                />
                <Label htmlFor="hasAsthma" className="font-normal cursor-pointer">
                  I have asthma
                </Label>
              </div>
            </div>

            <Button 
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-3 mt-4 rounded-xl"
            >
              Create Account
            </Button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-teal-600 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;