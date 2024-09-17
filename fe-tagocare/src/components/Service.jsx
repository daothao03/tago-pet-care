import { FaCheck } from "react-icons/fa";
import bath from "../assets/images/bath.png";
import Button from "./Button";
import { useState } from "react";
import Modal from "./ModalService";

const Service = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="mb-5 flex gap-[40px] border-[2px] rounded-[20px] px-4 py-3">
            <img
                src={bath}
                alt=""
                className="w-[250px] h-[150px] object-cover rounded-[20px]"
            />
            <div>
                <h3 className="text-[23px] font-bold">Dog Grooming Package</h3>
                <span className="mt-3 flex  font-semibold text-[#ed6436]">
                    Benefits:
                </span>
                <div className="grid grid-cols-3">
                    <div className="col-span-2">
                        <ul
                            className={`ml-5 text-[13px] font-medium overflow-hidden transition-max-height duration-300 ease-in-out`}
                        >
                            <li className="flex gap-3">
                                <FaCheck className="text-[#ed6436]" /> BATHING
                            </li>
                            <li className="flex gap-3">
                                <FaCheck className="text-[#ed6436]" /> PAW AND
                                PAD TREATMENT
                            </li>
                            <li className="flex gap-3">
                                <FaCheck className="text-[#ed6436]" /> TWO STEP
                                DENTAL
                            </li>
                        </ul>
                        <span
                            onClick={openModal}
                            className="text-[#ed6436] cursor-pointer mt-2 inline-block"
                        >
                            Xem chi tiết
                        </span>
                    </div>

                    <div className="col-span-1 mt-2">
                        <span className="font-semibold text-red-600 text-[17px] ">
                            $25.00 / day
                        </span>
                        <div className="inline-block mt-1">
                            <Button content="Book Now" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">Dog Grooming Package</h2>
                <ul
                    className={`ml-5 text-[13px] font-medium overflow-hidden transition-max-height duration-300 ease-in-out`}
                >
                    <li className="flex gap-3">
                        <FaCheck className="text-[#ed6436]" /> BATHING
                    </li>
                    <li className="flex gap-3">
                        <FaCheck className="text-[#ed6436]" /> PAW AND PAD
                        TREATMENT
                    </li>
                    <li className="flex gap-3">
                        <FaCheck className="text-[#ed6436]" /> TWO STEP DENTAL
                    </li>
                </ul>
            </Modal>
        </div>
    );
};

export default Service;
