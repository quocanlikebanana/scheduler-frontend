import { bookingGenApi, GetStoresByStoreIdAvailabilityApiArg, GetStoresByStoreIdAvailabilityApiResponse, GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiArg, WorkHoursOfDays } from "./booking.api-gen";

type SwitchStoreAndTeamAvailability = GetStoresByStoreIdAvailabilityApiArg | GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiArg

const injectRtkApi = bookingGenApi.injectEndpoints({
	endpoints: (build) => ({
		getStoresByStoreIdAvailabilityOrWithTeamIdAvailability: build.query<
			GetStoresByStoreIdAvailabilityApiResponse,
			SwitchStoreAndTeamAvailability
		>({
			queryFn: async (arg, _, __, baseQuery) => {
				if ('teamId' in arg && arg.teamId != null) {
					const result = await baseQuery({
						url: `/stores/${arg.storeId}/teams/${arg.teamId}/availability`,
						params: {
							start: arg.start,
							end: arg.end,
						},
					});
					if (result.error) {
						return { error: result.error };
					}
					return { data: result.data as WorkHoursOfDays };
				} else {
					const result = await baseQuery({
						url: `/stores/${arg.storeId}/availability`,
						params: {
							start: arg.start,
							end: arg.end,
						},
					});
					if (result.error) {
						return { error: result.error };
					}
					return { data: result.data as WorkHoursOfDays };
				}
			},
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetStoresByStoreIdAvailabilityOrWithTeamIdAvailabilityQuery
} = injectRtkApi;
export { injectRtkApi as bookingGenCustomApi };