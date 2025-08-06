import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MapPin, Briefcase, DollarSign, Clock, X } from 'lucide-react';

export const SearchFilterBar = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    location: [],
    jobType: [],
    salary: [],
    experience: []
  });

  const filters = {
    location: [
      'Remote',
      'United States',
      'Europe',
      'Asia',
      'North America',
      'Anywhere'
    ],
    jobType: [
      'Full-time',
      'Part-time',
      'Contract',
      'Freelance',
      'Internship'
    ],
    salary: [
      '$50k - $70k',
      '$70k - $90k',
      '$90k - $120k',
      '$120k - $150k',
      '$150k+'
    ],
    experience: [
      'Entry Level',
      'Mid Level',
      'Senior Level',
      'Lead/Principal',
      'Executive'
    ]
  };

  const filterIcons = {
    location: MapPin,
    jobType: Briefcase,
    salary: DollarSign,
    experience: Clock
  };

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const removeFilter = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      location: [],
      jobType: [],
      salary: [],
      experience: []
    });
  };

  const totalActiveFilters = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length, 0
  );

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([category, options]) => {
          const Icon = filterIcons[category as keyof typeof filterIcons];
          const activeCount = activeFilters[category].length;
          
          return (
            <Popover key={category}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={activeCount > 0 ? 'bg-primary/10 border-primary' : ''}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                  {activeCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 flex items-center justify-center text-xs">
                      {activeCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                  </h4>
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category}-${option}`}
                        checked={activeFilters[category].includes(option)}
                        onCheckedChange={() => toggleFilter(category, option)}
                      />
                      <Label 
                        htmlFor={`${category}-${option}`}
                        className="text-sm cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
        
        {totalActiveFilters > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-muted-foreground"
          >
            Clear All ({totalActiveFilters})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([category, values]) =>
            values.map((value) => (
              <Badge
                key={`${category}-${value}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => removeFilter(category, value)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
};