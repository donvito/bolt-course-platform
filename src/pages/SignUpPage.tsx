import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle, Mail, Check, Info, Github } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

export const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and numbers';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, just console log the form data
      console.log('Form submitted:', formData);
      
      // Here you would typically:
      // 1. Call your registration API
      // 2. Show success message or redirect to verification page
      
      setFormSubmitted(true);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general: 'Failed to create account. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    // Here you would integrate with your social signup provider
  };

  // Password strength indicator
  const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong', percentage: number } => {
    if (!password) return { strength: 'weak', percentage: 0 };
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const percentage = Math.min(100, (score / 6) * 100);
    
    if (score <= 2) return { strength: 'weak', percentage };
    if (score <= 4) return { strength: 'medium', percentage };
    return { strength: 'strong', percentage };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthColor = passwordStrength.strength === 'weak' ? 'bg-red-500' : 
                               passwordStrength.strength === 'medium' ? 'bg-yellow-500' : 
                               'bg-green-500';

  if (formSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-lg">
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Registration Successful!</h2>
            <p className="text-gray-300 mb-8">
              We've sent a verification email to <span className="text-accent-primary">{formData.email}</span>. 
              Please check your inbox and follow the instructions to activate your account.
            </p>
            <Link 
              to="/signin" 
              className="glass-button inline-block py-3 px-8 bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Join <span className="gradient-text">LearnHub</span> Today
          </h1>
          <p className="text-gray-300">
            Create an account to access all features and start your learning journey.
          </p>
        </div>

        <div className="glass-card p-8 backdrop-blur-sm">
          {errors.general && (
            <div className="glass-card p-4 mb-6 border border-red-500/50 bg-red-500/10 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-200">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`glass-input w-full pl-10 py-3 ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`glass-input w-full pl-10 py-3 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`glass-input w-full pl-10 py-3 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrengthColor} transition-all duration-300`}
                      style={{ width: `${passwordStrength.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs capitalize">{`Password strength: ${passwordStrength.strength}`}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <Info className="w-3 h-3 mr-1" />
                      <span>8+ characters with uppercase, lowercase & numbers</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`glass-input w-full pl-10 py-3 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 accent-accent-primary bg-transparent border-white/20 rounded focus:ring-0"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className={`font-medium ${errors.agreeToTerms ? 'text-red-400' : ''}`}>
                  I agree to the <Link to="/terms" className="text-accent-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-accent-primary hover:underline">Privacy Policy</Link>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="glass-button w-full py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/10"></div>
            <span className="px-4 text-sm text-gray-400">or sign up with</span>
            <div className="flex-grow h-px bg-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialSignup('google')}
              className="glass-button flex items-center justify-center gap-2 py-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.2544C22.5 11.5216 22.4349 10.8156 22.3133 10.1364H12V14.1228H17.8383C17.621 15.3624 16.8948 16.4148 15.8078 17.1012V19.5732H19.2926C21.2612 17.7564 22.5 15.2616 22.5 12.2544Z" fill="#4285F4"/>
                <path d="M12 22.5C14.7 22.5 17.0108 21.6084 18.6551 20.1048L15.6755 18.0132C14.7861 18.6048 13.5918 18.9528 12 18.9528C9.1959 18.9528 6.7962 17.0328 5.8247 14.46H2.62695V16.5108C4.55101 20.1792 8.40894 22.5 12 22.5Z" fill="#34A853"/>
                <path d="M5.82307 14.46C5.61167 13.8684 5.49406 13.2408 5.49406 12.6C5.49406 11.9592 5.61167 11.3316 5.82307 10.74V8.68921H2.62694C1.90767 9.84 1.5 11.1792 1.5 12.6C1.5 14.0208 1.90767 15.36 2.62694 16.5108L5.82307 14.46Z" fill="#FBBC05"/>
                <path d="M12 6.24722C13.4915 6.24722 14.8257 6.78682 15.8612 7.77682L18.4939 5.14364C16.979 3.71364 14.6798 2.7 12 2.7C8.40894 2.7 4.55101 5.02078 2.62695 8.68921L5.82308 10.74C6.7962 8.16722 9.1959 6.24722 12 6.24722Z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup('github')}
              className="glass-button flex items-center justify-center gap-2 py-3"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-accent-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};