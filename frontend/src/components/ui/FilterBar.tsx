import { cn } from '@/utils/cn';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterConfig[];
  className?: string;
}

export function FilterBar({
  filters,
  className = '',
  ...props
}: FilterBarProps) {
  return (
    <div className={cn('filter-bar', className)} {...props}>
      {filters.map((filter, index) => (
        <div key={index} className="filter-group">
          <label
            htmlFor={`filter-${index}`}
            className="filter-label"
          >
            {filter.label}
          </label>
          <select
            id={`filter-${index}`}
            className="form-select form-select-sm"
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}