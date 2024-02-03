import AuthLayout from "@/Layout/AuthLayout";
import { Link, usePage } from "@inertiajs/react";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { HiEye, HiEyeSlash, HiUser } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const route = usePage();

    const postLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("/api/login", data)
            .then((res) => {
                route("/");
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    return (
        <AuthLayout title="Login">
            <div className="w-full h-full bg-white grid grid-cols-2 overflow-hidden">
                <div className="w-full h-full">
                    <img
                        src="/img/abroor.png"
                        className="object-cover w-full h-full"
                        alt="Image"
                    />
                </div>
                <form onSubmit={postLogin}>
                    <div className="w-[85%] p-10 flex flex-col mx-auto items-center gap-5">
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className="w-44 h-44"
                        />

                        <div className="space-y-5 w-full text-slate-500 font-semibold">
                            <Input
                                color="blue"
                                size="lg"
                                label="Username"
                                icon={<HiUser className="w-5 h-5" />}
                                className="text-slate-500 text-lg font-poppins"
                                value={data.username}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        username: e.target.value,
                                    })
                                }
                                autoComplete="off"
                            />
                            <Input
                                color="blue"
                                size="lg"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                icon={
                                    showPassword ? (
                                        <HiEye
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : (
                                        <HiEyeSlash
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    )
                                }
                                autoComplete="off"
                                className="text-slate-500 text-lg font-poppins"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button
                                type="submit"
                                color="blue"
                                fullWidth
                                size="lg"
                                variant="gradient"
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            <Button
                                color="blue"
                                fullWidth
                                size="lg"
                                variant="outlined"
                                className="flex gap-2 justify-center items-center"
                            >
                                <FcGoogle className="w-6 h-6" /> Continue With
                                Google
                            </Button>
                            <h1 className="font-normal text-center">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="hover:underline text-blue-500"
                                >
                                    Sign Up
                                </Link>
                            </h1>
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
