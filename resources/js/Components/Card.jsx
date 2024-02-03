import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "@material-tailwind/react";
import { HiChevronRight } from "react-icons/hi2";
import { useState } from "react";

export default function Card({ title, children }) {
    const [accordion, setAccordion] = useState(true);

    return (
        <>
            <Accordion
                open={accordion}
                icon={
                    <HiChevronRight
                        strokeWidth={1}
                        className={`w-5 h-5 ${
                            accordion ? "rotate-90" : "rotate-0"
                        } transition-all`}
                    />
                }
            >
                <AccordionHeader
                    className="rounded-md border border-slate-200 shadow-sm shadow-slate-300 bg-white overflow-hidden divide-y divide-slate-200 font-poppins p-5"
                    onClick={() => setAccordion(!accordion)}
                >
                    <h1 className="text-base text-black">{title}</h1>
                </AccordionHeader>
                <AccordionBody className="rounded-b-md border border-slate-200 shadow-sm shadow-slate-300 bg-white overflow-hidden font-poppins py-0 px-5 divide-y divide-slate-200">
                    {children}
                </AccordionBody>
            </Accordion>
        </>
    );
}
