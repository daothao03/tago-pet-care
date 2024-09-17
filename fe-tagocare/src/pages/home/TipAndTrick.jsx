import { FaCheck } from "react-icons/fa";

const TipAndTrick = () => {
    const brings = [
        {
            title: "Bring Your Own Food",
            desc: "Use small plastic baggies to package pre-measured meals and label them Breakfast, Lunch and Dinner.",
            color: "#cfecbc",
        },
        {
            title: "Medicine & supplements",
            desc: "Make sure to include the appropriate number of doses that your dog will need to take in your absence.",
            color: "#ffbaa0",
        },
        {
            title: "Favorite toys",
            desc: "Even though we're equipped with all sorts of toys, almost every dog has ther favorites that they just can't live without.",
            color: "#afe2e5",
        },
        {
            title: "At least 1 leash",
            desc: "It's always a good idea to include 2 in case the other is lost. If you don't have more than one, we'll give you.",
            color: "#cfecbc",
        },
        {
            title: "Documents Required",
            desc: "Be sure that all required documents and forms are ready to present on drop off day. Contact us for more info.",
            color: "#faf4b6",
        },
        {
            title: "A reminder of Home",
            desc: "To keep your dog feeling close to you even in your absence, include something with your scent, ex. scarf.",
            color: "#ffbaa0",
        },
    ];
    return (
        <section className="container mt-[150px]">
            <div className="flex flex-col justify-center items-center">
                <span className="font-bold">TIPS AND TRICKS </span>
                <span className="font-pacifico text-[48px] mt-2">
                    What to Bring
                </span>
            </div>

            <div className="mt-[40px] grid grid-cols-3 gap-[20px]">
                {brings.map((b, index) => (
                    <div key={index + 1} className="flex items-start">
                        <div
                            style={{ backgroundColor: b.color }}
                            className={`mr-4  w-[43px] h-[43px] flex items-center justify-center rounded-full flex-shrink-0`}
                        >
                            <FaCheck className="w-[20px] h-[20px]" />
                        </div>
                        <div>
                            <span className="font-bold text-[20px]">
                                {b.title}
                            </span>
                            <p>{b.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TipAndTrick;
