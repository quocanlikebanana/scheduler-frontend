import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';

type MenuProps = {
	children: React.ReactNode;
	button: React.ReactNode;
};

export const Menu = ({ children, button }: MenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: { target: any; }) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative z-20" ref={dropdownRef}>
			{/* Trigger Button */}
			<button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-200 cursor-pointer">
				{button}
			</button>

			{isOpen && (
				<div className="absolute mt-1 right-0 w-fit h-fit p-1 bg-white rounded-lg shadow-lg z-10 overflow-hidden ring-1 ring-gray-400 ring-opacity-5">
					{children}
				</div>
			)}
		</div>
	);
};