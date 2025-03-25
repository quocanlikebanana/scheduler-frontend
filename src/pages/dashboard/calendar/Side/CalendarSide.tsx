import { Plus } from "lucide-react";
import TeamCard from "./TeamCard";
import { useGetStoresByStoreIdTeamsQuery } from "../../../../features/booking/apis/booking.api-gen";

export default function CalendarSide() {
	const { data } = useGetStoresByStoreIdTeamsQuery({ storeId: "1" });

	if (!data) return null;
	return (
		<div className="w-full bg-white border-r flex flex-col">
			<div className="text-gray-700 font-medium py-3 flex items-center justify-center cursor-pointer hover:bg-gray-100">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.664-5.328A2 2 0 016.58 3h10.84a2 2 0 011.916 1.672L21 10m-9 4v6m-4-6v6m8-6v6M5 10h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
				</svg>
				<span>Store</span>
			</div>

			<hr className="border-t border-gray-200" />

			{data.map((team) => {
				return <TeamCard
					key={team.id}
					id={team.id}
					name={team.name}
					avatar={team.avatar}
					role={team.role} />;
			}
			)}
			<div className="mt-2 p-2 flex items-center text-gray-600 hover:bg-gray-100 rounded mx-1">
				<Plus size={16} className="mr-2" />
				<span className="text-sm">Add team member</span>
			</div>
		</div>
	)
}
