import { useCalendarContext } from "../calendar.context";

interface Props {
	id: string;
	name: string;
	avatar?: string;
	role: string;
}

export default function TeamCard({
	id,
	name,
	avatar = "https://i.pravatar.cc/300",
	role,
}: Props) {
	const { currentTeamCalendarId, setCurrentTeamCalendarId } = useCalendarContext();
	const isSelected = currentTeamCalendarId === id;

	return (
		<div className={`p-2 flex items-center hover:bg-gray-100 rounded mx-1 cursor-pointer ${isSelected ? "bg-gray-100 font-bold" : ""}`} onClick={() => {
			setCurrentTeamCalendarId(id);
		}}>
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
