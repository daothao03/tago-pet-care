import { FaRegMinusSquare, FaRegPlusSquare, FaStar } from "react-icons/fa";
import Rating from "../components/Rating";
import Header2 from "../layout/Header2";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import RatingReact from "react-rating";
import Carousel from "react-multi-carousel";
import { responsive } from "../utils/utils";
import Product from "../components/Product";
import Footer from "../layout/Footer";

const ProductDetail = () => {
    const [openDesc, setOpenDesc] = useState(true);
    const [openReview, setOpenReview] = useState(false);

    return (
        <>
            <Header2 />
            <div className="container ">
                <div className=" mt-[100px] grid grid-cols-2 gap-[50px]">
                    <img
                        src="https://pawsitive.bold-themes.com/coco/wp-content/uploads/sites/3/2018/09/product_07.jpg"
                        alt=""
                        className="w-[420px] h-[420px] object-cover "
                    />
                    <div>
                        <h4 className="font-bold text-[#ed6436]">FOOD</h4>
                        <h2 className="font-pacifico text-[48px] mt-[10px] font-[800]">
                            Cookie Bones
                        </h2>
                        <div className="flex items-center mt-5">
                            <Rating ratings={3} />
                        </div>
                        <div className="font-pacifico flex items-center gap-10">
                            <span className=" text-[40px]">$25</span>
                            <span className="text-[30px] text-[#ed6436] line-through">
                                $40
                            </span>
                        </div>
                        <p className="mt-3">
                            Pellentesque habitant morbi tristique senectus et
                            netus et malesuada fames ac turpis egestas.
                            Vestibulum tortor quam, feugiat vitae, ultricies
                            eget, tempor sit amet, ante. Donec eu libero sit
                            amet quam egestas semper. Aenean ultricies mi vitae
                            est. Mauris placerat eleifend leo.
                        </p>
                        <div className="flex mt-5 flex-col ">
                            <label className="font-semibold text-[17px]">
                                Color
                            </label>
                            <select
                                className="w-[50%] mt-1 outline-none border px-3 py-1 rounded-full"
                                id="color"
                                name="attribute_color"
                                data-attribute_name="attribute_color"
                                data-show_option_none="yes"
                            >
                                <option value="">Choose an option</option>
                                <option value="Black">Black</option>
                                <option value="Red">Red</option>
                            </select>
                        </div>
                        <div className="flex mt-5 flex-col ">
                            <label className="font-semibold text-[17px]">
                                Color
                            </label>
                            <div className="flex  gap-[20px] items-center">
                                <input
                                    className="border mt-1 px-5 py-1 border-[2px] border-[#ed6436] rounded-full"
                                    type="number"
                                    id="quantity_66ccaa3e7621f"
                                    step="1"
                                    min="1"
                                    max="10"
                                    name="quantity"
                                    value="1"
                                    title="Qty"
                                    size="4"
                                ></input>
                                <div className="flex text-[16px] text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]">
                                    <button className="flex items-center">
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-[100px]">
                    <span
                        onClick={() => setOpenDesc(!openDesc)}
                        className="flex font-pacifico text-[23px] justify-between items-center"
                    >
                        Description{" "}
                        {!openDesc ? <FaRegPlusSquare /> : <FaRegMinusSquare />}
                    </span>
                    {openDesc && (
                        <p className="mt-[30px]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Velit, in.
                        </p>
                    )}
                </div>

                <div className="mt-[70px]">
                    <span
                        onClick={() => setOpenReview(!openReview)}
                        className="flex font-pacifico text-[23px] justify-between items-center"
                    >
                        1 review for Cookie Bones
                        {!openReview ? (
                            <FaRegPlusSquare />
                        ) : (
                            <FaRegMinusSquare />
                        )}
                    </span>
                    {openReview && (
                        <div>
                            <div className="mt-[30px] flex items-center gap-[20px]">
                                <img
                                    src="https://secure.gravatar.com/avatar/b257f0407f4e10bef1c961d3256bd0f3?s=140&d=mm&r=g"
                                    alt=""
                                    className="w-[50px] h-[50px] rounded-full object-cover"
                                />
                                <div className="flex flex-1 justify-between ">
                                    <div>
                                        <span className="font-pacifico text-[20px]">
                                            BoldThemes
                                        </span>
                                        <p>
                                            Aenean ultricies mi vitae est.
                                            Mauris placerat eleifend leo.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-[20px]">
                                        <span>July 15, 2019 at 2:40 pm</span>
                                        <div className="flex items-center">
                                            <Rating ratings={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[50px]">
                                <span className="flex font-pacifico text-[23px] justify-between items-center">
                                    Add Review
                                </span>
                                <div className="flex flex-col gap-3 mt-[20px]">
                                    <div className="flex gap-1">
                                        <RatingReact
                                            emptySymbol={
                                                <span className="text-slate-600 text-4xl">
                                                    <CiStar />
                                                </span>
                                            }
                                            fullSymbol={
                                                <span className="text-[#Edbb0E] text-4xl">
                                                    <FaStar />
                                                </span>
                                            }
                                        />
                                    </div>
                                    <form>
                                        <textarea
                                            required
                                            className="border outline-0 p-3 w-full rounded-[20px]"
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="5"
                                            placeholder="Enter reviews..."
                                        ></textarea>
                                        <div className="mt-2 ">
                                            <button className="text-[17px] text-white cursor-pointer  font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-[70px]">
                    <span className="flex font-pacifico text-[23px] justify-between items-center">
                        Related products
                    </span>
                    <div className="mt-[30px]">
                        <Carousel
                            autoPlay={true}
                            infinite={true}
                            responsive={responsive}
                            arrows={true}
                            transitionDuration={500}
                            itemClass="mx-2.5"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <Product key={i} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
