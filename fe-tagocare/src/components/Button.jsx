import PropTypes from "prop-types";

const Button = (props) => {
    return (
        <div className="flex text-[13px] text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]">
            <button className="flex items-center">{props.content}</button>
        </div>
    );
};

Button.propTypes = {
    content: PropTypes.string.isRequired,
};

export default Button;
