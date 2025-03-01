import { useState } from "react";

export function Switch(props: SwitchProps) {
	return var1(props);
}

interface SwitchProps {
	onColor?: string;
	offColor?: string;
	backgroundColor?: string;
}

function var1({
	onColor = 'bg-black',
	offColor = 'bg-gray-300',
	backgroundColor = 'bg-white',
}: SwitchProps) {
	const [isOn, setOn] = useState(false);
	return (
		<button
			className={`w-10 h-6 rounded-full flex items-center transition-colors duration-200 ease-in-out ${isOn ? `${onColor} justify-end` : `${offColor} justify-start`} cursor-pointer`}
			onClick={() => setOn(!isOn)}
		>
			<span className={`w-4 h-4 ${backgroundColor} rounded-full mx-1`}></span>
		</button>
	)
}
