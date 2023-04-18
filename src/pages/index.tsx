import { GetServerSideProps, NextPage } from "next";
import { IApiResponse } from "../interfaces/";
import { MoviesList } from "@/components/";

import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { useMovieList } from "@/hooks";
import { MainLayout } from "@/components/layouts";
interface Props {
    initData: IApiResponse;
}

const MOVIES_X_PAGE = 10;

const HomePage: NextPage<Props> = ({ initData }) => {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isValidating } = useMovieList(initData, page);

    const totalPages = Math.floor(
        (Math.max(+initData.totalResults, MOVIES_X_PAGE) || 10) / MOVIES_X_PAGE
    );

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [page]);

    if (isLoading && isValidating)
        return (
            <MainLayout>
                <div className="flex justify-center w-full items-center">
                    Loading...
                </div>
            </MainLayout>
        );

    return (
        <MainLayout>
            {data?.Search && <MoviesList movies={data?.Search} />}
            <div className="flex flex-row justify-center items-center ">
                {totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        page={page}
                        setPage={setPage}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
    const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

    const resp = await fetch(
        `https://www.omdbapi.com/?s=star%20wars&apikey=${API_KEY}&page=1&type=movie`
    );

    const initData: IApiResponse = await resp.json();

    return {
        props: { initData },
    };
};
