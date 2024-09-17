import HeaderPageCommon from "../components/HeaderPageCommon";
import Footer from "../layout/Footer";
import AllServices from "./services/AllServices";
import IntroService from "./services/IntroService";

const Services = () => {
    return (
        <div>
            <HeaderPageCommon
                title="SERVICE"
                desc={"The Highest Possible Standards Of Pet Care"}
                showBookNow={true}
            />
            <IntroService />
            <AllServices />
            <Footer />
        </div>
    );
};

export default Services;
