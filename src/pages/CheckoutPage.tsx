import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User, Mail, MapPin, Key, Check, AlertCircle, ShoppingCart, Lock } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';

type PaymentMethod = 'credit-card' | 'paypal';
type CheckoutStep = 'information' | 'payment' | 'confirmation';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, cartCount } = useShoppingContext();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  
  const tax = cartTotal * 0.1;
  const total = cartTotal + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateInformationForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validatePaymentForm = () => {
    const errors: Record<string, string> = {};
    
    if (paymentMethod === 'credit-card') {
      if (!formData.cardName.trim()) errors.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        errors.cardNumber = 'Card number should be 16 digits';
      
      if (!formData.cardExpiry.trim()) errors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) 
        errors.cardExpiry = 'Expiry date should be in MM/YY format';
      
      if (!formData.cardCVC.trim()) errors.cardCVC = 'Security code is required';
      else if (!/^\d{3,4}$/.test(formData.cardCVC)) 
        errors.cardCVC = 'Security code should be 3 or 4 digits';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateInformationForm()) {
      setCurrentStep('payment');
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePaymentForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('confirmation');
        clearCart();
        window.scrollTo(0, 0);
      }, 2000);
    }
  };
  
  const handleBackToCart = () => {
    navigate('/cart');
  };
  
  const handleBackToInformation = () => {
    setCurrentStep('information');
    window.scrollTo(0, 0);
  };
  
  if (cartCount === 0 && currentStep !== 'confirmation') {
    navigate('/cart');
    return null;
  }
  
  const renderCheckoutSteps = () => (
    <div className="flex mb-8 mt-2">
      <div className={`flex-1 pb-2 text-center ${currentStep === 'information' ? 'border-b-2 border-accent-primary' : 'border-b border-white/10'}`}>
        <span className={`text-sm font-medium ${currentStep === 'information' ? 'text-accent-primary' : ''}`}>
          Information
        </span>
      </div>
      <div className={`flex-1 pb-2 text-center ${currentStep === 'payment' ? 'border-b-2 border-accent-primary' : 'border-b border-white/10'}`}>
        <span className={`text-sm font-medium ${currentStep === 'payment' ? 'text-accent-primary' : ''}`}>
          Payment
        </span>
      </div>
      <div className={`flex-1 pb-2 text-center ${currentStep === 'confirmation' ? 'border-b-2 border-accent-primary' : 'border-b border-white/10'}`}>
        <span className={`text-sm font-medium ${currentStep === 'confirmation' ? 'text-accent-primary' : ''}`}>
          Confirmation
        </span>
      </div>
    </div>
  );

  const renderInformationStep = () => (
    <form onSubmit={handleContinueToPayment}>
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-accent-primary" />
          <span>Contact Information</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`glass-input w-full ${formErrors.fullName ? 'border-red-500' : ''}`}
              placeholder="John Doe"
            />
            {formErrors.fullName && (
              <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`glass-input w-full pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                placeholder="your.email@example.com"
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-primary" />
          <span>Shipping Address</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`glass-input w-full ${formErrors.address ? 'border-red-500' : ''}`}
              placeholder="123 Main St"
            />
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`glass-input w-full ${formErrors.city ? 'border-red-500' : ''}`}
                placeholder="New York"
              />
              {formErrors.city && (
                <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={`glass-input w-full ${formErrors.postalCode ? 'border-red-500' : ''}`}
                placeholder="10001"
              />
              {formErrors.postalCode && (
                <p className="mt-1 text-sm text-red-500">{formErrors.postalCode}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="glass-input w-full bg-transparent"
            >
              <option value="United States" className="bg-dark-bg">United States</option>
              <option value="Canada" className="bg-dark-bg">Canada</option>
              <option value="United Kingdom" className="bg-dark-bg">United Kingdom</option>
              <option value="Australia" className="bg-dark-bg">Australia</option>
              <option value="Germany" className="bg-dark-bg">Germany</option>
              <option value="France" className="bg-dark-bg">France</option>
              <option value="Japan" className="bg-dark-bg">Japan</option>
              <option value="India" className="bg-dark-bg">India</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBackToCart}
          className="glass-button flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        
        <button
          type="submit"
          className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );

  const renderPaymentStep = () => (
    <form onSubmit={handlePlaceOrder}>
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-accent-primary" />
          <span>Payment Method</span>
        </h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div
              className={`flex-1 glass-card p-4 cursor-pointer ${
                paymentMethod === 'credit-card' 
                  ? 'border-accent-primary bg-accent-primary/10' 
                  : ''
              }`}
              onClick={() => setPaymentMethod('credit-card')}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'credit-card' 
                    ? 'border-accent-primary' 
                    : 'border-white/50'
                }`}>
                  {paymentMethod === 'credit-card' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-primary"></div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Credit Card</span>
                </div>
              </div>
            </div>
            
            <div
              className={`flex-1 glass-card p-4 cursor-pointer ${
                paymentMethod === 'paypal' 
                  ? 'border-accent-primary bg-accent-primary/10' 
                  : ''
              }`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'paypal' 
                    ? 'border-accent-primary' 
                    : 'border-white/50'
                }`}>
                  {paymentMethod === 'paypal' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-primary"></div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.8 10.2c-.1.6-.3 1.2-.6 1.8-1.2 2.5-4.3 3.9-7.3 3.9h-.7c-.6 0-1.2.4-1.3 1l-.6 4.2-.3 1.3c-.1.4.1.7.4.9.1.1.3.1.5.1h3.2c.5 0 1-.4 1.1-.9v-.2l.5-2.9v-.2c.1-.5.5-.8 1-.8h.7c4 0 7.1-1.6 8-6.3.4-1.8.2-3.4-.8-4.5-.3-.2-.7-.5-1-.6v-.2c0-.4-.2-.7-.4-.9C22.9 5.5 22 5 21 4.6c-.9-.4-1.9-.6-3-.6H8.5c-.6 0-1.2.4-1.3 1L5 16.8v.2c.1.4.3.7.7.9.2.1.4.1.6.1h3.6c.5 0 1-.4 1.1-.9v-.2l.4-2.9v-.2c.1-.5.6-.9 1.1-.9h.7c4 0 7.1-1.6 8-6.3.4-1.9.2-3.5-.8-4.5-1.8-1.9-5.1-2.4-8.2-2.4h-9C3 4.7 2.5 5 2.4 5.6L0 19.3v.2c.1.4.3.7.6.9.2.1.4.1.6.1h3.6c.6 0 1.1-.4 1.2-.9v-.2l.4-2.9v-.2c.1-.5.6-.9 1.1-.9h.7c4 0 7.1-1.6 8-6.3.1-.3.2-.6.2-.9.4-1.8.2-3.5-.8-4.5-1.8-1.9-5.1-2.4-8.2-2.4H3.1c-.6 0-1.1.3-1.3.9L0 19.2v.2c.1.4.3.7.6.9.2.1.4.1.6.1h3.6c.6 0 1.1-.4 1.2-.9v-.2l.4-2.9v-.2c.1-.5.6-.9 1.1-.9h.7c3.8 0 6.8-1.5 7.9-5.7.5-1.7.4-3.2-.5-4.3" fill="#179BD7"></path>
                  </svg>
                  <span className="font-medium">PayPal</span>
                </div>
              </div>
            </div>
          </div>
          
          {paymentMethod === 'credit-card' && (
            <div className="space-y-4 mt-6">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={`glass-input w-full ${formErrors.cardName ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {formErrors.cardName && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.cardName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`glass-input w-full pl-10 ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" fillRule="evenodd">
                        <rect fill="#F3F4F5" width="36" height="24" rx="4"></rect>
                        <circle fill="#F79E1B" cx="23.1" cy="12" r="6.5"></circle>
                        <circle fill="#EB001B" cx="13.1" cy="12" r="6.5"></circle>
                        <path d="M18.1 17.8a6.5 6.5 0 010-11.6 6.5 6.5 0 000 11.6z" fill="#FF5F00"></path>
                      </g>
                    </svg>
                    <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000 
.org/2000/svg">
                      <rect fill="#016FD0" width="36" height="24" rx="4"></rect>
                      <path d="M18.265 9.656h-3.421v5.688h3.421V9.656z" fill="#EEEEEE"></path>
                      <path d="M15.432 12.5c0-1.093.543-2.062 1.372-2.665a3.365 3.365 0 00-2.07-.706c-1.853 0-3.354 1.496-3.354 3.342 0 1.845 1.501 3.342 3.354 3.342.763 0 1.464-.253 2.07-.706A3.347 3.347 0 0115.432 12.5z" fill="#EEEEEE"></path>
                      <path d="M24.555 12.5c0 1.845-1.5 3.342-3.353 3.342-.762 0-1.464-.253-2.07-.706.83-.603 1.372-1.572 1.372-2.665 0-1.092-.543-2.062-1.372-2.665a3.365 3.365 0 012.07-.706c1.853 0 3.354 1.496 3.354 3.342v.058z" fill="#EEEEEE"></path>
                    </svg>
                  </div>
                </div>
                {formErrors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.cardNumber}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className={`glass-input w-full ${formErrors.cardExpiry ? 'border-red-500' : ''}`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {formErrors.cardExpiry && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.cardExpiry}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cardCVC" className="block text-sm font-medium mb-1">Security Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardCVC"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      className={`glass-input w-full ${formErrors.cardCVC ? 'border-red-500' : ''}`}
                      placeholder="CVC"
                      maxLength={4}
                    />
                    <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {formErrors.cardCVC && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.cardCVC}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="mt-6 glass-card p-4 bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span>You will be redirected to PayPal to complete your payment securely.</span>
              </p>
            </div>
          )}
          
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secured with SSL encryption.</span>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        <div className="divide-y divide-white/10">
          {cart.map((course, index) => (
            <div key={index} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-400">by {course.instructor}</p>
              </div>
              <p className="font-medium">${course.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 space-y-2 pt-4 border-t border-white/10">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBackToInformation}
          className="glass-button flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Information</span>
        </button>
        
        <button
          type="submit"
          disabled={isProcessing}
          className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderConfirmationStep = () => (
    <div className="text-center">
      <div className="glass-card p-8 mb-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Your Order is Confirmed!</h2>
        
        <p className="text-gray-300 mb-8">
          Thank you for your purchase! Your order has been confirmed and you'll receive an email with your course access details shortly.
        </p>
        
        <div className="glass-card p-4 inline-block mb-8">
          <div className="flex justify-between gap-8 mb-2">
            <span className="text-gray-400">Order Number:</span>
            <span className="font-medium">ORD-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-gray-400">Purchase Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            Your courses are now available in your learning dashboard. You can start learning right away!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/courses" className="glass-button flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            
            <Link 
              to="/" 
              className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex items-center justify-center gap-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="font-bold mb-4">How to access your courses</h3>
        <ol className="text-left space-y-2 text-gray-300">
          <li className="flex gap-2">
            <span className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0">1</span>
            <span>Log in to your LearnHub account using your email and password.</span>
          </li>
          <li className="flex gap-2">
            <span className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0">2</span>
            <span>Navigate to the "My Courses" section in your dashboard.</span>
          </li>
          <li className="flex gap-2">
            <span className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0">3</span>
            <span>Find your new courses and click on "Start Learning" to begin.</span>
          </li>
        </ol>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
        {currentStep !== 'confirmation' && (
          <p className="text-gray-300 max-w-2xl mx-auto">
            Complete your purchase to get instant access to your selected courses.
          </p>
        )}
      </div>
      
      {renderCheckoutSteps()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${currentStep === 'confirmation' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          {currentStep === 'information' && renderInformationStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          {currentStep === 'confirmation' && renderConfirmationStep()}
        </div>
        
        {currentStep !== 'confirmation' && (
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4 pb-2 border-b border-white/10">Order Summary</h2>
              
              <div className="max-h-64 overflow-y-auto mb-4">
                {cart.map((course, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-sm line-clamp-1">{course.title}</p>
                      <p className="text-sm text-gray-400">by {course.instructor}</p>
                    </div>
                    <div className="font-medium">${course.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-2">
                <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#016FD0" width="36" height="24" rx="4"></rect>
                  <path d="M18.265 9.656h-3.421v5.688h3.421V9.656z" fill="#EEEEEE"></path>
                  <path d="M15.432 12.5c0-1.093.543-2.062 1.372-2.665a3.365 3.365 0 00-2.07-.706c-1.853 0-3.354 1.496-3.354 3.342 0 1.845 1.501 3.342 3.354 3.342.763 0 1.464-.253 2.07-.706A3.347 3.347 0 0115.432 12.5z" fill="#EEEEEE"></path>
                  <path d="M24.555 12.5c0 1.845-1.5 3.342-3.353 3.342-.762 0-1.464-.253-2.07-.706.83-.603 1.372-1.572 1.372-2.665 0-1.092-.543-2.062-1.372-2.665a3.365 3.365 0 012.07-.706c1.853 0 3.354 1.496 3.354 3.342v.058z" fill="#EEEEEE"></path>
                </svg>
                <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect fill="#F3F4F5" width="36" height="24" rx="4"></rect>
                    <circle fill="#F79E1B" cx="23.1" cy="12" r="6.5"></circle>
                    <circle fill="#EB001B" cx="13.1" cy="12" r="6.5"></circle>
                    <path d="M18.1 17.8a6.5 6.5 0 010-11.6 6.5 6.5 0 000 11.6z" fill="#FF5F00"></path>
                  </g>
                </svg>
                <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#F3F4F5" width="36" height="24" rx="4"></rect>
                  <path d="M15.277 15.29h-2.488L14.387 8h2.488l-1.598 7.29zm8.907-7.03c-.99-.385-2.288-.686-3.717-.686-2.342 0-4.496 1.22-4.496 2.97 0 1.296 1.32 2.032 2.355 2.473 1.034.441 1.38.743 1.38 1.142 0 .614-.825.892-1.597.892-.987 0-1.667-.232-2.492-.685l-.386-.172-.386 2.366c.77.336 2.168.597 3.676.634 2.453 0 4.537-1.146 4.57-2.93.033-.957-.605-1.683-1.936-2.29-.813-.387-1.32-.628-1.32-1.031.018-.331.407-.692 1.255-.707.716-.085 1.299.05 1.716.205l.22.1.33-2.19v-.001zm5.448-.26h-1.936c-.601 0-1.048.172-1.32.8l-3.716 8.75h2.63l.55-1.371h3.205l.275 1.37h2.322l-2.01-9.55zm-2.96 6.2l.99-2.498c-.016.031.22-.562.352-.93l.165.82.575 2.607H26.67v.001zM13.512 8l-2.453 6.498-.275-1.37c-.44-1.518-1.87-3.174-3.454-4l2.2 7.76 2.63-.001L16.142 8h-2.63z" fill="#2A2A6C"></path>
                </svg>
                <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect fill="#016FD0" width="36" height="24" rx="4"></rect>
                    <path d="M19.6 11.1l-.1-2.1h2.6v-.5c0-3-2-5.2-5.2-5.2-3 0-5.2 2.2-5.2 5.2v.5h2.5l.1 2.1H7.5c0 5.8 4.6 10.5 10.4 10.5 5.7 0 10.4-4.7 10.4-10.5h-8.7z" fill="#EEEEEE"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};