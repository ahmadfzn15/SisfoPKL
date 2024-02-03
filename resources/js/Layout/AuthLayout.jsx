import { Head } from "@inertiajs/react";

export default function AuthLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="w-screen h-screen flex justify-center items-center bg-slate-200 font-poppins">
                {children}
            </div>
        </>
    );
}
