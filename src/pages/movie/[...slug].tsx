import { StarIcon, StarsIcon, TicketIcon } from "@/components";
import { MovieLayout } from "@/components/layout";

import { BuyTicketModal } from "@/components/modal";
import { MovieContext } from "@/context/movie";
import { IMovie, IMovieDetails } from "@/interfaces";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useContext, useEffect } from "react";

interface MoviePageProps {
    movie: IMovieDetails;
    slug: string;
}

const MoviePage: NextPage<MoviePageProps> = ({ movie, slug }) => {
    const {
        showBuyTicketModal,
        openMovieModalForBuyTicket,
        closeMovieModalForBuyTicket,
    } = useContext(MovieContext);

    const handleBuyTicket = () => {
        openMovieModalForBuyTicket(movie);
    };

    useEffect(() => {
        return () => {
            closeMovieModalForBuyTicket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MovieLayout title={movie.Title} url={slug} image={movie.Poster}>
            {showBuyTicketModal && <BuyTicketModal />}
            <div className="flex justify-center items-center  w-full my-2  ">
                <div className="md:grid xl:grid flex flex-col md:grid-cols-3 xl:grid-cols-3 md:grid-rows-2 xl:grid-rows-2 xl:w-[60%]  justify-center items-center border-2 border-sky-900 bg-sky-950 rounded-lg shadow-xl p-4">
                    <div className="col-start-2 row-start-1 flex justify-center flex-col items-center">
                        <picture>
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="rounded-xl"
                            />
                        </picture>
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm text-gray-400 font-bold">
                                    Released
                                </p>
                                <p className="text-slate-400 font-bold mt-0">
                                    {movie.Released}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm text-gray-400 font-bold">
                                    IMDB Rating
                                </p>
                                <p className="text-slate-400 font-bold mt-0 flex justify-center items-center gap-0">
                                    {movie.imdbRating}
                                    <StarIcon className="ml-0 h-5 fill-yellow-400" />
                                </p>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm text-gray-400 font-bold">
                                    Runtime
                                </p>
                                <p className="text-slate-400 font-bold mt-0">
                                    {movie.Runtime}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-start-1 row-start-2 col-span-3 w-full flex justify-center items-start h-full mt-3 ">
                        <button
                            onClick={handleBuyTicket}
                            className="px-6 py-0 my-1 xl:py-5 bg-blue-800 rounded-xl flex justify-center items-center w-[80%] hover:bg-blue-900 border-white border-2"
                        >
                            <p className="flex flex-row justify-center items-center xl:text-2xl font-bold">
                                Buy Tickets
                                <TicketIcon className="h-10 stroke-white ml-1" />
                            </p>
                        </button>
                    </div>

                    <div className="col-start-1 row-start-1 flex flex-col px-2">
                        <div className="grid grid-cols-2">
                            <span className="font-semibold pl-2 pr-2">
                                Title:{" "}
                            </span>
                            <span>{movie?.Title}</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="font-semibold pl-2 pr-2">
                                Rated:{" "}
                            </span>
                            <span>{movie?.Rated}</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="font-semibold pl-2 pr-2">
                                Actors:
                            </span>
                            <span>{movie?.Actors}</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="font-semibold pl-2 pr-2">
                                Language:
                            </span>
                            <span>{movie?.Language}</span>
                        </div>

                        <div className="grid grid-cols-2">
                            <span className="font-semibold pl-2 pr-2">
                                Director:
                            </span>
                            <span>{movie?.Director}</span>
                        </div>

                        <div className="grid grid-cols-2">
                            <span className="font-semibold pl-2 pr-2">
                                Writer:
                            </span>
                            <span>{movie?.Writer}</span>
                        </div>
                    </div>
                    <div className="grid-cols-3 grid-rows-2 flex flex-col px-2">
                        <p className="flex flex-col mb-3 mt-1">
                            <span className="font-semibold pl-2 pr-2">
                                Plot:{" "}
                            </span>

                            <span className="italic ml-10 w-2/3">
                                {movie?.Plot}
                            </span>
                        </p>
                        <div className="flex  flex-col p-0">
                            <div className="flex justify-end flex-col">
                                {movie.Ratings.map(({ Source, Value }) => (
                                    <p
                                        key={Source}
                                        className=" text-right mr-1 flex flex-row justify-end "
                                    >
                                        {`${Source} : ${Value}`}
                                        <StarsIcon className="ml-0 h-6 fill-yellow-400" />
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MovieLayout>
    );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    try {
        const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        const { params } = ctx;
        const { slug = [] } = params as { slug: string[] };
        const resp = await fetch(
            `https://www.omdbapi.com/?i=${slug[0]}&apikey=${API_KEY}`
        );
        const movie = (await resp.json()) as IMovieDetails;

        if (movie.Response == "False") {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        const url_slug = `${movie.imdbID}/${movie.Title.replaceAll(
            /[^a-zA-Z0-9]/g,
            "_"
        )}`;
        return {
            props: { movie, slug: url_slug },
            revalidate: 60 * 60 * 60 * 24,
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};

export const getStaticPaths: GetStaticPaths = async (_ctx) => {
    const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const MOVIES_X_PAGE = 10;
    const resp = await fetch(
        `https://www.omdbapi.com/?s=star%20wars&apikey=${API_KEY}&page=1&type=movie`
    );

    const { Search: movies, totalResults = "0" } = (await resp.json()) as {
        Search: IMovie[];
        totalResults: string;
    };

    const params: {
        params: {
            slug: string[];
        };
    }[] = movies.map(({ imdbID, Title }) => ({
        params: {
            slug: [imdbID, Title.replaceAll(/[^a-zA-Z0-9]/g, "_")],
        },
    }));

    //static generation for all pages

    // const totalPages = Math.floor(
    //     (Math.max(+totalResults, MOVIES_X_PAGE) || 10) / MOVIES_X_PAGE
    // );
    // if (totalPages > 1) {

    //     await Promise.all(
    //         Array.from({ length: totalPages - 1 }).map(async (_, i) => {
    //             const index = i + 2;

    //             const resp = await fetch(
    //                 `https://www.omdbapi.com/?s=star%20wars&apikey=${API_KEY}&page=${index}&type=movie`
    //             );
    //             const { Search: movies } = (await resp.json()) as {
    //                 Search: IMovie[];
    //             };

    //             movies.map(({ imdbID, Title }) => {
    //                 const pageParams = {
    //                     params: {
    //                         slug: [
    //                             imdbID,
    //                             Title.replaceAll(/[^a-zA-Z0-9]/g, "_"),
    //                         ],
    //                     },
    //                 };

    //                 params.push(pageParams);
    //             });
    //         })
    //     );
    // }

    return {
        paths: params,
        fallback: "blocking",
    };
};
