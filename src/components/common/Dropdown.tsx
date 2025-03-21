import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
	id: string | number;
	label: React.ReactNode;
	value: any;
	icon?: React.ReactNode;
	disabled?: boolean;
}

interface DropdownProps {
	options: DropdownOption[];
	value?: DropdownOption | null;
	onChange: (option: DropdownOption) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	menuClassName?: string;
	optionClassName?: string;
	renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
	renderSelectedOption?: (option: DropdownOption | null) => React.ReactNode;
	position?: 'bottom' | 'top';
	width?: string;
	maxHeight?: string;
	isSearchable?: boolean;
	noOptionsMessage?: string;
	icon?: React.ReactNode;
	clearable?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
	options,
	value = null,
	onChange,
	placeholder = 'Select an option',
	disabled = false,
	className = '',
	menuClassName = '',
	optionClassName = '',
	renderOption,
	renderSelectedOption,
	position = 'bottom',
	width = '100%',
	maxHeight = '300px',
	isSearchable = false,
	noOptionsMessage = 'No options available',
	icon,
	clearable = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	// Focus search input when dropdown opens
	useEffect(() => {
		if (isOpen && isSearchable && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [isOpen, isSearchable]);

	const toggleDropdown = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
			setSearchTerm('');
		}
	};

	const handleOptionClick = (option: DropdownOption) => {
		if (!option.disabled) {
			onChange(option);
			setIsOpen(false);
			setSearchTerm('');
		}
	};

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		onChange({ id: '', value: null, label: '' });
		setSearchTerm('');
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const filteredOptions = searchTerm
		? options.filter(option =>
			typeof option.label === 'string' &&
			option.label.toLowerCase().includes(searchTerm.toLowerCase()))
		: options;

	return (
		<div
			className={`relative inline-block ${className}`}
			ref={dropdownRef}
			style={{ width }}
		>
			{/* Dropdown trigger */}
			<div
				className={`flex items-center justify-between px-3 py-2 bg-white border rounded-md cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-gray-400'
					} ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'}`}
				onClick={toggleDropdown}
			>
				<div className="flex items-center flex-grow overflow-hidden">
					{icon && <span className="mr-2">{icon}</span>}
					{renderSelectedOption ? (
						renderSelectedOption(value)
					) : (
						<span className={`block truncate ${!value ? 'text-gray-500' : ''}`}>
							{value ? value.label : placeholder}
						</span>
					)}
				</div>
				<div className="flex items-center">
					{clearable && value && (
						<button
							type="button"
							onClick={handleClear}
							className="p-1 text-gray-400 hover:text-gray-600 mr-1"
							aria-label="Clear selection"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
						</button>
					)}
					<ChevronDown size={16} className={`ml-2 text-gray-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
				</div>
			</div>

			{/* Dropdown menu */}
			{isOpen && (
				<div
					className={`absolute z-10 ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
						} left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg ${menuClassName}`}
					style={{ maxHeight }}
				>
					{isSearchable && (
						<div className="p-2 border-b border-gray-200">
							<input
								ref={searchInputRef}
								type="text"
								className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Search..."
								value={searchTerm}
								onChange={handleSearchChange}
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					)}

					<div className="overflow-y-auto" style={{ maxHeight: isSearchable ? 'calc(100% - 56px)' : maxHeight }}>
						{filteredOptions.length === 0 ? (
							<div className="py-2 px-3 text-sm text-gray-500">{noOptionsMessage}</div>
						) : (
							filteredOptions.map((option) => (
								<div
									key={option.id}
									onClick={() => handleOptionClick(option)}
									className={`px-3 py-2 cursor-pointer text-sm ${option.disabled
										? 'opacity-50 cursor-not-allowed bg-gray-50'
										: 'hover:bg-gray-100'
										} ${value?.id === option.id ? 'bg-blue-50 text-blue-700' : ''} ${optionClassName}`}
								>
									{renderOption ? (
										renderOption(option, value?.id === option.id)
									) : (
										<div className="flex items-center">
											{option.icon && <span className="mr-2">{option.icon}</span>}
											<span className="block truncate">{option.label}</span>
										</div>
									)}
								</div>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
};