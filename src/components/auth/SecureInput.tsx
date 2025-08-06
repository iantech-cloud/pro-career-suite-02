import { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { sanitizeUserInput } from '@/lib/security';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sanitize?: boolean;
  showSecurityIndicator?: boolean;
}

export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ sanitize = false, showSecurityIndicator = false, type, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSecure, setIsSecure] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      
      // Sanitize input if enabled
      if (sanitize) {
        value = sanitizeUserInput(value);
        e.target.value = value;
      }

      // Check password strength for security indicator
      if (type === 'password' && showSecurityIndicator) {
        const hasLength = value.length >= 8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        setIsSecure(hasLength && hasUpper && hasLower && hasNumber && hasSpecial);
      }

      if (onChange) {
        onChange(e);
      }
    };

    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={inputType}
          onChange={handleChange}
          {...props}
        />
        
        {/* Password visibility toggle */}
        {isPasswordType && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Security indicator */}
        {showSecurityIndicator && type === 'password' && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <Shield 
              className={`h-4 w-4 ${isSecure ? 'text-green-500' : 'text-gray-400'}`}
            />
          </div>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';