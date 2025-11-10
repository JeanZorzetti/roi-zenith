import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  theme: any;
  searchable?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  theme,
  searchable = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = searchable
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 flex items-center justify-between text-left"
        style={{
          backgroundColor: theme.colors.input,
          borderColor: theme.colors.border,
          color: theme.colors.text
        }}
      >
        <span className={!selectedOption ? 'opacity-50' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: theme.colors.textMuted }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg border shadow-lg"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
            maxHeight: '300px'
          }}
        >
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b" style={{ borderColor: theme.colors.border }}>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  style={{ color: theme.colors.textMuted }}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.input,
                    borderColor: theme.colors.border,
                    color: theme.colors.text
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto" style={{ maxHeight: '240px' }}>
            {/* Empty Option */}
            <button
              type="button"
              onClick={() => handleSelect('')}
              className="w-full px-4 py-2 text-left hover:bg-opacity-10 transition-colors"
              style={{
                backgroundColor: value === '' ? theme.colors.primary + '20' : 'transparent',
                color: theme.colors.textMuted
              }}
            >
              {placeholder}
            </button>

            {/* Filtered Options */}
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full px-4 py-2 text-left hover:bg-opacity-10 transition-colors"
                style={{
                  backgroundColor: value === option.value ? theme.colors.primary + '20' : 'transparent',
                  color: theme.colors.text
                }}
              >
                {option.label}
              </button>
            ))}

            {/* No Results */}
            {filteredOptions.length === 0 && (
              <div
                className="px-4 py-8 text-center text-sm"
                style={{ color: theme.colors.textMuted }}
              >
                Nenhum resultado encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
