import Footer from "../layout/Footer";
import AboutUs from "./home/AboutUs";
import ActivitiesAndExercise from "./home/ActivitiesAndExercise";
import Blog from "./home/Blog";
import Header from "./home/Header";
import ImageArticle from "./home/ImageArticle";
import ServiceAddOn from "./home/ServiceAddOn";
import TipAndTrick from "./home/TipAndTrick";
import TopProduct from "./home/TopProduct";

const Home = () => {
    return (
        <div>
            <Header />
            <AboutUs />
            <ActivitiesAndExercise />
            <ServiceAddOn />
            <TopProduct />
            <TipAndTrick />
            <ImageArticle />
            <Blog />
            <Footer />
        </div>
    );
};

export default Home;
