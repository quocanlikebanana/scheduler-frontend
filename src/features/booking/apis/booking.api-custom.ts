import { bookingGenApi, GetStoresByStoreIdAvailabilityApiArg, GetStoresByStoreIdAvailabilityApiResponse, GetStoresByStoreIdBookedApiArg, GetStoresByStoreIdBookedApiResponse, GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiArg, GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiResponse, GetStoresByStoreIdTeamsAndTeamIdBookedApiArg, GetStoresByStoreIdTeamsAndTeamIdBookedApiResponse, Service, WorkHoursOfDays } from "./booking.api-gen";

type SwitchStoreAndTeamAvailabilityArg = GetStoresByStoreIdAvailabilityApiArg | GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiArg

type SwitchStoreAndTeamAvailabilityResponse = GetStoresByStoreIdAvailabilityApiResponse & GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiResponse;

type SwitchStoreAndTeamBookedArg = GetStoresByStoreIdTeamsAndTeamIdBookedApiArg | GetStoresByStoreIdBookedApiArg

type SwitchStoreAndTeamBookedResponse = GetStoresByStoreIdTeamsAndTeamIdBookedApiResponse & GetStoresByStoreIdBookedApiResponse;


const injectRtkApi = bookingGenApi.injectEndpoints({
	endpoints: (build) => ({
		customGetAvailabilityByStoreIdOrWithTeamId: build.query<
			SwitchStoreAndTeamAvailabilityResponse,
			SwitchStoreAndTeamAvailabilityArg
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
		customGetBookedByStoreIdOrWithTeamId: build.query<
			SwitchStoreAndTeamBookedResponse,
			SwitchStoreAndTeamBookedArg
		>({
			queryFn: async (arg, _, __, baseQuery) => {
				if ('teamId' in arg && arg.teamId != null) {
					const result = await baseQuery({
						url: `/stores/${arg.storeId}/teams/${arg.teamId}/booked`,
						params: {
							start: arg.start,
							end: arg.end,
						},
					});
					if (result.error) {
						return { error: result.error };
					}
					return { data: result.data as Service[] };
				} else {
					const result = await baseQuery({
						url: `/stores/${arg.storeId}/booked`,
						params: {
							start: arg.start,
							end: arg.end,
						},
					});
					if (result.error) {
						return { error: result.error };
					}
					return { data: result.data as Service[] };
				}
			},
		})
	}),
	overrideExisting: true,
});

export const {
	useCustomGetAvailabilityByStoreIdOrWithTeamIdQuery,
	useCustomGetBookedByStoreIdOrWithTeamIdQuery,
} = injectRtkApi;
export { injectRtkApi as bookingGenCustomApi };