import { Plus, StoreIcon } from "lucide-react";
import TeamCard from "./TeamCard";
import { useGetStoresByStoreIdTeamsQuery } from "../../../../features/booking/apis/booking.api-gen";

export default function CalendarSide() {
	const { data } = useGetStoresByStoreIdTeamsQuery({ storeId: "1" });

	if (!data) return null;
	return (
		<div className="w-full bg-white border-r flex flex-col">
			<div className="text-gray-700 font-medium py-3 flex items-center justify-center cursor-pointer hover:bg-gray-100">
				<StoreIcon size={16} className="ml-2" />
				<span>Store</span>
			</div>

			<hr className="border-t border-gray-200" />

			{data.map((team) => {
				return <TeamCard
					key={team.id}
					name={team.name}
					avatar={team.avatar}
					role={team.role}
					onTeamClick={() => { }}
				/>;
			}
			)}
			<div className="mt-2 p-2 flex items-center text-gray-600 hover:bg-gray-100 rounded mx-1">
				<Plus size={16} className="mr-2" />
				<span className="text-sm">Add team member</span>
			</div>
		</div>
	)
}
