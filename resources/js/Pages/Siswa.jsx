import {
    Alert,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Option,
    Radio,
    Select,
    Textarea,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import {
    HiBars3,
    HiEllipsisVertical,
    HiEye,
    HiEyeSlash,
    HiPencil,
    HiPlus,
    HiTrash,
    HiXMark,
} from "react-icons/hi2";
import Layout from "../Layout/Layout";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdError } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "@inertiajs/react";
import { DataSample } from "@/Utils/DataSample";

export default function Siswa({ kelas }) {
    const profilePictureRef = useRef(null);
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [addSiswa, setAddSiswa] = useState(false);
    const [editSiswa, setEditSiswa] = useState(false);
    const [deleteSiswa, setDeleteSiswa] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [data, setData] = useState(null);
    const [field, setField] = useState({});
    const [fieldEdit, setFieldEdit] = useState({});
    const [chose, setChose] = useState(false);

    const changeProfilePicture = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setField({
            profile_picture: e.target.files[0],
            ...field,
        });
        setProfilePicture(file);
    };

    const changeEditSiswa = (id) => {
        setEditSiswa(true);
        setFieldEdit(data.find((d) => d.id === id));
    };

    const submitAddSiswa = async (e) => {
        e.preventDefault();

        setLoading(!loading);
        axios
            .post("/api/siswa", field)
            .then((res) => {
                setStatus(!status);
                setAddSiswa(false);
                setAlert({
                    open: true,
                    type: "success",
                    message: res.data.message,
                });
                setLoading(!loading);
                setField({});
            })
            .catch((err) => {
                console.log(err);
                setAlert({
                    open: true,
                    type: "failed",
                    message: "Data gagal ditambahkan.",
                });
                setLoading(!loading);
            });
    };

    const submitEditSiswa = async (e) => {
        e.preventDefault();

        axios
            .put(route("siswa.update"), fieldEdit)
            .then((res) => {
                setStatus(!status);
                setEditSiswa(false);
                setAlert({
                    open: true,
                    type: "success",
                    message: "Data berhasil diedit.",
                });
            })
            .catch((err) => {
                console.log(err);
                setAlert({
                    open: true,
                    type: "failed",
                    message: "Data gagal diedit.",
                });
            });
    };

    const submitDeleteSiswa = async () => {
        axios
            .delete(route("siswa.destroy"), id)
            .then((res) => {
                setStatus(!status);
                setAlert({
                    open: true,
                    type: "success",
                    message: "Data berhasil dihapus.",
                });
            })
            .catch((err) => {
                console.log(err);
                setAlert({
                    open: true,
                    type: "failed",
                    message: "Data gagal dihapus.",
                });
            });
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await axios
                .get("/api/siswa")
                .then((res) => {
                    console.log(res);
                    setData(res.data.map((d) => ({ ...d, checked: false })));
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        };

        getData();
    }, [status]);

    const checkedData = (id) => {
        setData(
            data.map((d) => {
                return d.id === id ? { ...d, checked: !d.checked } : { ...d };
            })
        );
    };

    return (
        <>
            {alert.open && (
                <Alert
                    color={alert.type == "success" ? "green" : "red"}
                    variant="gradient"
                    className="fixed top-0 right-0 left-0 py-5"
                    animate={{
                        mount: { y: 0, opacity: 1 },
                        unmount: { y: -30, opacity: 0 },
                    }}
                    icon={
                        alert.type == "success" ? (
                            <BsCheck2Circle className="w-6 h-6" />
                        ) : (
                            <MdError className="w-6 h-6" />
                        )
                    }
                    open={alert.open}
                    action={
                        <HiXMark
                            className="w-6 h-6 absolute right-0 mr-5 cursor-pointer"
                            onClick={() => setAlert({ open: false })}
                        />
                    }
                >
                    {alert.message}
                </Alert>
            )}
            <Layout title="Siswa">
                <div className="w-full rounded-md border border-slate-200 shadow-sm shadow-slate-300 bg-white overflow-hidden p-5 space-y-3">
                    <div className="flex justify-between items-center">
                        {chose ? (
                            <div className="flex gap-4">
                                <Button
                                    color="red"
                                    variant="gradient"
                                    onClick={() => setDeleteSiswa(!deleteSiswa)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    color="blue"
                                    variant="gradient"
                                    onClick={() => {
                                        setChose(!chose);
                                        setData(
                                            data.map((d) => {
                                                return { ...d, checked: false };
                                            })
                                        );
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Tooltip content="Add Siswa">
                                <IconButton
                                    variant="gradient"
                                    color="blue"
                                    onClick={() => setAddSiswa(!addSiswa)}
                                    className="rounded-full active:scale-90"
                                >
                                    <HiPlus
                                        className="w-6 h-6"
                                        strokeWidth={1}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        <div className=""></div>
                        <ButtonGroup color="blue">
                            <IconButton
                                className="active:scale-95"
                                onClick={() => {
                                    setChose(!chose);
                                    setData(
                                        data.map((d) => {
                                            return { ...d, checked: false };
                                        })
                                    );
                                }}
                                disabled={!data || (data && data.length == 0)}
                            >
                                <HiTrash className="w-5 h-5" />
                            </IconButton>
                            <IconButton className="active:scale-95">
                                <HiBars3 className="w-6 h-6" strokeWidth={1} />
                            </IconButton>
                        </ButtonGroup>
                    </div>
                    <div className="rounded-lg overflow-x-auto ring-2 ring-slate-200 scrollbar-custom">
                        <table className="w-full">
                            <thead className="bg-slate-900 text-slate-200">
                                <tr>
                                    {chose && (
                                        <th className="p-2.5 font-medium whitespace-nowrap">
                                            <Checkbox
                                                color="blue"
                                                onChange={() =>
                                                    setData(
                                                        data.map((d) => {
                                                            return {
                                                                ...d,
                                                                checked:
                                                                    !d.checked,
                                                            };
                                                        })
                                                    )
                                                }
                                            />
                                        </th>
                                    )}
                                    {DataSample.table.heading.map((d, i) => (
                                        <th
                                            key={i}
                                            className="p-2.5 font-medium whitespace-nowrap"
                                        >
                                            {d}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data?.map((d, i) => (
                                    <tr
                                        key={i}
                                        className="even:bg-slate-200 text-sm"
                                    >
                                        {chose ? (
                                            <td className="text-center whitespace-nowrap p-2">
                                                <Checkbox
                                                    color="blue"
                                                    onChange={() =>
                                                        checkedData(d.id)
                                                    }
                                                    checked={d.checked}
                                                />
                                            </td>
                                        ) : (
                                            <td className="text-center whitespace-nowrap p-2">
                                                {i + 1}
                                            </td>
                                        )}
                                        <td className="whitespace-nowrap p-2">
                                            <div className="w-10 h-10 rounded-full overflow-hidden mx-auto">
                                                <img
                                                    src={
                                                        !d.foto_profil
                                                            ? "/img/user.png"
                                                            : d.foto_profil
                                                    }
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.nama}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.nis}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.nisn}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {
                                                kelas.find(
                                                    (item) =>
                                                        item.id == d.id_kelas
                                                )?.kelas
                                            }
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.tempat_lahir}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.tanggal_lahir}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.email}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.no_tlp}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.jenis_kelamin}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.alamat}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            {d.agama}
                                        </td>
                                        <td className="text-center whitespace-nowrap p-2">
                                            <Menu>
                                                <MenuHandler>
                                                    <IconButton
                                                        color="blue"
                                                        variant="gradient"
                                                        className="rounded-full active:scale-90"
                                                    >
                                                        <HiEllipsisVertical
                                                            className="w-6 h-6"
                                                            strokeWidth={1}
                                                        />
                                                    </IconButton>
                                                </MenuHandler>
                                                <MenuList className="border border-slate-300">
                                                    <MenuItem className="flex items-center gap-2 text-blue-500">
                                                        <HiEye className="w-4 h-4" />
                                                        Detail
                                                    </MenuItem>
                                                    <MenuItem
                                                        className="flex items-center gap-2 text-green-500"
                                                        onClick={() =>
                                                            changeEditSiswa(
                                                                d.id
                                                            )
                                                        }
                                                    >
                                                        <HiPencil className="w-4 h-4" />
                                                        Edit
                                                    </MenuItem>
                                                    <MenuItem
                                                        className="flex items-center gap-2 text-red-500"
                                                        onClick={() =>
                                                            submitDeleteSiswa(
                                                                d.id
                                                            )
                                                        }
                                                    >
                                                        <HiTrash className="w-4 h-4" />
                                                        Delete
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
            <Dialog
                open={deleteSiswa}
                handler={setDeleteSiswa}
                className="bg-slate-200"
            >
                <DialogBody className="py-5">
                    <Typography variant="h5" color="black">
                        Apakah yakin anda ingin menghapus{" "}
                        {data?.filter((item) => item.checked == true).length}{" "}
                        data siswa ini?
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-4">
                    <Button
                        color="green"
                        onClick={() => setDeleteSiswa(!deleteSiswa)}
                    >
                        Tidak
                    </Button>
                    <Button color="red" onClick={submitDeleteSiswa}>
                        Ya
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={addSiswa} className="bg-slate-200">
                <DialogHeader className="flex justify-between">
                    <Typography variant="h4">Add Siswa Form</Typography>
                    <IconButton
                        variant="text"
                        onClick={() => setAddSiswa(false)}
                        className="rounded-full"
                    >
                        <HiXMark className="w-7 h-7" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="py-3" divider>
                    <form onSubmit={submitAddSiswa}>
                        <div className="w-full space-y-4 max-h-[27rem] overflow-auto scrollbar-custom pr-3 py-4 rounded-lg">
                            <div className="relative w-min mx-auto mb-5">
                                <div className="w-40 h-40 rounded-full overflow-hidden">
                                    <img
                                        src={profilePicture ?? "/img/user.png"}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <IconButton
                                        className="rounded-full"
                                        color="blue"
                                        variant="gradient"
                                        onClick={() =>
                                            profilePictureRef.current.click()
                                        }
                                    >
                                        <HiPencil className="w-4 h-4" />
                                    </IconButton>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={profilePictureRef}
                                onChange={changeProfilePicture}
                                className="hidden"
                            />
                            <Input
                                label="Nama"
                                color="blue"
                                value={field.nama}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        nama: e.target.value,
                                    })
                                }
                                autoFocus
                                required
                            />
                            <Input
                                label="NIS"
                                color="blue"
                                value={field.nis}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        nis: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="NISN"
                                color="blue"
                                value={field.nisn}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        nisn: e.target.value,
                                    })
                                }
                                required
                            />
                            <Select
                                label="Kelas"
                                color="blue"
                                value={field.id_kelas?.toString()}
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        id_kelas: e,
                                    });
                                }}
                            >
                                {kelas.map((d, i) => (
                                    <Option key={i} value={d.id.toString()}>
                                        {d.kelas}
                                    </Option>
                                ))}
                            </Select>
                            <Input
                                label="Tempat Lahir"
                                color="blue"
                                value={field.tempat_lahir}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        tempat_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type="date"
                                label="Tanggal Lahir"
                                color="blue"
                                value={field.tanggal_lahir}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        tanggal_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type="email"
                                label="Email"
                                color="blue"
                                value={field.email}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="Nomor Telepon"
                                color="blue"
                                value={field.no_tlp}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        no_tlp: e.target.value,
                                    })
                                }
                                required
                            />
                            <div className="flex flex-col">
                                <label className="text-slate-600 text-sm">
                                    Jenis Kelamin
                                </label>
                                <div className="flex gap-1">
                                    <Radio
                                        label="Laki-Laki"
                                        color="blue"
                                        name="jenis_kelamin"
                                        value="Laki-Laki"
                                        onChange={(e) =>
                                            setField({
                                                ...field,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                    />
                                    <Radio
                                        label="Perempuan"
                                        color="blue"
                                        name="jenis_kelamin"
                                        value="perempuan"
                                        onChange={(e) =>
                                            setField({
                                                ...field,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                    />
                                </div>
                            </div>
                            <Textarea
                                color="blue"
                                resize={false}
                                label="Alamat"
                                value={field.alamat}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        alamat: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Agama"
                                color="blue"
                                value={field.agama}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        agama: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Button
                            type="submit"
                            color="green"
                            fullWidth
                            className="mt-2"
                        >
                            Save
                        </Button>
                    </form>
                </DialogBody>
                <DialogFooter className="p-2"></DialogFooter>
            </Dialog>
            <Dialog open={editSiswa} className="bg-slate-200">
                <DialogHeader className="flex justify-between">
                    <Typography variant="h4">Edit Siswa Form</Typography>
                    <IconButton
                        variant="text"
                        onClick={() => setEditSiswa(false)}
                        className="rounded-full"
                    >
                        <HiXMark className="w-7 h-7" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="py-3" divider>
                    <form onSubmit={submitEditSiswa}>
                        <div className="w-full space-y-4 max-h-[27rem] overflow-auto scrollbar-custom pr-3 py-4 rounded-lg">
                            <div className="relative w-min mx-auto mb-5">
                                <div className="w-40 h-40 rounded-full overflow-hidden">
                                    <img
                                        src={profilePicture ?? "/img/user.png"}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <IconButton
                                        className="rounded-full"
                                        color="blue"
                                        variant="gradient"
                                        onClick={() =>
                                            profilePictureRef.current.click()
                                        }
                                    >
                                        <HiPencil className="w-4 h-4" />
                                    </IconButton>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={profilePictureRef}
                                onChange={changeProfilePicture}
                                className="hidden"
                            />
                            <Input
                                label="Nama"
                                color="blue"
                                value={fieldEdit.nama}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        nama: e.target.value,
                                    })
                                }
                                autoFocus
                                required
                            />
                            <Input
                                label="NIS"
                                color="blue"
                                value={fieldEdit.nis}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        nis: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="NISN"
                                color="blue"
                                value={fieldEdit.nisn}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        nisn: e.target.value,
                                    })
                                }
                                required
                            />
                            <Select
                                label="Kelas"
                                color="blue"
                                value={fieldEdit.id_kelas?.toString()}
                                onChange={(e) => {
                                    setFieldEdit({
                                        ...fieldEdit,
                                        id_kelas: e,
                                    });
                                }}
                            >
                                {kelas.map((d, i) => (
                                    <Option key={i} value={d.id.toString()}>
                                        {d.kelas}
                                    </Option>
                                ))}
                            </Select>
                            <Input
                                label="Tempat Lahir"
                                color="blue"
                                value={fieldEdit.tempat_lahir}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        tempat_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type="date"
                                label="Tanggal Lahir"
                                color="blue"
                                value={fieldEdit.tanggal_lahir}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        tanggal_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type="email"
                                label="Email"
                                color="blue"
                                value={fieldEdit.email}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="Nomor Telepon"
                                color="blue"
                                value={fieldEdit.no_tlp}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        no_tlp: e.target.value,
                                    })
                                }
                                required
                            />
                            <div className="flex flex-col">
                                <label className="text-slate-600 text-sm">
                                    Jenis Kelamin
                                </label>
                                <div className="flex gap-1">
                                    <Radio
                                        label="Laki-Laki"
                                        color="blue"
                                        name="jenis_kelamin"
                                        value="Laki-Laki"
                                        onChange={(e) =>
                                            setFieldEdit({
                                                ...fieldEdit,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                        checked={
                                            fieldEdit.jenis_kelamin ==
                                            "Laki-laki"
                                        }
                                    />
                                    <Radio
                                        label="Perempuan"
                                        color="blue"
                                        name="jenis_kelamin"
                                        value="perempuan"
                                        onChange={(e) =>
                                            setFieldEdit({
                                                ...fieldEdit,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                        checked={
                                            fieldEdit.jenis_kelamin ==
                                            "Perempuan"
                                        }
                                    />
                                </div>
                            </div>
                            <Textarea
                                color="blue"
                                resize={false}
                                label="Alamat"
                                value={fieldEdit.alamat}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        alamat: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Agama"
                                color="blue"
                                value={fieldEdit.agama}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        agama: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Button
                            type="submit"
                            color="green"
                            fullWidth
                            className="mt-2"
                        >
                            Save
                        </Button>
                    </form>
                </DialogBody>
                <DialogFooter className="p-2"></DialogFooter>
            </Dialog>
        </>
    );
}
