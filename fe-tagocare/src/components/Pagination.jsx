import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import PropTypes from "prop-types";

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalItem,
    parPage,
    showItem,
}) => {
    let totalPage = Math.ceil(totalItem / parPage);
    let startPage = currentPage;

    let dif = totalPage - currentPage;
    if (dif <= showItem) {
        startPage = totalPage - showItem;
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage;

    if (startPage <= 0) {
        startPage = 1;
    }

    const createBtn = () => {
        const btns = [];
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={` ${
                        currentPage === i
                            ? "bg-green-700 shadow-lg shadow-indigo-300/50 text-white"
                            : "bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
                    } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}
                >
                    {i}
                </li>
            );
        }
        return btns;
    };

    return (
        <ul className="flex gap-3">
            {currentPage > 1 && (
                <li
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
                >
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            )}
            {createBtn()}
            {currentPage < totalPage && (
                <li
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
                >
                    <MdOutlineKeyboardDoubleArrowRight />
                </li>
            )}
        </ul>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalItem: PropTypes.number,
    setCurrentPage: PropTypes.func,
    parPage: PropTypes.number,
    showItem: PropTypes.number,
};

export default Pagination;
