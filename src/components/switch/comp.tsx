import { useState } from "react";

export function Switch(props: SwitchProps) {
	return var1(props);
}

interface SwitchProps {
	className?: string;
	onColor?: string;
	offColor?: string;
	backgroundColor?: string;
	onToggle?: (isOn: boolean) => void;
}

function var1({
	onColor = 'bg-black',
	offColor = 'bg-gray-300',
	backgroundColor = 'bg-white',
	className = '',
}: SwitchProps) {
	const [isOn, setOn] = useState(false);
	return (
		<div className={className}>
			<button
				className={`w-10 h-6 rounded-full flex items-center transition-all duration-500  ease-in-out ${isOn ? `${onColor} justify-end` : `${offColor} justify-start`} cursor-pointer`}
				onClick={() => setOn(!isOn)}
			>
				<span className={`w-4 h-4 ${backgroundColor} rounded-full mx-1`}></span>
			</button>
		</div>
	)
}
