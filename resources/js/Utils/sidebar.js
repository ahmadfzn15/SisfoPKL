import {
    HiBell,
    HiCog6Tooth,
    HiDocument,
    HiHome,
    HiUserGroup,
} from "react-icons/hi2";
import { FaMoneyBillWave } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { MdSchedule } from "react-icons/md";

export const sidebar = [
    {
        link: "/",
        label: "Dashboard",
        icon: HiHome,
        nested: false,
    },
    {
        label: "Master Data",
        icon: HiDocument,
        nested: true,
        data: [
            {
                link: "/kelas",
                label: "Kelas",
                icon: HiUserGroup,
                nested: false,
            },
            {
                link: "/siswa",
                label: "Siswa",
                icon: HiUserGroup,
                nested: false,
            },
        ],
    },
    {
        link: "/notification",
        label: "Notification",
        icon: HiBell,
        nested: false,
    },
    {
        link: "/setting",
        label: "Setting",
        icon: HiCog6Tooth,
        nested: false,
    },
];
