import { FaCommentDots, FaRegUser } from "react-icons/fa";
import blog from "../../assets/images/post_03-640x400.jpg";
import { CiFolderOn } from "react-icons/ci";

const Blog = () => {
    return (
        <section className="container mt-[150px]">
            <div className="flex flex-col justify-center items-center">
                <span className="font-bold">PET CARE BLOG</span>
                <span className="font-pacifico text-[48px] mt-2">
                    Lates News
                </span>
            </div>

            <div className="grid grid-cols-3 gap-[20px] cursor-pointer">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i + 1}
                        className="hover:border-[2px] hover:border px-5 py-7 rounded-[20px]"
                    >
                        <img
                            src={blog}
                            alt=""
                            className="w-full object-cover rounded-[20px]"
                        />

                        <div className="mt-2">
                            <div className="flex  items-center gap-[20px]">
                                <span className="flex gap-2 items-center justify-center">
                                    <FaRegUser className="text-[#ed6436]" /> by
                                    Thao Dao
                                </span>
                                <span className="flex gap-2 items-center justify-center">
                                    <FaCommentDots className="text-[#ed6436]" />{" "}
                                    2
                                </span>
                                <span className="flex gap-2 items-center justify-center">
                                    <CiFolderOn className="text-[#ed6436]" />{" "}
                                    Cats
                                </span>
                            </div>
                            <h2 className="text-[24px] font-bold mt-[30px]">
                                Tips and tricks: Puppy’s First Grooming
                            </h2>
                            <p className="line-clamp-2 mt-1">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Cupiditate ullam
                                exercitationem sint dolor quod possimus vitae,
                                reiciendis non id illum!
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
