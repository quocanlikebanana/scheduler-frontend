import { Plus, StoreIcon } from "lucide-react";
import TeamCard from "./TeamCard";
import { useGetStoresByStoreIdTeamsQuery } from "../../../../features/booking/apis/booking.api-gen";
import { useCalendarContext } from "../calendar.context";
import { useAppSelector } from "../../../../app/hooks";
import { selectors } from "../../../../features/account/accountSlice";

export default function CalendarSide() {
	const storeId = useAppSelector(selectors.getStoreIdStrict);
	const { data } = useGetStoresByStoreIdTeamsQuery({ storeId });
	const { currentTeamCalendarId, setCurrentTeamCalendarId } = useCalendarContext();

	if (!data) return null;

	const isStoreSelected = currentTeamCalendarId === null;
	return (
		<div className="w-full bg-white border-r flex flex-col h-full">
			<div className={`py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 ${isStoreSelected ? "bg-gray-100 font-bold" : ""}`} onClick={() => setCurrentTeamCalendarId(null)}>
				<StoreIcon size={14} className="ml-2" />
				<span>Store</span>
			</div>

			<hr className="border-t border-gray-300 mb-2" />

			{data.map((team) => (
				<TeamCard
					key={team.id}
					id={team.id}
					name={team.name}
					avatar={team.avatar}
					role={team.role}

				/>
			))}

			<div className="mt-2 p-2 flex items-center text-gray-600 hover:bg-gray-100 rounded mx-1">
				<Plus size={16} className="mr-2" />
				<span className="text-sm">Add team member</span>
			</div>
		</div>
	)
}
