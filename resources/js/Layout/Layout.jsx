import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { Head, Link, usePage } from "@inertiajs/react";
import { Breadcrumbs } from "@material-tailwind/react";

export default function Layout({ children, className = "", title = "" }) {
    const path = usePage();

    return (
        <>
            <Head title={title} />
            <div className="bg-slate-100 min-h-screen font-poppins">
                <Navbar />
                <Sidebar />
                <div className="pl-56 pt-16">
                    <div className="px-5 py-3 space-y-5">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-slate-800 font-bold">
                                {title}
                            </h1>
                            <Breadcrumbs>
                                <Link href="/">Dashboard</Link>
                                {path.url != "/" && (
                                    <Link
                                        href={`/${title.toLocaleLowerCase()}`}
                                    >
                                        {title}
                                    </Link>
                                )}
                            </Breadcrumbs>
                        </div>
                        <div className={className}>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
