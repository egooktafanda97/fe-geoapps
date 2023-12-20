/** @format */

'use client'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/Layout'
import React, { useEffect, useState } from 'react'
import Tables from '@/components/molecules/DataTables'
import DropDown from '@/components/atoms/DropDowns'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsFolderFill } from 'react-icons/bs'
import OptionTable from '@/components/atoms/OptionTable'
import SearchForm from '@/components/atoms/SearchForm'
import { useFetch, useGet, usePatch } from '@/utils/_hooks/useFetch'
import { api, isEmpty } from '@/utils/_function/utils'
import { Dropdown, Modal } from 'flowbite-react'
import PageFormPriece from '@/components/organisms/page-form-priece'
import { FaFileExcel, FaFilter, FaHome, FaPlus } from 'react-icons/fa'
// Initialize jquery and Datatable

import PageFreightCostSea from '@/components/organisms/page-freight-cost-sea'
import PageFreightCostAir from '@/components/organisms/page-freight-cost-air'
import PageFreightCostLand from '@/components/organisms/page-freight-cost-Land'
import { ColumnsAir, ColumnsLand, ColumnsSea } from './Colom'
import { useDispatch } from 'react-redux'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import ListDetail from '@/components/atoms/ListDetail'
import { Paper } from '@mui/material'
import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'

interface PrieceVendorProps {
    params: {
        id: string
    }
}

const PrieceVendor: React.FC<PrieceVendorProps> = ({ params }) => {
    const [dataset, setDataSet] = useState<any>(null)
    const [dataPriece, setDataPriece] = useState<any>(null)
    const [triggerRefresh, setTriggerRefresh] = useState<Boolean>(false)

    const { id } = params // id priece
    const UsePrieces = useGet(`${api}/contract-priece/${id}/id/`)
    const updatePrieces = usePatch(`${api}/generate`)

    const [colomScema, seColomScema] = useState<any[]>([])

    const [openModalPrieceFreig, setOpenModalPrieceFreig] = useState<Boolean | any>(false)
    const [formFreightComponent, setFormFreightComponent] = useState<any>()
    const dispatch = useDispatch()

    const [colomFilter, setColomFilter] = useState<any[]>([])
    const [filterColom, setFilterColom] = useState<any[]>([])

    useEffect(() => {
        ComponentBind()
    }, [])

    const listDetailVen = [
        {
            label: 'Nama Perusahaan',
            value: dataPriece?.vendor?.contractType?.contract_types ?? '',
        },
        {
            label: 'Periode Kontrak',
            value: (
                <div className="flex justify-center items-center flex-col">
                    <strong>{dataPriece?.vendor?.start_period ?? '-'}</strong>
                    <small>S/D</small>
                    <strong>{dataPriece?.vendor?.end_period ?? '-'}</strong>
                </div>
            ),
        },
        {
            label: 'Nomor Kontrak',
            value: dataPriece?.vendor?.nomor_kontrak ?? '',
        },
        {
            label: 'Dibuat Oleh',
            value: dataPriece?.user?.username ?? '',
        },
    ]

    const ComponentBind = () =>
        UsePrieces.fetchData((results: any) => {
            setDataPriece(results)
            const ftype = results?.freightType?.id ?? null

            if (!isEmpty(ftype) && ftype == 1) {
                seColomScema(colomSea)
                setColomFilter(
                    colomSea.map((x: any) => {
                        return {
                            name: x?.name,
                            visible: true,
                        }
                    }),
                )
                setFilterColom(['Container', 'Thc', 'Lolo', 'Bill of Lading', 'Segel', 'Materai', 'Surcharge Freight', 'Surcharge Alih Kapal', 'ASDP', 'Other Hand Fees', 'Storage Alih Kapal', 'Trailer Destination', 'Amount', 'Leadtime', 'HPP'])

                const compo: React.FC = () => (
                    <PageFreightCostSea
                        FaSearchreightTypeId={ftype}
                        hendelTrigger={() => {
                            setTimeout(() => {
                                setOpenModalPrieceFreig(false)
                                setTriggerRefresh(!triggerRefresh)
                            }, 1500)
                        }}
                        tipes="land"
                        ContractPriceId={results?.id ?? 0}
                    />
                )
                setFormFreightComponent(compo)
            } else if (!isEmpty(ftype) && ftype == 2) {
                seColomScema(colomLand)
                setColomFilter(
                    colomLand.map((x: any) => {
                        return {
                            name: x?.name,
                            visible: true,
                        }
                    }),
                )
                const compo: React.FC = () => (
                    <PageFreightCostLand
                        FaSearchreightTypeId={ftype}
                        hendelTrigger={() => {
                            setTimeout(() => {
                                setOpenModalPrieceFreig(false)
                                setTriggerRefresh(!triggerRefresh)
                            }, 1500)
                        }}
                        tipes="land"
                        ContractPriceId={results?.id ?? 0}
                    />
                )
                setFormFreightComponent(compo)
            } else if (!isEmpty(ftype) && ftype == 3) {
                seColomScema(colomAir)
                const compo: React.FC = () => (
                    <PageFreightCostAir
                        hendelTrigger={() => {
                            setTimeout(() => {
                                setOpenModalPrieceFreig(false)
                                setTriggerRefresh(!triggerRefresh)
                            }, 1500)
                        }}
                        tipes="air"
                        FaSearchreightTypeId={ftype}
                        ContractPriceId={results?.id ?? 0}
                    />
                )
                setFormFreightComponent(compo)
                setColomFilter(
                    colomAir.map((x: any) => {
                        return {
                            name: x?.name,
                            visible: true,
                        }
                    }),
                )
            }
        })

    const colomLand = ColumnsLand({
        hndelUpdate: (RowSelected: any) => {
            setOpenModalPrieceFreig(!openModalPrieceFreig)
            setTriggerRefresh(!triggerRefresh)
            dispatch({
                type: 'SET_DATA_LAND_FREIGHT',
                payload: RowSelected,
            })
        },
    })

    const colomAir = ColumnsAir({
        hndelUpdate: (RowSelected: any) => {
            setOpenModalPrieceFreig(!openModalPrieceFreig)
            setTriggerRefresh(!triggerRefresh)
            dispatch({
                type: 'SET_DATA_LAND_FREIGHT',
                payload: RowSelected,
            })
        },
    })

    const colomSea = ColumnsSea({
        hndelUpdate: (RowSelected: any) => {
            setOpenModalPrieceFreig(!openModalPrieceFreig)
            setTriggerRefresh(!triggerRefresh)
            dispatch({
                type: 'SET_DATA_LAND_FREIGHT',
                payload: RowSelected,
            })
        },
    })

    return (
        <Layout header={dataPriece?.vendor?.companyHolder?.company_name ?? ''}>
            <>
                <div className="mt-20 pt-10">
                    <div className="w-full p-2 flex justify-between">
                        <div className="flex items-center text-white dark:text-white">
                            <Breadcrumb
                                wg={[
                                    {
                                        icon: (
                                            <>
                                                <FaHome />
                                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                </svg>
                                            </>
                                        ),
                                        label: 'Vendor',
                                        url: '/vendors',
                                    },
                                    {
                                        icon: (
                                            <>
                                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                </svg>
                                            </>
                                        ),
                                        label: 'Form Entry Vendor',
                                        url: `/vendors/store?id=${dataPriece?.vendors_id ?? ''}`,
                                    },
                                    {
                                        icon: (
                                            <>
                                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                </svg>
                                            </>
                                        ),
                                        label: 'Priece',
                                        url: ``,
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-green-700">
                                    <FaPlus />
                                </span>
                                <b>Import</b>
                                <span className="ml-2">
                                    <FaFileExcel />
                                </span>
                            </button>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={() => {
                                    setOpenModalPrieceFreig(!openModalPrieceFreig)
                                    dispatch({
                                        type: 'SET_DATA_LAND_FREIGHT',
                                        payload: {},
                                    })
                                    // setOpenModalMenuFreig(!openModalMenuFreig)
                                }}
                            >
                                <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                                    <FaPlus />
                                </span>
                                <b>Daftar Harga</b>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <CardBox classname="w-100">
                                <Tables HeadflexStart={() => <strong>Kongtrak Harga - {dataPriece?.freightType?.freight_type_name ?? '-'}</strong>} auth={true} url={`${api}/freight/${id}`} refresh={triggerRefresh} columns={colomScema} HeadflexEnd={() => <SearchForm />} filter={filterColom} />
                            </CardBox>
                        </div>
                        <div className="col-2 rounded-md">
                            <CardInfoDetails list={listDetailVen} title={dataPriece?.vendor?.vendors_code ?? 'VDR ... ...'} titleColor="">
                                <></>
                            </CardInfoDetails>
                        </div>
                    </div>
                </div>

                <Modal show={openModalPrieceFreig} size={`5xl`} onClose={() => setOpenModalPrieceFreig(!openModalPrieceFreig)}>
                    <Modal.Header>Pengisian Daftar {dataPriece?.freightType?.freight_type_name ?? ''}</Modal.Header>
                    <Modal.Body>
                        <div
                            className="pr-2"
                            style={{
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                            }}
                        >
                            {formFreightComponent}
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer className="flex justify-end"></Modal.Footer> */}
                </Modal>
            </>
        </Layout>
    )
}

export default PrieceVendor
