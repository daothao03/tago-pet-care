import bookNow from "../assets/images/bookNow.png";
import PropTypes from "prop-types";
import Header2 from "../layout/Header2";

const HeaderPageCommon = ({
    title = null,
    desc = null,
    showBookNow = true,
}) => {
    return (
        <section className="relative custom-bg-position bg-service  text-white h-[100vh]">
            <Header2 />

            <div className="container flex mt-[180px] flex-col h-[100vh]">
                <p className="text-[#bcf3f8] text-[1.4rem] font-bold flex mb-5">
                    {title}
                </p>
                <p className="font-pacifico w-[70%] text-[60.6px] mb-10">
                    {desc}
                </p>
                {showBookNow && (
                    <img
                        className="absolute cursor-pointer left-0 bottom-2 z-10 transition-transform duration-500 ease-in-out hover:rotate-30"
                        src={bookNow}
                        alt=""
                    />
                )}
            </div>
        </section>
    );
};
HeaderPageCommon.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    showBookNow: PropTypes.bool.isRequired,
};

export default HeaderPageCommon;
