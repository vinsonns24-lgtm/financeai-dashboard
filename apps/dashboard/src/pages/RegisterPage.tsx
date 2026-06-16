import { Icon } from '@financeai/ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../lib/auth';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name: fullName,
      });
      
      if (error) {
        setError(error.message || 'Registration failed. Please try again.');
      } else {
        // Success
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthLevel = (val: string) => {
    if (val.length === 0) return 0; // None
    if (val.length < 6) return 1; // Weak
    if (val.length < 10) return 2; // Fair
    return 3; // Strong
  };

  const strengthLevel = getStrengthLevel(password);

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md lg:p-xl gradient-bg relative overflow-hidden font-body-md antialiased">
      {/* Ambient background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container blur-[120px] opacity-20 pointer-events-none" />
      
      {/* Registration Card */}
      <main className="glass-panel rounded-xl w-full max-w-[480px] p-lg md:p-xl relative z-10 flex flex-col gap-xl">
        
        {/* Header */}
        <header className="flex flex-col items-center gap-sm text-center">
          <div className="flex items-center gap-xs text-primary mb-sm">
            <Icon name="analytics" size={32} filled />
            <h1 className="font-headline-md text-headline-md font-bold tracking-tight m-0">FinanceAI</h1>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface m-0">Create an Account</h2>
          <p className="font-body-md text-body-md text-on-surface-variant m-0">Start your journey to smarter wealth management.</p>
        </header>

        {error && (
          <div className="p-sm bg-error-container/20 border border-error/50 rounded-lg text-error font-body-sm text-center">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form className="flex flex-col gap-lg w-full" onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="fullName" className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
            <div className="relative">
              <Icon name="person" size={20} className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input 
                id="fullName" 
                type="text" 
                required 
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field w-full rounded-lg py-sm pl-[48px] pr-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50" 
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="email" className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
            <div className="relative">
              <Icon name="mail" size={20} className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input 
                id="email" 
                type="email" 
                required 
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full rounded-lg py-sm pl-[48px] pr-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50" 
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="password" className="font-label-md text-label-md text-on-surface-variant">Password</label>
            <div className="relative">
              <Icon name="lock" size={20} className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full rounded-lg py-sm pl-[48px] pr-[48px] font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
              >
                <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            <div className="flex flex-col gap-base mt-xs">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Password strength: <span className={
                    strengthLevel === 0 ? "text-on-surface" :
                    strengthLevel === 1 ? "text-error" :
                    strengthLevel === 2 ? "text-[#FBBC05]" :
                    "text-primary"
                  }>
                    {strengthLevel === 0 ? "None" : strengthLevel === 1 ? "Weak" : strengthLevel === 2 ? "Fair" : "Strong"}
                  </span>
                </span>
              </div>
              <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden flex gap-1">
                <div className={`h-full strength-meter-bar ${strengthLevel >= 1 ? (strengthLevel === 1 ? 'w-full bg-error' : strengthLevel === 2 ? 'w-full bg-[#FBBC05]' : 'w-full bg-primary') : 'w-1/3 bg-error'}`} />
                <div className={`h-full strength-meter-bar ${strengthLevel >= 2 ? (strengthLevel === 2 ? 'w-full bg-[#FBBC05]' : 'w-full bg-primary') : 'w-0 bg-transparent'}`} />
                <div className={`h-full strength-meter-bar ${strengthLevel >= 3 ? 'w-full bg-primary' : 'w-0 bg-transparent'}`} />
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-xs">
            <label htmlFor="confirmPassword" className="font-label-md text-label-md text-on-surface-variant">Confirm Password</label>
            <div className="relative">
              <Icon name="lock" size={20} className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input 
                id="confirmPassword" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field w-full rounded-lg py-sm pl-[48px] pr-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50" 
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-sm mt-xs">
            <div className="flex items-center h-5">
              <input 
                id="terms" 
                type="checkbox" 
                required
                className="w-4 h-4 rounded border-outline-variant bg-surface-variant text-primary focus:ring-primary focus:ring-offset-background cursor-pointer" 
              />
            </div>
            <label htmlFor="terms" className="font-body-sm text-body-sm text-on-surface-variant leading-tight cursor-pointer">
              I agree to the <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-md mt-sm">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-primary hover:bg-primary-fixed-dim text-on-primary-fixed font-label-md text-label-md py-sm px-lg rounded-full transition-colors flex items-center justify-center gap-sm shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <Icon name="arrow_forward" size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-md w-full my-xs">
          <div className="h-px bg-outline-variant flex-1" />
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-outline-variant flex-1" />
        </div>

        {/* Social Register */}
        <div className="flex flex-col sm:flex-row gap-md w-full">
          <button type="button" className="flex-1 flex items-center justify-center gap-sm py-sm px-md rounded-full border border-outline-variant hover:bg-surface-variant/50 transition-colors font-label-md text-label-md text-on-surface">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button type="button" className="flex-1 flex items-center justify-center gap-sm py-sm px-md rounded-full border border-outline-variant hover:bg-surface-variant/50 transition-colors font-label-md text-label-md text-on-surface">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05 1.9-3.3 1.9-1.21 0-1.63-.75-3.06-.75-1.46 0-1.92.74-3.08.74-1.28 0-2.45-1.05-3.32-1.9C2.45 18.42 1 14.6 1 11.64c0-3.36 2.13-5.13 4.25-5.13 1.25 0 2.37.86 3.06.86.67 0 2.01-.98 3.51-.98 1.48 0 2.76.62 3.6 1.63-3.15 1.74-2.6 5.86.58 7.15-.71 1.83-1.87 3.66-3.05 4.81zM11.95 5.25c.18-1.57 1.42-3.17 2.92-3.61.35 1.76-.94 3.32-2.8 3.74-.03-.04-.08-.09-.12-.13z" />
            </svg>
            Apple
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
            Already have an account? 
            <Link to="/login" className="text-primary hover:text-primary-fixed-dim font-label-md text-label-md ml-xs transition-colors">Log In</Link>
          </p>
        </footer>

      </main>
    </div>
  );
}
