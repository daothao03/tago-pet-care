const ChangePassword = () => {
    return (
        <div className="p-4 bg-[#fffcf2]">
            <div className="grid grid-cols-2 gap-[30px]">
                <div className="col-span-1">
                    <h2 className="text-xl font-pacifico pb-5">
                        Profile Pet Owner
                    </h2>
                    <form>
                        <div className="flex justify-center">
                            <img
                                src="https://pawsitive.bold-themes.com/coco/wp-content/uploads/sites/3/2019/07/hero_image_02.png"
                                alt=""
                                className=" w-[200px] h-[200px] object-cover rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="font-bold" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="outline-none px-3 py-1 border rounded-md text-slate-600"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-2">
                            <label className="font-bold" htmlFor="name">
                                Gmail
                            </label>
                            <input
                                className="outline-none px-3 py-1 border rounded-md text-slate-600"
                                type="gmail"
                                name="gmail"
                                id="gmail"
                                placeholder="Gmail"
                            />
                        </div>

                        <div>
                            <button className="mt-3 flex items-center gap-4 justify-center   text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-span-1">
                    <h2 className="text-xl font-pacifico pb-5">Profile Pet</h2>
                    <form>
                        <div className="flex justify-center">
                            <img
                                src="https://pawsitive.bold-themes.com/coco/wp-content/uploads/sites/3/2019/07/hero_image_02.png"
                                alt=""
                                className=" w-[200px] h-[200px] object-cover rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="font-bold" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="outline-none px-3 py-1 border rounded-md text-slate-600"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-2">
                            <label className="font-bold" htmlFor="name">
                                Gmail
                            </label>
                            <input
                                className="outline-none px-3 py-1 border rounded-md text-slate-600"
                                type="gmail"
                                name="gmail"
                                id="gmail"
                                placeholder="Gmail"
                            />
                        </div>

                        <div>
                            <button className="mt-3 flex items-center gap-4 justify-center   text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-[50px]">
                <h2 className="text-xl font-pacifico pb-5">Change Password </h2>
                <form>
                    <div className="flex flex-col gap-1 mb-2">
                        <label className="font-bold" htmlFor="old_password">
                            Old Password
                        </label>
                        <input
                            className="outline-none px-3 py-1 border rounded-md text-slate-600"
                            type="password"
                            name="old_password"
                            id="old_password"
                            placeholder="Old Password"
                        />
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                        <label className="font-bold" htmlFor="new_password">
                            New Password
                        </label>
                        <input
                            className="outline-none px-3 py-1 border rounded-md text-slate-600"
                            type="password"
                            name="new_password"
                            id="new_password"
                            placeholder="New Password"
                        />
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                        <label className="font-bold" htmlFor="confirm_password">
                            Confirm Password
                        </label>
                        <input
                            className="outline-none px-3 py-1 border rounded-md text-slate-600"
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div>
                        <button className="mt-3 flex items-center gap-4 justify-center   text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out">
                            Save Change
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
