import Title from "../../components/Title";
import kennel from "../../assets/images/kennel.jpg";
import nutri from "../../assets/images/nutri.jpg";
import svon from "../../assets/images/svao.png";
import Button from "../../components/Button";

const ServiceAddOn = () => {
    return (
        <section className="mt-[250px] container">
            <Title
                title="Service Add On"
                desc="Discover a wide variety of Pawsitive services to choose from, including daycare, private walks, office duty and spa."
            />

            <div className="items-center flex justify-between mt-4">
                <div className="flex flex-col justify-center items-center">
                    <img
                        src={kennel}
                        alt=""
                        className="rounded-full w-[200px] h-[200px]"
                    />
                    <h3 className="text-[28px] font-bold mt-1">
                        Pet Accessories
                    </h3>
                    <p className="w-[300px] text-center leading-6 mb-1">
                        We offer long-term and short-term boarding. Every dog
                        has its own private, spacious room, and spa.
                    </p>
                    <Button content="View More" />
                </div>
                <div>
                    <img
                        src={svon}
                        alt=""
                        className="rounded-full w-[373px] h-[373px] object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img
                        src={nutri}
                        alt=""
                        className="rounded-full w-[200px] h-[200px]"
                    />
                    <h3 className="text-[28px] font-bold mt-4">
                        Pet Nutrition
                    </h3>
                    <p className="w-[300px] text-center leading-6 mb-1">
                        We serve only premium food. All meals are nutritionally
                        balanced, to help your pet maintain a healthy lifestyle.
                    </p>
                    <Button content="View More" />
                </div>
            </div>
        </section>
    );
};

export default ServiceAddOn;
