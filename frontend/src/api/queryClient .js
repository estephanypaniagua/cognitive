import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   mutations: {
  //     onError: e => {
  //       if ("message" in e) {
  //         console.log(e.message);
  //       }
  //     },
  //   },
  //   queries: {
  //     retry: false,
  //     staleTime: 60 * 1000 * 5,
  //     onError: e => {
  //       if ("message" in e) {
  //         console.log(e.message);
  //       }
  //     },
  //     queryFn: defaultQueryFn,
  //   },
  // },
});
