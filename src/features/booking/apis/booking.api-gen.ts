import { bookingApi as api } from "./booking.api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStoresByStoreIdAvailability: build.query<
      GetStoresByStoreIdAvailabilityApiResponse,
      GetStoresByStoreIdAvailabilityApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/availability`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getStoresByStoreIdBooked: build.query<
      GetStoresByStoreIdBookedApiResponse,
      GetStoresByStoreIdBookedApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/booked`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getStoresByStoreIdTimezone: build.query<
      GetStoresByStoreIdTimezoneApiResponse,
      GetStoresByStoreIdTimezoneApiArg
    >({
      query: (queryArg) => ({ url: `/stores/${queryArg.storeId}/timezone` }),
    }),
    getStoresByStoreIdTeams: build.query<
      GetStoresByStoreIdTeamsApiResponse,
      GetStoresByStoreIdTeamsApiArg
    >({
      query: (queryArg) => ({ url: `/stores/${queryArg.storeId}/teams` }),
    }),
    getStoresByStoreIdTeamsAndTeamIdAvailability: build.query<
      GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiResponse,
      GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/teams/${queryArg.teamId}/availability`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getStoresByStoreIdTeamsAndTeamIdBooked: build.query<
      GetStoresByStoreIdTeamsAndTeamIdBookedApiResponse,
      GetStoresByStoreIdTeamsAndTeamIdBookedApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/teams/${queryArg.teamId}/booked`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    postStoresByStoreIdBook: build.mutation<
      PostStoresByStoreIdBookApiResponse,
      PostStoresByStoreIdBookApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/book`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as bookingGenApi };
export type GetStoresByStoreIdAvailabilityApiResponse =
  /** status 200 OK */ WorkHoursOfDays;
export type GetStoresByStoreIdAvailabilityApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type GetStoresByStoreIdBookedApiResponse =
  /** status 200 OK */ Service[];
export type GetStoresByStoreIdBookedApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type GetStoresByStoreIdTimezoneApiResponse = /** status 200 OK */ {
  /** Timezone of the store */
  timezone?: string;
};
export type GetStoresByStoreIdTimezoneApiArg = {
  /** Id of the store */
  storeId: Id;
};
export type GetStoresByStoreIdTeamsApiResponse =
  /** status 200 OK */ TeamMemberSmall[];
export type GetStoresByStoreIdTeamsApiArg = {
  /** Id of the store */
  storeId: Id;
};
export type GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiResponse =
  /** status 200 OK */ WorkHoursOfDays;
export type GetStoresByStoreIdTeamsAndTeamIdAvailabilityApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Id of a team member */
  teamId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type GetStoresByStoreIdTeamsAndTeamIdBookedApiResponse =
  /** status 200 OK */ Service[];
export type GetStoresByStoreIdTeamsAndTeamIdBookedApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Id of a team member */
  teamId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type PostStoresByStoreIdBookApiResponse = unknown;
export type PostStoresByStoreIdBookApiArg = {
  /** Id of the store */
  storeId: Id;
  body: {
    teamId: Id;
    serviceId: Id;
    /** Start time of the service */
    start: string;
    /** End time of the service */
    end: string;
    /** Comment for the service */
    comment?: string;
    customer?: Id | AnonymousCustomer;
  };
};
export type Time = {
  /** Hour of the time (0-23) */
  hour: number;
  /** Minute of the time */
  minute: number;
};
export type TimeRange = {
  /** Start time */
  start: Time;
  /** End time */
  end: Time;
};
export type WorkHoursOfDays = {
  /** Day of the week in number (0-6), 0 is Monday */
  dayOfWeek: number;
  /** Work hours of the day of the week */
  workHours: TimeRange[];
}[];
export type Id = string;
export type Service = {
  /** Id of the service */
  id: string;
  /** Name of the service */
  name: string;
  /** Start time of the service */
  start: string;
  /** End time of the service */
  end: string;
};
export type TeamMemberSmall = {
  id: Id;
  /** Name of the team member */
  name: string;
  /** Avatar of the team member */
  avatar?: string;
  /** Role of the team member */
  role: "admin" | "manager" | "employee";
};
export type AnonymousCustomer = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  avatar?: string;
};
export const {
  useGetStoresByStoreIdAvailabilityQuery,
  useGetStoresByStoreIdBookedQuery,
  useGetStoresByStoreIdTimezoneQuery,
  useGetStoresByStoreIdTeamsQuery,
  useGetStoresByStoreIdTeamsAndTeamIdAvailabilityQuery,
  useGetStoresByStoreIdTeamsAndTeamIdBookedQuery,
  usePostStoresByStoreIdBookMutation,
} = injectedRtkApi;
