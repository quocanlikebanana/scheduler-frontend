import { useState } from "react";

export type Option = {
	label: React.ReactNode;
	value: string;
};

type DropdownProps = {
	options: Option[];
	onSelect: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<Option | null>(null);

	return (
		<div className="relative inline-block text-left">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
			>
				{selected ? selected.label : "Select an option"}
			</button>
			{isOpen && (
				<div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
					{options.map((option) => (
						<div
							key={option.value}
							onClick={() => {
								setSelected(option);
								setIsOpen(false);
								onSelect(option.value);
							}}
							className="px-4 py-2 cursor-pointer hover:bg-gray-100"
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Dropdown;