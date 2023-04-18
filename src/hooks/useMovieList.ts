import { IApiResponse } from "@/interfaces";
import { fetcher } from "@/utils/fetcher";

import useSWR from 'swr'

export const useMovieList =  (initData: IApiResponse, page: number = 1) => {


    const params = new URLSearchParams();
            params.append("apikey", process.env.NEXT_PUBLIC_OMDB_API_KEY || "");
            params.append("type", "movie");
            params.append("s", "star wars");
            params.delete("page");
            params.append("page", `${page}`);

    const keySwr = `https://www.omdbapi.com?${params.toString()}`

    const { data, isLoading, isValidating, error } = useSWR<IApiResponse>(keySwr, fetcher, {
        revalidateOnMount: false,
        fallbackData: initData,
        revalidateIfStale: true
    });

    return {
        data,
        isLoading,
        isValidating,
        error
    }
    }


