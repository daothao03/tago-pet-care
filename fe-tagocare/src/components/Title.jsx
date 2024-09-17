import PropTypes from "prop-types";

const Title = (props) => {
    return (
        <div className="flex justify-center items-center py-4 flex-col">
            <span className="font-pacifico text-[57.6px]">{props.title}</span>
            <p className="leading-6 max-w-[600px] text-center mt-3">
                {props.desc}
            </p>
        </div>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};

export default Title;
