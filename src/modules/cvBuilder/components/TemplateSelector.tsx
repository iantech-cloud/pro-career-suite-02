import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Crown, Check } from 'lucide-react';
import { UserTier } from '@/types/user';

interface Template {
  id: string;
  name: string;
  preview: string;
  isPro: boolean;
  description: string;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  userTier: UserTier;
}

export const TemplateSelector = ({ selectedTemplate, onSelect, userTier }: TemplateSelectorProps) => {
  const templates: Template[] = [
    {
      id: 'basic',
      name: 'Basic',
      preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"%3E%3Crect width="200" height="280" fill="%23ffffff"/%3E%3Crect x="10" y="10" width="180" height="30" fill="%23f1f5f9" rx="4"/%3E%3Crect x="20" y="50" width="160" height="6" fill="%23e2e8f0" rx="2"/%3E%3Crect x="20" y="70" width="100" height="4" fill="%23cbd5e1" rx="2"/%3E%3Crect x="20" y="90" width="160" height="80" fill="%23f8fafc" rx="4"/%3E%3C/svg%3E',
      isPro: false,
      description: 'Clean and simple design'
    },
    {
      id: 'modern',
      name: 'Modern',
      preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"%3E%3Crect width="200" height="280" fill="%23f8fafc"/%3E%3Crect x="10" y="10" width="180" height="40" fill="%233b82f6" rx="4"/%3E%3Crect x="20" y="60" width="160" height="8" fill="%23e2e8f0" rx="2"/%3E%3Crect x="20" y="80" width="100" height="6" fill="%23cbd5e1" rx="2"/%3E%3Crect x="20" y="100" width="160" height="120" fill="%23ffffff" rx="4"/%3E%3C/svg%3E',
      isPro: false,
      description: 'Contemporary professional look'
    },
    {
      id: 'executive',
      name: 'Executive',
      preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"%3E%3Crect width="200" height="280" fill="%23ffffff"/%3E%3Crect x="10" y="10" width="180" height="30" fill="%23374151" rx="2"/%3E%3Crect x="20" y="50" width="160" height="6" fill="%23d1d5db" rx="2"/%3E%3Crect x="20" y="70" width="120" height="4" fill="%23e5e7eb" rx="2"/%3E%3Crect x="20" y="90" width="160" height="100" fill="%23f9fafb" rx="2"/%3E%3C/svg%3E',
      isPro: true,
      description: 'Premium design for senior roles'
    },
    {
      id: 'creative',
      name: 'Creative',
      preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"%3E%3Crect width="200" height="280" fill="%23fef3c7"/%3E%3Ccircle cx="50" cy="50" r="30" fill="%23f59e0b"/%3E%3Crect x="90" y="30" width="100" height="40" fill="%23dc2626" rx="20"/%3E%3Crect x="20" y="90" width="160" height="100" fill="%23ffffff" rx="8"/%3E%3C/svg%3E',
      isPro: true,
      description: 'Stand out with creative flair'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"%3E%3Crect width="200" height="280" fill="%23ffffff"/%3E%3Cline x1="20" y1="40" x2="180" y2="40" stroke="%23374151" stroke-width="2"/%3E%3Crect x="20" y="60" width="100" height="4" fill="%23d1d5db" rx="2"/%3E%3Crect x="20" y="80" width="160" height="4" fill="%23e5e7eb" rx="2"/%3E%3Crect x="20" y="100" width="160" height="80" fill="%23f9fafb" rx="2"/%3E%3C/svg%3E',
      isPro: true,
      description: 'Less is more approach'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      preview: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280"%3E%3Crect width="200" height="280" fill="%23fefefe"/%3E%3Crect x="10" y="10" width="180" height="25" fill="%23831843" rx="2"/%3E%3Crect x="20" y="45" width="160" height="4" fill="%23be185d" rx="2"/%3E%3Crect x="20" y="60" width="120" height="3" fill="%23ec4899" rx="1"/%3E%3Crect x="20" y="75" width="160" height="120" fill="%23fdf2f8" rx="2"/%3E%3C/svg%3E',
      isPro: true,
      description: 'Traditional business style'
    }
  ];

  const canUseTemplate = (template: Template) => {
    return !template.isPro || userTier === 'pro' || userTier === 'admin';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => {
        const canUse = canUseTemplate(template);
        const isSelected = selectedTemplate === template.id;
        
        return (
          <Card 
            key={template.id}
            className={`relative cursor-pointer transition-all duration-300 hover:shadow-md ${
              isSelected ? 'ring-2 ring-primary' : ''
            } ${!canUse ? 'opacity-60' : ''}`}
            onClick={() => canUse && onSelect(template.id)}
          >
            {template.isPro && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-hero text-white z-10">
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            )}
            
            {isSelected && (
              <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1 z-10">
                <Check className="w-3 h-3" />
              </div>
            )}
            
            <CardContent className="p-3">
              <div className="aspect-[3/4] bg-muted rounded mb-3 relative overflow-hidden">
                <img 
                  src={template.preview} 
                  alt={`${template.name} template`}
                  className="w-full h-full object-cover"
                />
                {!canUse && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
              <p className="text-xs text-muted-foreground">{template.description}</p>
              
              {!canUse && (
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link to="/pricing">Upgrade to Use</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};