import { Icon } from '@financeai/ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../lib/auth';
import { useAuthContext } from '../components/AuthProvider';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });
      
      if (error) {
        setError(error.message || 'Login failed. Please check your credentials.');
      } else {
        // Success
        login(data.user);
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md relative overflow-hidden font-body-md antialiased selection:bg-primary-container/30 selection:text-primary">
      {/* Ambient High-End Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Teal Top-Left Glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary-container/10 blur-[120px] mix-blend-screen animate-pulse-glow" />
        {/* Violet/Indigo Bottom-Right Glow */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary-container/15 blur-[150px] mix-blend-screen animate-pulse-glow" 
          style={{ animationDelay: '2s' }} 
        />
      </div>

      {/* Login Container */}
      <main className="w-full max-w-[420px] relative z-10 animate-fade-in-up">
        {/* Glassmorphism Card */}
        <div className="bg-surface-container-low/70 backdrop-blur-xl border-t border-white/10 border-l border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-2xl p-xl">
          
          {/* Header / Brand */}
          <div className="text-center mb-xl">
            <div className="flex items-center justify-center gap-xs mb-sm">
              <Icon name="analytics" filled size={32} className="text-primary" />
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight m-0">FinanceAI</h1>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant m-0">Securely access your intelligence dashboard</p>
          </div>

          {error && (
            <div className="mb-md p-sm bg-error-container/20 border border-error/50 rounded-lg text-error font-body-sm text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-lg" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface-variant mb-xs ml-1">Email Address</label>
              <div className="relative group">
                <Icon name="mail" size={20} className="absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors" />
                <input 
                  id="email" 
                  type="email" 
                  required 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-variant/40 border border-outline-variant/50 rounded-xl py-[14px] pl-[44px] pr-sm font-body-md text-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner bg-clip-padding" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-xs ml-1 mr-1">
                <label htmlFor="password" className="block font-label-sm text-label-sm text-on-surface-variant">Password</label>
                <Link to="#" className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <Icon name="lock" size={20} className="absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors" />
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  required 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-variant/40 border border-outline-variant/50 rounded-xl py-[14px] pl-[44px] pr-[44px] font-body-md text-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner bg-clip-padding" 
                />
                <button 
                  type="button" 
                  aria-label="Toggle password visibility" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-sm top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors flex items-center justify-center focus:outline-none"
                >
                  <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
                </button>
              </div>
            </div>

            {/* Primary Action */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full mt-lg bg-primary-container text-on-primary-container font-label-md text-label-md rounded-full py-[14px] flex items-center justify-center gap-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] border border-primary-container/50 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <Icon name="arrow_forward" size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-lg flex items-center gap-md">
            <div className="h-px bg-outline-variant/50 flex-1" />
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Or continue with</span>
            <div className="h-px bg-outline-variant/50 flex-1" />
          </div>

          {/* Social Actions */}
          <div className="space-y-sm">
            <button type="button" className="w-full flex items-center justify-center gap-sm bg-surface-variant/20 border border-outline-variant/30 rounded-full py-[12px] font-label-md text-label-md text-on-surface hover:bg-surface-variant/50 hover:border-outline-variant/80 transition-all duration-200 backdrop-blur-md">
              <Icon name="language" size={20} className="text-on-surface" />
              Sign in with Google
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-sm bg-surface-variant/20 border border-outline-variant/30 rounded-full py-[12px] font-label-md text-label-md text-on-surface hover:bg-surface-variant/50 hover:border-outline-variant/80 transition-all duration-200 backdrop-blur-md">
              <Icon name="devices" size={20} className="text-on-surface" />
              Sign in with Apple
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-xl text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant m-0">
              Don't have an account? 
              <Link to="/register" className="font-label-md text-label-md text-primary hover:text-primary-fixed hover:underline transition-colors ml-1">Sign Up</Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
