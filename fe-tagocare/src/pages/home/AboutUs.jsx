import { FaArrowRight } from "react-icons/fa";
import Title from "../../components/Title";

const AboutUs = () => {
    return (
        <section className="container mt-[60px]">
            <Title
                title="About us"
                desc="From the time our friends sniff their way through the door until
                they wag their tails out in the afternoon, we cater to their
                nature."
            />
            <div className="grid grid-cols-3 gap-[50px]">
                <div className="relative  flex flex-col justify-center items-center cursor-pointer group">
                    <svg
                        className="absolute top-[10px] right-[80px] p-2 z-20 w-[90px] h-[90px] bg-white rounded-full"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                    >
                        <path
                            fill="#7ac143"
                            d="M88.51,27.91l4.84,25.39a2.88,2.88,0,0,1-2.83,3.42H87.1A2.88,2.88,0,0,1,84.45,55L72.66,27.86a2.88,2.88,0,0,1,3.12-4L86.15,25.6A2.88,2.88,0,0,1,88.51,27.91Z"
                        ></path>
                        <path
                            fill="#7ac143"
                            d="M11.54,29.19,6.7,54.58A2.88,2.88,0,0,0,9.54,58H13a2.88,2.88,0,0,0,2.64-1.73L27.39,29.15a2.88,2.88,0,0,0-3.12-4L13.9,26.89A2.88,2.88,0,0,0,11.54,29.19Z"
                        ></path>
                        <circle
                            fill="#282828"
                            cx="39.77"
                            cy="48.52"
                            r="5.16"
                        ></circle>
                        <circle
                            fill="#282828"
                            cx="60.41"
                            cy="48.52"
                            r="5.16"
                        ></circle>
                        <path
                            fill="#7ac143"
                            d="M96.52,39.31a18.71,18.71,0,0,0-12.8-15.82l-17-5.54a34.11,34.11,0,0,0-36.8,2L16.28,24.39A18.7,18.7,0,0,0,3.48,40.19L2,53l0,.36a8.75,8.75,0,0,0,8.74,8.75h.06a8.7,8.7,0,0,0,7.7-4.71l2.14-4L23.42,66c0,.08,0,.17.06.25A28.37,28.37,0,0,0,50.77,86.5,28.69,28.69,0,0,0,78.65,64c0-.1,0-.2.05-.3l1.2-10.19,1.56,3a8.72,8.72,0,0,0,7.72,4.75h.06A8.75,8.75,0,0,0,98,52.49ZM12.88,54.48a2.38,2.38,0,0,1-2.11,1.3,2.22,2.22,0,0,1-1.7-.69,2.37,2.37,0,0,1-.7-1.55L9.8,40.87a12.34,12.34,0,0,1,8.44-10.44l8.89-2.9Zm59.53,8.34A22.31,22.31,0,0,1,53.83,79.91c0-.05,0-.1,0-.16v-7a3.51,3.51,0,0,0,0-.44c3.61-1,6.17-3.38,6.17-6.22,0-3.68-4.28-6.66-9.57-6.66s-9.57,3-9.57,6.66c0,2.79,2.47,5.18,6,6.17a3.51,3.51,0,0,0,0,.49v7A22,22,0,0,1,29.6,64.55L25.26,44.68,36.6,23.24a27.84,27.84,0,0,1,13.31-3.39A28.13,28.13,0,0,1,64.17,23.8l10.5,19.84Zm18.53-8.64a2.57,2.57,0,0,1-1.7.69,2.4,2.4,0,0,1-2.13-1.33L72.86,26.64l8.89,2.9A12.36,12.36,0,0,1,90.2,40l1.43,12.63A2.36,2.36,0,0,1,90.93,54.18Z"
                        ></path>
                    </svg>

                    <svg
                        className="item__svg w-[80%] z-4"
                        viewBox="0 0 500 500"
                    >
                        <clipPath id="bt_bb_organic_animation_66c807f8d2a7e">
                            <path
                                className="item__clippath"
                                d="M 425.19903,237.13547 C 394.81904,150.86547 291.179,38.445457 204.939,68.795457 118.699,99.145457 36.059001,277.17547 66.409001,363.42547 96.759001,449.67546 200.869,452.94546 287.119,422.59546 373.36904,392.24547 455.55903,323.37547 425.19903,237.13547 Z"
                            ></path>
                        </clipPath>
                        <g className="item__deco">
                            <path
                                className="item__clippath"
                                fill="#edede9"
                                d="M 311.11885,443.38994 C 398.5941,388.32207 496.55772,245.97207 441.53041,158.52239 386.5031,71.072708 169.62055,24.543084 82.15985,79.572899 -5.3008629,134.60271 17.145777,250.15909 72.175578,337.61978 127.20541,425.08053 223.67166,498.42827 311.11885,443.38994 Z"
                            ></path>
                        </g>
                        <g clipPath="url(#bt_bb_organic_animation_66c807f8d2a7e)">
                            <image
                                className="item__img w-full h-full object-cover"
                                href="https://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/07/organic_background_01.jpg"
                                x="0"
                                y="0"
                                height="500px"
                                width="500px"
                            ></image>
                        </g>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <span className="text-white font-bold font-pacifico text-[26px] mb-2 text-center">
                            Pet Boarding
                        </span>
                        <span className="flex items-center gap-1 text-[13px] mt-4 text-white font-bold transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            VIEW MORE <FaArrowRight />
                        </span>
                    </div>
                </div>

                <div className="relative  flex flex-col justify-center items-center cursor-pointer group">
                    <svg
                        className="absolute top-[10px] right-[50px] p-2 z-20 w-[90px] h-[90px] bg-white rounded-full"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                    >
                        <path
                            fill="#7ac143"
                            d="M79.92,28.24,77.15,17.13a2.53,2.53,0,0,0-2.46-1.92h0a2.53,2.53,0,0,0-2.11,1.13l-5.36,8a2.53,2.53,0,0,1-1.54,1.06l-6.56,1.51S50,25.32,50,43c0,11.67,11.59,16.92,18.26,15.25S80,50.6,80,47.91V28.85A2.53,2.53,0,0,0,79.92,28.24Z"
                        ></path>
                        <path
                            fill="#282828"
                            d="M44.07,74.44a8,8,0,0,0,5.5-2.2,8,8,0,0,0,12.88-2.69,2.5,2.5,0,1,0-4.61-1.95,3,3,0,0,1-5.77-1.17A2.25,2.25,0,0,0,52,66a5,5,0,0,0,1.19-1.18l2-2.82a3.47,3.47,0,0,0-3-5.84H46.91a3.47,3.47,0,0,0-3,5.84l2,2.82A5.06,5.06,0,0,0,47.11,66a2.22,2.22,0,0,0,0,.41,3,3,0,0,1-5.77,1.17,2.5,2.5,0,1,0-4.61,1.95A8,8,0,0,0,44.07,74.44Z"
                        ></path>
                        <circle
                            fill="#282828"
                            cx="37.47"
                            cy="46.36"
                            r="5.1"
                        ></circle>
                        <circle
                            fill="#282828"
                            cx="61.68"
                            cy="46.36"
                            r="5.1"
                        ></circle>
                        <path
                            className="cls-2"
                            fill="#282828"
                            d="M90.29,66.69l-8.4-2.87A34.07,34.07,0,0,0,83.23,58l6.37-1.69A3.26,3.26,0,1,0,87.93,50l-4.44,1.18a33.91,33.91,0,0,0-1.16-7,26.74,26.74,0,0,1-1-7.18V18.1a5.31,5.31,0,0,0-3.32-5A5.4,5.4,0,0,0,76,12.7a5.33,5.33,0,0,0-3.77,1.57c-2.26,2.24-5.71,5.66-8.52,8.48a65.35,65.35,0,0,0-14-1.24,66.3,66.3,0,0,0-14.15,1.25c-2.82-2.82-6.27-6.25-8.53-8.49a5.33,5.33,0,0,0-3.77-1.57,5.41,5.41,0,0,0-2.09.42,5.31,5.31,0,0,0-3.32,5V37a28.63,28.63,0,0,1-1,7.44A33.81,33.81,0,0,0,15.67,51l-3.6-1a3.26,3.26,0,1,0-1.67,6.3l5.49,1.45a33.5,33.5,0,0,0,1.47,6.31L9.71,66.69a3.26,3.26,0,1,0,2.11,6.16L20,70.05A34,34,0,0,0,45.91,87.11a35.45,35.45,0,0,0,3.69.19A33.9,33.9,0,0,0,79.27,69.81l8.9,3a3.26,3.26,0,0,0,2.11-6.16ZM76.41,59.81c-.16.66-.34,1.31-.55,1.95l-3-1Zm-49.31.93L23.38,62c-.28-.85-.52-1.65-.7-2.45Zm12.32,2.67a3.3,3.3,0,0,0,.49-.23l.19-.12.29-.21.18-.16a3.7,3.7,0,0,0,.27-.3l.11-.14a3.76,3.76,0,0,0,.24-.38l.07-.12a3.77,3.77,0,0,0,.17-.46l0-.15a3.21,3.21,0,0,0,.09-.59,1.62,1.62,0,0,0,0-.19l-.3,0,.29-.16a2.42,2.42,0,0,0,0-.3,4.32,4.32,0,0,0-.11-.47,1,1,0,0,0,0-.16,3.23,3.23,0,0,0-.26-.57,2.55,2.55,0,0,0-.2-.29l-.24.18.16-.29-.1-.13a2.71,2.71,0,0,0-.25-.24l-.2.23.11-.31-.12-.11a4,4,0,0,0-.43-.27l-.11-.06a3.23,3.23,0,0,0-.61-.23L22,52.65a27.52,27.52,0,0,1,.92-6.53A35,35,0,0,0,24.16,37V20.47c2.22,2.21,5,4.94,7.22,7.19a5.41,5.41,0,0,0,3.8,1.58,5.25,5.25,0,0,0,1.43-.2c2.55-.72,7.54-1.17,13-1.17S60,28.33,62.53,29a5.23,5.23,0,0,0,1.45.2,5.41,5.41,0,0,0,3.8-1.58c2.23-2.23,5-5,7.21-7.19V37a33.12,33.12,0,0,0,1.19,8.89,27.5,27.5,0,0,1,1,7L60.83,57.2a3.28,3.28,0,0,0-.59.22,2.75,2.75,0,0,0-.31.19l.17.25-.26-.19-.13.08a2.42,2.42,0,0,0-.23.2l.21.21-.32-.11-.13.13a2.13,2.13,0,0,0-.16.21l.25.17-.34,0a1.64,1.64,0,0,0-.12.18,3.36,3.36,0,0,0-.27.59,2.29,2.29,0,0,0-.06.24,3,3,0,0,0-.09.38,2.16,2.16,0,0,0,0,.29h.3l-.3.15a1.59,1.59,0,0,0,0,.2,3.73,3.73,0,0,0,.1.63l0,.13a3.37,3.37,0,0,0,.16.43l.09.17a3.33,3.33,0,0,0,.21.34l.14.17a3.31,3.31,0,0,0,.25.27l.17.15a3.45,3.45,0,0,0,.34.25l.15.09a3.69,3.69,0,0,0,.54.25l12.5,4.28a27.55,27.55,0,0,1-5.08,6.13,27.15,27.15,0,0,1-18.44,7.09,29.25,29.25,0,0,1-3-.16A27.71,27.71,0,0,1,26.17,67.95Z"
                        ></path>
                    </svg>
                    <svg
                        className="item__svg w-[80%] z-4"
                        viewBox="0 0 500 500"
                    >
                        <clipPath id="bt_bb_organic_animation_66c807f8d38d5">
                            <path
                                className="item__clippath"
                                d="M 174.97,61.21256 C 98.007502,86.689796 29.429107,190.26065 48.620077,269.02627 c 6.746146,27.68825 51.402893,25.88827 73.040613,44.43439 48.72155,41.76021 59.88283,148.79229 124.03303,147.22485 C 364.38199,457.78549 492.94409,291.92403 461.59793,177.41319 434.37802,77.975972 272.84228,28.813467 174.97,61.21256 Z"
                                // style="transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);"
                            ></path>
                        </clipPath>
                        <g
                            className="item__deco"
                            // style="transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);"
                        >
                            <path
                                className="item__clippath"
                                fill="#edede9"
                                d="m 417.66764,122.60111 c 35.4998,88.51738 37.37538,227.08554 -39.59848,283.42363 C 295.22892,466.66577 133.05023,438.74345 74.421836,354.46182 31.268508,292.3847 30.412445,140.21353 130.60244,151.53244 c 100.19,11.40733 111.76057,-102.787749 194.07332,-102.504209 39.50577,0.126551 78.28615,36.874869 92.99188,73.572879 z"
                            ></path>
                        </g>
                        <g clipPath="url(#bt_bb_organic_animation_66c807f8d38d5)">
                            <image
                                className="item__img"
                                href="https://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/07/organic_background_02.jpg"
                                x="0"
                                y="0"
                                height="500px"
                                width="500px"
                                // style="transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);"
                            ></image>
                        </g>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <span className="text-white font-bold font-pacifico text-[26px] mb-2 text-center">
                            Pet Daycare
                        </span>
                        <span className="flex items-center gap-1 text-[13px] mt-4 text-white font-bold transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            VIEW MORE <FaArrowRight />
                        </span>
                    </div>
                </div>

                <div className="relative  flex flex-col justify-center items-center cursor-pointer group">
                    <svg
                        className="absolute top-[15px] right-[60px] p-2 z-20 w-[90px] h-[90px] bg-white rounded-full"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                    >
                        <title>Icons-Pawsitive</title>
                        <path
                            fill="#7ac143"
                            d="M63.42,70.5a3,3,0,0,1,3,3v3.72h9.41a3.73,3.73,0,0,0,3.68-4.26L77.61,59.7H22.39L20.5,73a3.73,3.73,0,0,0,3.68,4.25h9.41V73.49a3,3,0,0,1,6,0v3.72H47V73.49a3,3,0,0,1,6,0v3.72h7.44V73.49A3,3,0,0,1,63.42,70.5Z"
                        ></path>
                        <path
                            fill="#282828"
                            d="M24.12,83.27a9.74,9.74,0,0,1-9.63-11.1l1.87-13L16.09,59A9.69,9.69,0,0,1,10,50V43.27a9.74,9.74,0,0,1,9.73-9.72h10.7l.05-.3a19.79,19.79,0,0,1,39,0l.05.31h10.7A9.74,9.74,0,0,1,90,43.27V50a9.69,9.69,0,0,1-6.09,9l-.27.11,1.87,13a9.74,9.74,0,0,1-9.63,11.11ZM63.46,70.55a3,3,0,0,1,3,3v3.73h9.43A3.74,3.74,0,0,0,79.57,73l-1.9-13.28H22.32L20.42,73a3.74,3.74,0,0,0,3.69,4.26h9.43V73.55a3,3,0,0,1,6,0v3.73H47V73.55a3,3,0,0,1,6,0v3.73h7.46V73.55A3,3,0,0,1,63.46,70.55Zm-43.73-31A3.73,3.73,0,0,0,16,43.27V50a3.73,3.73,0,0,0,3.73,3.73H80.27A3.73,3.73,0,0,0,84,50V43.27a3.73,3.73,0,0,0-3.73-3.73ZM50,22.72A13.82,13.82,0,0,0,36.63,33.09l-.12.46h27l-.12-.46A13.82,13.82,0,0,0,50,22.72Z"
                        ></path>
                    </svg>
                    <svg
                        className="item__svg w-[80%] z-4 "
                        viewBox="0 0 500 500"
                    >
                        <clipPath id="bt_bb_organic_animation_66c807f8d3d9c">
                            <path
                                className="item__clippath"
                                d="M 97.669577,390.57122 C 138.14414,416.7801 150.59121,342.41477 257.74761,359.01216 413.59251,385.34724 471.3152,331.80366 466.72721,267.61973 462.34699,206.3422 375.72138,43.061192 208.10497,86.245819 67.59381,122.44705 -8.625995,321.74066 97.669577,390.57122 Z"
                                // style="transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);"
                            ></path>
                        </clipPath>
                        <g
                            className="item__deco"
                            // style="transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);"
                        >
                            <path
                                className="item__clippath"
                                fill="#edede9"
                                d="M 432.77835,226.29008 C 462.69362,75.6278 262.32051,65.4776 173.95107,41.551745 85.58162,17.625869 140.73738,116.97123 110.8221,267.6335 80.9068,418.29578 38.342527,455.60093 128.28643,467.87027 233.89681,482.24407 402.86305,376.95235 432.77835,226.29008 Z"
                            ></path>
                        </g>
                        <g clipPath="url(#bt_bb_organic_animation_66c807f8d3d9c)">
                            <image
                                className="item__img"
                                href="https://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/07/organic_background_03.jpg"
                                x="0"
                                y="0"
                                height="500px"
                                width="500px"
                                // style="transform: scaleX(1) scaleY(1) translateX(0px) translateY(0px) rotate(0deg);"
                            ></image>
                        </g>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <span className="text-white font-bold font-pacifico text-[26px] mb-2 text-center">
                            Pet Transport
                        </span>
                        <span className="flex items-center gap-1 text-[13px] mt-4 text-white font-bold transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            VIEW MORE <FaArrowRight />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
