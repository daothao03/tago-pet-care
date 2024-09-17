import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-150">
            <div className="bg-white rounded-lg p-6 w-[80%] max-w-[600px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={20} />
                </button>
                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
