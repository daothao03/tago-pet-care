import { useEffect, useState } from "react";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
    add_category,
    delete_category,
    get_category,
    get_category_id,
    messageClear,
    update_category,
    update_category_status,
} from "../../store/reducer/cateReducer";
import toast from "react-hot-toast";
import { BiSolidError } from "react-icons/bi";

const Category = () => {
    const dispatch = useDispatch();
    const {
        successMessage,
        errorMessage,
        errors,
        loader,
        categories,
        totalCategory,
        category,
    } = useSelector((state) => state.category);

    const navigate = useNavigate();
    const { cateId } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [typeCate, setTypeCate] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [show, setShow] = useState(false);

    const [state, setState] = useState({
        name: "",
        image: "",
        type: "",
        status: "",
    });

    const [imageShow, setImageShow] = useState("");

    const imageHandle = (e) => {
        let files = e.target.files;
        if (files.length > 0) {
            setImageShow(URL.createObjectURL(files[0]));
            setState({
                ...state,
                image: files[0],
            });
        }
    };

    const handleCategory = (e) => {
        e.preventDefault();

        if (cateId) {
            const obj = {
                oldImage: category.image,
                newImage: state.image,
                name: state.name,
                type: state.type,
                id: cateId,
            };
            dispatch(update_category(obj));
        } else {
            const formData = new FormData();
            formData.append("name", state.name);
            formData.append("image", state.image);
            formData.append("type", state.type);

            dispatch(add_category(formData));
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());

            const obj = {
                parPage: parseInt(parPage),
                currentPage: parseInt(currentPage),
                searchValue,
                typeCate,
            };
            dispatch(get_category(obj));

            setState({
                name: "",
                image: "",
                type: "",
            });
            setImageShow("");
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage && cateId) {
            navigate("/admin/category");
        }
    }, [successMessage, errorMessage]);

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            currentPage: parseInt(currentPage),
            searchValue,
            typeCate,
        };
        dispatch(get_category(obj));
    }, [parPage, currentPage, searchValue, typeCate]);

    useEffect(() => {
        if (cateId) {
            dispatch(get_category_id(cateId));
        } else {
            setState({
                name: "",
                image: "",
                type: "",
            });
            setImageShow("");
        }
    }, [cateId]);

    useEffect(() => {
        if (category) {
            setState({
                name: category.name,
                type: category.type,
                status: category.status,
            });
            setImageShow(`${category.image}`);
        }
    }, [category]);

    const handleDelete = (id, name) => {
        const isConfirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );
        if (isConfirmed) {
            dispatch(delete_category(id));
        }
    };

    const handleChangeStatus = (id, newStatus) => {
        const obj = {
            status: newStatus,
            id,
        };
        dispatch(update_category_status(obj));
    };

    return (
        <div className="px-2 lg:px-7 pt-5 ">
            <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-primary rounded-md">
                <h1 className="text-[#d0d2d6] font-semibold text-lg">
                    Category
                </h1>
                <button
                    onClick={() => setShow(true)}
                    className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap w-full">
                <div className="w-full lg:w-7/12">
                    <div className="w-full p-4 bg-primary rounded-md">
                        <span className="text-white font-bold mb-4 flex">
                            Category Product
                        </span>
                        <div className="flex justify-between gap-[30px]">
                            <div className="flex-1">
                                <Search
                                    setParPage={setParPage}
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            </div>
                            <div className="flex-2">
                                <select
                                    onChange={(e) =>
                                        setTypeCate(e.target.value)
                                    }
                                    className="px-4 py-2 hover:border-indigo-500 outline-none bg-primary border border-slate-700 rounded-md text-white"
                                >
                                    <option value="">Category type</option>
                                    <option value="product">Product</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative overflow-x-auto mt-5">
                            {categories.length > 0 ? (
                                <table className="w-full  text-white table-fixed">
                                    <thead className="border-slate-700 uppercase border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-1 w-[15%]"
                                            >
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-1 w-[20%]"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-1 w-[30%] "
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-1 w-[15%]"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-1 w-[20%]"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-center">
                                        {categories.map((c) => (
                                            <tr key={c._id}>
                                                <td
                                                    scope="row"
                                                    className=" py-3 w-[15%] px-1 text-ellipsis overflow-hidden whitespace-nowrap"
                                                >
                                                    #{c._id}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className=" py-3 px-1 w-[20%] "
                                                >
                                                    <img
                                                        className="w-[50px] h-[50px] rounded-md object-cover mx-auto"
                                                        src={c.image}
                                                        alt={c.name}
                                                    />
                                                </td>
                                                <td
                                                    scope="row"
                                                    className=" py-3 px-1 w-[20%]"
                                                >
                                                    {c.name}
                                                </td>

                                                <td
                                                    scope="row"
                                                    className="py-3 px-1 w-[20%] "
                                                >
                                                    <select
                                                        value={c.status}
                                                        onChange={(e) =>
                                                            handleChangeStatus(
                                                                c._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className=" bg-transparent border focus:outline-none p-1 rounded-full mr-1"
                                                    >
                                                        <option
                                                            className="text-black"
                                                            value="active"
                                                        >
                                                            Active
                                                        </option>
                                                        <option
                                                            className="text-black"
                                                            value="inactive"
                                                        >
                                                            Inactive
                                                        </option>
                                                    </select>
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="text-center py-3 px-1 w-[20%]"
                                                >
                                                    <div className="flex justify-center items-center gap-1">
                                                        <Link
                                                            to={`/admin/category/${c._id}`}
                                                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                                                        >
                                                            <FaEdit />
                                                        </Link>
                                                        <Link
                                                            onClick={() =>
                                                                handleDelete(
                                                                    c._id,
                                                                    c.name
                                                                )
                                                            }
                                                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                                                        >
                                                            <FaTrash />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <span className="flex mt-3 justify-center items-center text-[20px] font-bold text-white">
                                    No records exist
                                </span>
                            )}
                        </div>

                        <div className="w-full justify-end flex mt-4 bottom-4 right-4 ">
                            {totalCategory <= parPage ? (
                                ""
                            ) : (
                                <Pagination
                                    pageNumber={currentPage}
                                    setPageNumber={setCurrentPage}
                                    totalItem={totalCategory}
                                    parPage={parPage}
                                    showItem={3}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
                        show ? "right-0" : "-right-[340px]"
                    } z-[9999] top-0 transition-all duration-500 `}
                >
                    <div className="w-full pl-5">
                        <div className="bg-primary h-screen lg:h-auto px-4 py-[22px] lg:rounded-md text-white">
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="font-semibold  mb-4 w-full text-center ">
                                    Add Category
                                </h1>

                                <div
                                    onClick={() => setShow(false)}
                                    className="block lg:hidden"
                                >
                                    <IoMdCloseCircle />
                                </div>
                            </div>
                            <form onSubmit={handleCategory}>
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label htmlFor="type">Category Type</label>
                                    <select
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                type: e.target.value,
                                            })
                                        }
                                        value={state.type}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        id="type"
                                        name="category_type"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="product">Product</option>
                                        <option value="service">Service</option>
                                    </select>
                                    {errors.type && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.type}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label htmlFor="name">Category Name</label>
                                    <input
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                name: e.target.value,
                                            })
                                        }
                                        value={state.name}
                                        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                                        type="text"
                                        id="name"
                                        name="category_name"
                                        placeholder="Category Name"
                                    />
                                    {errors.name && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.name}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label
                                        className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
                                        htmlFor="image"
                                    >
                                        {imageShow ? (
                                            <img
                                                src={imageShow}
                                                className="w-full h-full object-contain"
                                                alt=""
                                            />
                                        ) : (
                                            <>
                                                <span>
                                                    <FaImage />
                                                </span>
                                                <span>Select Image</span>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        onChange={imageHandle}
                                        className="hidden"
                                        type="file"
                                        name="image"
                                        id="image"
                                    />

                                    {errors.image && (
                                        <span className="text-red-300 flex items-center gap-[10px] pt-1 font-semibold text-sm">
                                            <BiSolidError /> {errors.image}
                                        </span>
                                    )}

                                    <div>
                                        <button
                                            disabled={loader ? true : false}
                                            type="submit"
                                            className="mt-4 bg-red-500 hover:shadow-red-300/50 w-[100%] text-white font-semibold p-3"
                                        >
                                            {loader ? (
                                                <PropagateLoader
                                                    color="#fff"
                                                    cssOverride={overrideStyle}
                                                />
                                            ) : (
                                                "Add Category"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
