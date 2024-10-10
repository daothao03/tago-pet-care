import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Modal from "./ModalService";
import PropTypes from "prop-types";
import { formatPrice } from "../utils/utils";

import { Link } from "react-router-dom";

const Service = ({
    images,
    name,
    desc,
    short_desc,
    price,
    discount,
    slug,
    time,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const renderShortDescWithIcons = (string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(string, "text/html");
        const childNodes = doc.body.childNodes;

        return Array.from(childNodes).map((node, index) => {
            if (node.nodeName === "UL") {
                return (
                    <ul key={index} className="ml-5">
                        {Array.from(node.childNodes).map((liNode, liIndex) => (
                            <li key={liIndex} className="flex gap-3">
                                <FaCheck className="text-[#ed6436]  " />
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: liNode.innerHTML,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                );
            } else {
                return (
                    <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                    ></div>
                );
            }
        });
    };

    return (
        <div className="mb-5 flex gap-[40px] border-[2px] rounded-[20px] px-4 py-3">
            <img
                src={images?.[0]}
                alt=""
                className="w-[250px] h-[150px] object-cover rounded-[20px]"
            />
            <div className="w-full">
                <h3 className="text-[23px] font-bold">{name}</h3>
                <span className="mt-3 flex  font-semibold text-[#ed6436]">
                    Times: {time} minutes
                </span>
                <span className="mt-3 flex  font-semibold text-[#ed6436]">
                    Benefits:
                </span>
                <div className="grid grid-cols-3 gap-[30px]">
                    <div className="col-span-2">
                        <ul
                            className={`ml-5 text-[13px] font-medium overflow-hidden transition-max-height duration-300 ease-in-out`}
                        >
                            {renderShortDescWithIcons(short_desc)}
                        </ul>
                        <span
                            onClick={openModal}
                            className="text-[#ed6436] cursor-pointer mt-2 inline-block"
                        >
                            Xem chi tiết
                        </span>
                    </div>

                    <div className="col-span-1 ">
                        <div>
                            {discount > 0 ? (
                                <>
                                    <span className="font-semibold text-red-600 mr-2">
                                        {formatPrice(
                                            price - price * (discount / 100)
                                        )}
                                    </span>
                                    <span className="block text-[14px] line-through font-semibold">
                                        {formatPrice(price)} / day
                                    </span>
                                </>
                            ) : (
                                <span className="font-semibold text-red-600 mr-2">
                                    {formatPrice(price)} /day
                                </span>
                            )}

                            {/* <div className="mt-2">
                                <Range
                                    step={1}
                                    min={1}
                                    max={30}
                                    values={[days]}
                                    onChange={(values) => setDays(values[0])}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            className="w-full h-[6px] bg-[#ed6436] rounded-full cursor-pointer"
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            className="w-[15px] h-[15px] bg-[#ed6436] rounded-full"
                                            {...props}
                                        />
                                    )}
                                />
                                <span className="text-slate-800 flex mt-2 text-[14px] font-semibold">
                                    Selected Days: {days}
                                </span>
                            </div> */}

                            <Link
                                to={`/service/detail/${slug}`}
                                className=" text-[13px] text-white cursor-pointer inline-block gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]"
                            >
                                Book now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">{name}</h2>

                <div>{renderShortDescWithIcons(desc)}</div>
            </Modal>
        </div>
    );
};

Service.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    desc: PropTypes.string,
    short_desc: PropTypes.string,
    slug: PropTypes.string,
    time: PropTypes.number,
};

export default Service;
