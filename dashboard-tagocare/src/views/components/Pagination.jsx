import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import PropTypes from "prop-types";

const Pagination = ({
    pageNumber,
    setPageNumber,
    totalItem,
    parPage,
    showItem,
}) => {
    let totalPage = Math.ceil(totalItem / parPage);
    let startPage = pageNumber;
    let dif = totalPage - pageNumber;

    if (dif <= showItem) {
        startPage = totalPage - showItem;
    }

    let endPage = startPage < 0 ? showItem : showItem + startPage;

    if (startPage <= 0) {
        startPage = 1;
    }

    const createButton = () => {
        const btns = [];
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li
                    key={i}
                    onClick={() => setPageNumber(i)}
                    className={`${
                        pageNumber === i
                            ? "bg-second shadow-lg shadow-indigo-300/50 text-white rounded-full w-[33px] h-[33px] flex justify-center items-center"
                            : "bg-third hover:bg-second shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#000] w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer "
                    }`}
                >
                    {i}
                </li>
            );
        }
        return btns;
    };

    return (
        <ul className="flex gap-3 ">
            {pageNumber > 1 && (
                <li
                    onClick={() => setPageNumber(pageNumber - 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-third text-[#000] cursor-pointer "
                >
                    <RiArrowLeftDoubleLine />
                </li>
            )}
            {createButton()}
            {pageNumber < totalPage && (
                <li
                    onClick={() => setPageNumber(pageNumber + 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-third text-[#000] cursor-pointer"
                >
                    <RiArrowRightDoubleLine />
                </li>
            )}
        </ul>
    );
};

Pagination.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    setPageNumber: PropTypes.func.isRequired,
    totalItem: PropTypes.number.isRequired,
    parPage: PropTypes.number.isRequired,
    showItem: PropTypes.number.isRequired,
};

export default Pagination;
