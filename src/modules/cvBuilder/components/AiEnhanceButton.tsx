import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { Sparkles, Crown, Loader2 } from 'lucide-react';
import { UserTier } from '@/types/user';
import { Link } from 'react-router-dom';
import { CvService } from '@/modules/cvBuilder/services/cvService';
import { useToast } from '@/hooks/use-toast';

interface AiEnhanceButtonProps {
  text: string;
  onEnhanced: (enhancedText: string) => void;
  userTier: UserTier;
}

export const AiEnhanceButton = ({ text, onEnhanced, userTier }: AiEnhanceButtonProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!text.trim()) return;
    
    setIsEnhancing(true);
    
    try {
      const enhanced = await CvService.enhanceWithAi(text);
      onEnhanced(enhanced);
      toast({
        title: "Text Enhanced!",
        description: "Your text has been improved with AI suggestions.",
      });
    } catch (error) {
      console.error('AI enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Unable to enhance text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <ShowForTier
      requiredTier="pro"
      fallback={
        <Button variant="outline" size="sm" asChild>
          <Link to="/pricing">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade for AI Enhancement
          </Link>
        </Button>
      }
    >
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleEnhance}
        disabled={isEnhancing || !text.trim()}
      >
        {isEnhancing ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 mr-2" />
        )}
        {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
      </Button>
    </ShowForTier>
  );
};