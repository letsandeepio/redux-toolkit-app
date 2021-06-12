import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Launches {
  id: string;
  name: string;
  flight_number: string;
  links: {
    patch: {
      small: string;
    };
  };
}

interface Launch {
  id: string;
  name: string;
}

export const apiSplice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacexdata.com/v4/'
  }),
  endpoints: (builder) => {
    return {
      fetchLaunches: builder.query<Launches[], void>({
        query() {
          return `/launches`;
        },
        transformResponse: (response: Launches[]) => response.slice(0, 10)
      }),
      fetchLaunch: builder.query<Launch, string>({
        query(id) {
          return `/launches/${id}`;
        }
      })
    };
  }
});

export const {
  useFetchLaunchQuery,
  useLazyFetchLaunchQuery,
  useFetchLaunchesQuery
} = apiSplice;
