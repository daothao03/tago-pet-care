import Button from "./Button";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Modal from "./ModalService";
import PropTypes from "prop-types";
import { formatPrice } from "../utils/utils";

const Service = ({ images, name, desc, short_desc, price, discount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // const renderShortDescWithIcons = (string) => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(string, "text/html");
    //     const listItems = doc.querySelectorAll("li");

    //     return Array.from(listItems).map((item, index) => (
    //         <li key={index} className="flex gap-3">
    //             <FaCheck className="text-[#ed6436]" />
    //             <span dangerouslySetInnerHTML={{ __html: item.innerHTML }} />
    //         </li>
    //     ));
    // };
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
            <div>
                <h3 className="text-[23px] font-bold">{name}</h3>
                <span className="mt-3 flex  font-semibold text-[#ed6436]">
                    Benefits:
                </span>
                <div className="grid grid-cols-3">
                    <div className="col-span-2 descriptionCss">
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

                    <div className="col-span-1 mt-2">
                        {/* <span className="font-semibold text-red-600 text-[17px] ">
                            {formatPrice(price)} / day
                        </span> */}
                        {discount > 0 ? (
                            <div>
                                <span className="font-semibold text-red-600 mr-2">
                                    {formatPrice(
                                        price - price * (discount / 100)
                                    )}
                                </span>
                                <span className="text-[14px]  line-through">
                                    {formatPrice(price)} / day
                                </span>
                            </div>
                        ) : (
                            <span className="font-semibold text-red-600 ">
                                {formatPrice(price)} / day
                            </span>
                        )}
                        <div className="inline-block mt-1">
                            <Button content="Book Now" />
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
};

export default Service;
