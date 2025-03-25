interface Props {
	id: string;
	name: string;
	avatar?: string;
	role: string;
}

export default function TeamCard({
	name,
	avatar = "https://i.pravatar.cc/300",
	role
}: Props) {
	return (
		<div className="p-2 flex items-center hover:bg-gray-100 rounded mx-1 cursor-pointer">
			<img
				src={avatar}
				alt={name}
				className="w-8 h-8 rounded-full mr-2"
			/>
			<div className="flex flex-col">
				<span className="text-sm">{name}</span>
				<span className="text-xs text-gray-500 ml-1">{role}</span>
			</div>
		</div>
	);
}
