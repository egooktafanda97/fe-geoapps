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
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { api } from '@/utils/_function/utils'
import { useGet } from '@/utils/_hooks/useFetch'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import { FaHome, FaEye, FaEdit, FaTrash, FaFile, FaFolder, FaFolderOpen } from 'react-icons/fa'
import Link from 'next/link'
import OptionTableVerical from '@/components/atoms/OptionTableVerical'
import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'
import columns from './Column'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import { IoFolder, IoSyncCircleSharp } from 'react-icons/io5'

const Show: React.FC = () => {
    const router = useRouter()
    const [seleted, setSelected] = useState<any>()
    const [isDetail, setDetail] = useState<any>()
    useEffect(() => {
        if (seleted?.selectedCount == 1) {
        }
    }, [seleted])

    const onRowClickTable = (row: any) => {
        setDetail(row)
    }
    const listDetails = [
        {
            label: 'Nama Perushaan',
            value: isDetail?.companyHolder?.company_name ?? '-',
        },
        {
            label: 'Jenis Kontrak',
            value: `Vendor Transport - ${isDetail?.contractType?.contract_types ?? '-'}`,
        },
        {
            label: 'Periode Kontrak',
            value: (
                <div className="flex justify-center items-center flex-col">
                    <strong>{isDetail?.start_period ?? '-'}</strong>
                    <small>S/D</small>
                    <strong>{isDetail?.end_period ?? '-'}</strong>
                </div>
            ),
        },
        {
            label: 'Nomor Kontrak',
            value: isDetail?.nomor_kontrak ?? '-',
        },
        {
            label: 'Dibuat Oleh',
            value: isDetail?.user?.username ?? '-',
        },
    ]

    return (
        <Layout className="" isAuth={true} header={`Management Vendor & Agent`}>
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <CardBox classname="w-100">
                            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
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
                                            url: '',
                                        },
                                    ]}
                                />
                                <div className="flex">
                                    <SearchForm />
                                    <Link href={'/vendors/store'} type="button" className="ml-3 flex text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                        <div className="flex justify-between align-center">
                                            {/* <BsFolderFill/> */}
                                            Dokument Baru
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <Tables
                                auth={true}
                                url={`${api}/vendor`}
                                onSelected={(res) => {
                                    setSelected(res)
                                }}
                                onRowClick={onRowClickTable}
                                columns={columns}
                            />
                        </CardBox>
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfoDetails title={isDetail?.vendors_code ?? '-'} titleColor="xl:text-gray-100" list={listDetails}>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex justify-center items-center  mt-2">
                                    <Link href={`vendors/store?id=${isDetail?.id ?? ''}`} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        <>
                                            <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-gray-700">
                                                <FaFile />
                                            </span>
                                            <b>Lihat Dokument</b>
                                        </>
                                    </Link>
                                </div>
                            </li>
                        </CardInfoDetails>
                        <ButtonLoading
                            className="mt-2 p-3 rounded-lg text bg-red-500 hover:bg-red-900 w-full flex justify-center items-center"
                            label={
                                <span className="w-full flex content-center items-center">
                                    <div className="py-1 px-1 rounded-md bg-gray-100">
                                        <FaFolderOpen color="red" hover="bg-red-900" size="40" />
                                    </div>
                                    <div className="w-full h-full flex flex-col text-gray-100 ">
                                        <label htmlFor="">Buat Dokumen Baru</label>
                                        <small>
                                            <i>(tekan tombol ini)</i>
                                        </small>
                                    </div>
                                </span>
                            }
                            onClick={(loadings) => router.push(`/vendors/store`)}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Show
