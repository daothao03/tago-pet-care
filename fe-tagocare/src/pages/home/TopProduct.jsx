// import "react-multi-carousel/lib/styles.css";
import { FaArrowRight } from "react-icons/fa";
import Product from "../../components/Product";
import Service from "../../components/Service";
import { responsive } from "../../utils/utils";
import Carousel from "react-multi-carousel";

const TopProduct = () => {
    return (
        <section className="container grid grid-cols-2 gap-[50px] mt-[150px]">
            <div>
                <span className="font-pacifico text-[40px] flex justify-center items-center">
                    Top Product
                </span>

                <div className="mt-10">
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
                    <span className="flex justify-end items-center gap-2 cursor-pointer hover:text-[#ed6436] hover:transform hover:-translate-x-2 duration-500">
                        View More <FaArrowRight />
                    </span>
                </div>
            </div>

            <div className="ml-[5px]">
                <span className="font-pacifico text-[40px] flex justify-center items-center">
                    Top Service
                </span>

                <div className="mt-9 ">
                    {[1, 2].map((i) => (
                        <Service key={i} />
                    ))}

                    <span className="flex justify-end items-center gap-2 cursor-pointer hover:text-[#ed6436] hover:transform hover:-translate-x-2 duration-500">
                        View More <FaArrowRight />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default TopProduct;
