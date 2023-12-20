/** @format */

'use client'
import CardBox from '@/components/atoms/CardBox'
import SearchForm from '@/components/atoms/SearchForm'
import Layout from '@/components/layouts/Layout'
import Tables from '@/components/molecules/DataTables'
import { api, isEmpty } from '@/utils/_function/utils'
import { Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
// Initialize jquery and Datatable

import CardInfo from '@/app/freight/components/CardInfoDetails'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { ColumnsAir, ColumnsLand, ColumnsSea } from './Colom'

interface PrieceVendorProps {
    params: {
        genId: string
        tipeFId: string
    }
}

const PrieceVendor: React.FC<PrieceVendorProps> = ({ params }) => {
    const [dataset, setDataSet] = useState<any>(null)
    const [dataPriece, setDataPriece] = useState<any>(null)
    const [triggerRefresh, setTriggerRefresh] = useState<Boolean>(false)

    const [tipeId, setTipeId] = useState<Number | null>(null)
    const { global } = useSelector((state: any) => state?.global ?? '')

    const { genId } = params
    const { tipeFId } = params

    const [colomScema, seColomScema] = useState<any[]>([])

    const { mfreighttypes, error } = useMasterData(['mfreighttypes'])
    const segment = useSelectedLayoutSegment()

    useEffect(() => {
        if (!isEmpty(mfreighttypes) && !isEmpty(tipeFId)) {
            const SelectIdTipe = mfreighttypes.find((item: any) => item.alias === tipeFId)
            setTipeId(SelectIdTipe.id ?? null)
            ComponentBind(SelectIdTipe.id)
        }
    }, [mfreighttypes])

    const [openModalPrieceFreig, setOpenModalPrieceFreig] = useState<Boolean | any>(false)
    const [formFreightComponent, setFormFreightComponent] = useState<any>()
    const dispatch = useDispatch()

    const [colomFilter, setColomFilter] = useState<any[]>([])
    const [filterColom, setFilterColom] = useState<any[]>([])

    const ComponentBind = (ftype: number) => {
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
            setFilterColom(['Layanan', 'Berat-1', 'Min Berat-1', 'Harga Ke-1', 'Berat-2', 'Min Berat-2', 'Harga Ke-2', 'Min Charge'])
        } else if (!isEmpty(ftype) && ftype == 3) {
            seColomScema(colomAir)
            setColomFilter(
                colomAir.map((x: any) => {
                    return {
                        name: x?.name,
                        visible: true,
                    }
                }),
            )
        }
    }

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
        <Layout isAuth={true} header="DAFTAR HARGA VENDOR LAUT">
            <div className="mt-20 pt-10">
                <div className="w-full p-2 flex justify-between">
                    {/* <h5>Daftar Harga Vendor</h5> */}
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
                                    label: 'Freight',
                                    url: `/freight/sea-freight`,
                                },
                                {
                                    icon: (
                                        <>
                                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                            </svg>
                                        </>
                                    ),
                                    label: `Priece ${tipeFId}`,
                                    url: ``,
                                },
                            ]}
                        />
                    </div>
                    <div></div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <CardBox classname="w-100">{tipeFId && <Tables auth={true} url={`${api}/generate/${genId}/${tipeFId}`} refresh={triggerRefresh} columns={colomScema} HeadflexEnd={() => <SearchForm />} filter={filterColom} />}</CardBox>
                    </div>
                    <div className="col-12 md:col-4 lg:col-3 rounded-md">
                        <CardInfo isDetail={global?.isDetailState ?? {}} ButtonShow={false} />
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
        </Layout>
    )
}

export default PrieceVendor
