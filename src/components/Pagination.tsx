import { FC } from "react";

interface Props {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

const PAGE_LIMIT = 10;

export const Pagination: FC<Props> = ({ page, setPage, totalPages }) => {
    const handleClick = (newPage: number) => {
        setPage(newPage);
    };

    const renderPageButtons = () => {
        const pagesToRender: number[] = [];
        const startPage = Math.max(
            1,
            Math.min(totalPages - PAGE_LIMIT + 1, page - PAGE_LIMIT / 2)
        );

        for (
            let i = startPage;
            i <= Math.min(totalPages, startPage + PAGE_LIMIT - 1);
            i++
        ) {
            pagesToRender.push(i);
        }

        return pagesToRender.map((pageNum) => (
            <div
                key={pageNum}
                onClick={() => handleClick(pageNum)}
                className={`cursor-pointer xl:px-3 mx-1 xl:py-1 my-2 xl:text-base text-sm border-white border rounded-xl hover:bg-emerald-700 ${
                    pageNum === page && "bg-emerald-900 "
                } ${pageNum < 10 && "px-1"} `}
            >
                {pageNum}
            </div>
        ));
    };

    const renderPrevButton = () => {
        if (page <= 1) {
            return (
                <div className="px-3 mx-1 py-1 my-2 text-gray-500 cursor-not-allowed">
                    {"<"}
                </div>
            );
        } else {
            return (
                <div
                    onClick={() => handleClick(page - 1)}
                    className="cursor-pointer px-3 mx-1 py-1 my-2 border-white border rounded-xl hover:bg-emerald-700"
                >
                    {"<"}
                </div>
            );
        }
    };

    const renderNextButton = () => {
        if (page >= totalPages) {
            return (
                <div className="px-3 mx-1 py-1 my-2 text-gray-500 cursor-not-allowed">
                    {">"}
                </div>
            );
        } else {
            return (
                <div
                    onClick={() => handleClick(page + 1)}
                    className="cursor-pointer px-3 mx-1 py-1 my-2 border-white border rounded-xl hover:bg-emerald-700"
                >
                    {">"}
                </div>
            );
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            {renderPrevButton()}
            {renderPageButtons()}
            {renderNextButton()}
        </div>
    );
};
