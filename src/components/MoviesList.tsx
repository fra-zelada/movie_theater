import { IMovie } from "@/interfaces";
import { FC } from "react";
import NextLink from "next/link";

interface MoviesListProps {
    movies: IMovie[];
    page?: number;
}

export const MoviesList: FC<MoviesListProps> = ({ movies }) => {
    return (
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-1 w-[90%] xl:w-[60%]  mx-auto grid-flow-row border-2 border-sky-900 bg-sky-950 rounded-lg shadow-xl mt-2">
            {movies &&
                movies.map(({ imdbID, Poster, Title, Type, Year }) => (
                    <div key={imdbID} className="">
                        <div className="flex flex-col p-2 justify-center items-center h-full">
                            <div className="min-h-[70%] flex items-start justify-center">
                                <NextLink
                                    href={`/movie/${imdbID}/${Title.replaceAll(
                                        /[^a-zA-Z0-9]/g,
                                        "_"
                                    )}`}
                                >
                                    <picture>
                                        <img
                                            src={Poster}
                                            alt={Title}
                                            className=" rounded-xl shadow-lg shadow-black hover:shadow-2xl hover:shadow-black hover:-translate-y-1 cursor-pointer"
                                            onError={(e) => {
                                                const target =
                                                    e.target as HTMLImageElement;
                                                target.src = "/img/Soon.png";
                                            }}
                                        />
                                    </picture>
                                </NextLink>
                            </div>
                            <div className="p-2 mt-2 flex flex-col">
                                <p className="font-medium">{Title}</p>
                                <p className="ml-auto mr-1">{Year}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
