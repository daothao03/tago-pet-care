import image from "../../assets/images/hero_image_06.png";
import bookNow from "../../assets/images/bookNow.png";
import star from "../../assets/images/star.png";

const ImageArticle = () => {
    return (
        <section className="mt-[150px] flex justify-center items-center">
            <div className="flex-1 relative">
                <img src={image} alt="" className="w-full object-cover" />
                <img
                    src={star}
                    alt=""
                    className="absolute cursor-pointer top-[100px] right-[700px] z-10 "
                />
            </div>
            <div className="flex-2 relative ">
                <img
                    src={bookNow}
                    alt=""
                    className="w-[90%] object-cover transition-transform duration-500 ease-in-out hover:rotate-30"
                />
                <img
                    src={star}
                    alt=""
                    className="absolute cursor-pointer -top-[50%] right-[50%]"
                />
            </div>
        </section>
    );
};

export default ImageArticle;
