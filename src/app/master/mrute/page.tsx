'use client'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/LayoutMaster'
import React, { useEffect, useState } from 'react'
import Tables from '@/components/molecules/DataTables'
import SearchForm from '@/components/atoms/SearchForm'
import { api } from '@/utils/_function/utils'
import { Button, Modal } from 'flowbite-react'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'
import { usePatch, usePost } from '@/utils/_hooks/useFetch'
import MapsComponent from '@/components/atoms/MapsComponent'
import DialogDestory from '@/components/atoms/DialogDestory'
import { BsTrash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { MdEdit } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { ColomnInterface } from '@/utils/_interface/DatatableInterface'

// Initialize jquery and Datatable
type ColumnsFunction = (options: { refresh: (r: any) => void; onEdit: (r: any) => void }) => ColomnInterface[]

const columns: ColumnsFunction = ({ refresh, onEdit }) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.id ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'User Entry',
        cell: (row: any) => <span>{row?.user?.username ?? 0}</span>,
    },
    {
        name: 'Origin',
        cell: (row: any) => <span>{row?.origins?.city_name ?? 0}</span>,
    },
    {
        name: 'Destination',
        cell: (row: any) => <span>{row?.destinations?.city_name ?? 0}</span>,
    },
    {
        name: 'Distance',
        cell: (row: any) => (
            <span>
                {row?.distance ?? 0} {row?.unit_length}
            </span>
        ),
    },
    {
        name: '#',
        cell: (row: any) => (
            <div className="flex justify-center items-center">
                <div>
                    <button
                        className="text-green-500 hover:text-green-700 mr-2 ml-2"
                        onClick={() => {
                            onEdit(row)
                        }}
                    >
                        <FaEdit />
                    </button>
                </div>
                <DialogDestory
                    onSuccress={() => {
                        refresh({})
                    }}
                    id={row?.id}
                    url="master/rute_travel"
                >
                    <button className="text-red-500 hover:text-red-700">
                        <BsTrash />
                    </button>
                </DialogDestory>
            </div>
        ),
    },
]
const City: React.FC = () => {
    const [getOpenModalRute, setopenModalRute] = useState<any>(false)
    const [dataId, setDataId] = useState<any>()
    const [asal, setAsal] = useState<any>()
    const [tujuan, setTujuan] = useState<any>()
    const [jarak, setJarak] = useState<any>()
    const [satuan, setSatuan] = useState<any>()
    const [koordinatAsal, setKoordinatAsal] = useState<any>()
    const [koordinatTujuan, setKoordinatTujuan] = useState<any>()
    const [tbRefresh, setTbRefresh] = useState<boolean>(false)
    const [action, setAction] = useState<any>('store')
    const save = usePost(`${api}/master/rute_travel`)
    const update = usePatch(`${api}/master/rute_travel`)

    const onSave = async () => {
        await save.postData({
            formData: {
                origin_city_id: asal.value,
                destination_city_id: tujuan.value,
                distance: jarak,
                unit_length: satuan,
                latlng_origin: koordinatAsal ?? '',
                latlng_destination: koordinatTujuan ?? '',
            },
            responses: (res) => {
                toast.success('Data has been saved')
                setTbRefresh(!tbRefresh)
                setopenModalRute(!getOpenModalRute)
            },
            onError: (res) => {
                toast.error(res.message)
            },
        })
    }
    const onUpdate = async () => {
        await update.patchData({
            id: dataId,
            data: {
                origin_city_id: asal.value,
                destination_city_id: tujuan.value,
                distance: jarak,
                unit_length: satuan,
                latlng_origin: koordinatAsal ?? '',
                latlng_destination: koordinatTujuan ?? '',
            },
            responses: (res) => {
                toast.success('Data has been updated')
                setTbRefresh(!tbRefresh)
                setopenModalRute(!getOpenModalRute)
            },
            onError: (res) => {
                toast.error(res.message)
            },
        })
    }
    const hendlingInsert = async (e: any) => {
        e.preventDefault()
        if (action === 'store') {
            await onSave()
        } else {
            await onUpdate()
        }
    }
    const hndelOnEdit = (r: any) => {
        setDataId(r?.id)
        setopenModalRute(!getOpenModalRute)
        setAsal({ value: r?.origin_city_id, label: r?.origins?.city_name })
        setTujuan({ value: r?.destination_city_id, label: r?.destinations?.city_name })
        setJarak(r?.distance)
        setSatuan(r?.unit_length)
        setKoordinatAsal(r?.latlng_origin)
        setKoordinatTujuan(r?.latlng_destination)
        console.log({ value: r?.origin_city_id, label: r?.origins?.city_name })
    }
    return (
        <Layout header="Master Router">
            <div className="mt-20 pt-10">
                <div className="flex justify-between items-center">
                    <div></div>
                    <ButtonLoading
                        onClick={(loading) => {
                            setAction('store')
                            setopenModalRute(!getOpenModalRute)
                        }}
                        label={`Tambah Data`}
                    />
                </div>
                <CardBox classname="w-100">
                    <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                        <h3>Master Rute</h3>
                        <div>
                            <SearchForm />
                        </div>
                    </div>
                    <Tables
                        query="&origin=&destination="
                        refresh={tbRefresh}
                        auth={true}
                        url={`${api}/master/rute_travel`}
                        columns={columns({
                            refresh: (r: any) => {
                                setTbRefresh(!tbRefresh)
                            },
                            onEdit: (r: any) => {
                                setAction('update')
                                hndelOnEdit(r)
                            },
                        })}
                    />
                </CardBox>
            </div>
            {/* modal freight */}
            <Modal show={getOpenModalRute} size={`5xl`} onClose={() => setopenModalRute(!getOpenModalRute)}>
                <Modal.Header>Pengisian Rute</Modal.Header>
                <Modal.Body>
                    <div
                        className="pr-2"
                        style={{
                            minHeight: '50vh',
                            width: '100%',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        <form onSubmit={hendlingInsert}>
                            <div className="row">
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Origin
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                handleInputChange={(e: any) => {
                                                    setAsal(e)
                                                }}
                                                defaultInputValue={asal?.label}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Destination
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                handleInputChange={(e: any) => {
                                                    setTujuan(e)
                                                }}
                                                defaultInputValue={tujuan?.label}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Jarak
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <input value={jarak} onChange={(e) => setJarak(e.target.value)} name="jarak" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required id="start_period" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <div className="flex justify-start items-center">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Satuan Jarak
                                            </label>
                                        </div>
                                        <div className="flex h-full justify-start w-full">
                                            <select value={satuan} onChange={(e) => setSatuan(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected value="">
                                                    Pilih Satuan
                                                </option>
                                                <option value="km">Kilo Meter (Km)</option>
                                                <option value="m">Meter (m)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <div className="flex justify-start items-center">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Koordinat Origin
                                            </label>
                                            <small style={{ fontSize: '.5em' }}>Boleh di kosongkan</small>
                                        </div>
                                        <div className="flex h-full justify-start w-full">
                                            <input onChange={(e) => setKoordinatAsal(e.target.value)} name="jarak" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required id="start_period" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <div className="flex justify-start items-center">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Koordinat Destination
                                            </label>
                                            <small style={{ fontSize: '.5em' }}>Boleh di kosongkan</small>
                                        </div>
                                        <div className="flex h-full justify-start w-full">
                                            <input onChange={(e) => setKoordinatTujuan(e.target.value)} name="jarak" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required id="start_period" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <MapsComponent /> */}
                            <div className="col-12 flex justify-end sm:col-12 md:col-12 xl:col-12 mb-2">
                                <ButtonLoading className="bg-blue-500 w-[10rem] flex justify-center items-center" label={`Simpan`} onClick={(loadings) => {}} type="submit" />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer className="flex justify-end"></Modal.Footer> */}
            </Modal>
        </Layout>
    )
}

export default City
