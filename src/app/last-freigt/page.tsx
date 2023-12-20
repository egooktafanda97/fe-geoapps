/** @format */
'use client'
import React, { useState } from 'react'

import ButtonLoading from '@/components/atoms/ButtonLoading'
import Layout from '@/components/layouts/Layout'
import { useRouter } from 'next/navigation'
import { FaFile, FaFolderOpen, FaHome, FaTrash } from 'react-icons/fa'
import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'
import Tables from '@/components/molecules/DataTables'
import { api } from '@/utils/_function/utils'
import SearchForm from '@/components/atoms/SearchForm'
import CardBox from '@/components/atoms/CardBox'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import Link from 'next/link'
import moment, { now } from 'moment'
import Swal from 'sweetalert2'
import { useMultyDestory } from '@/utils/_hooks/useFetch'

export default function ScemaStreet() {
    const [dataRowClicick, setDataRowClick] = useState<any>()
    const [tbRefresh, setTbRefresh] = useState<Boolean>(false)

    const router = useRouter()

    return (
        <Layout isAuth={true} header="Freight Lanjutan">
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <CardBox classname="w-100">
                            <Tables
                                HeadflexEnd={() => (
                                    <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                                        <div></div>
                                        <div className="flex">
                                            {/* <button type="button" onClick={hndelMultyDelete} className="text-white disabled bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                <FaTrash />
                                            </button> */}

                                            <SearchForm />
                                        </div>
                                    </div>
                                )}
                                auth={true}
                                url={`${api}/uang-jalan`}
                                onSelected={({ selectedRows }) => {
                                    setDataRowClick(selectedRows)
                                }}
                                onRowClick={(res) => {
                                    setDataRowClick(res)
                                }}
                                columns={[]}
                                refresh={!tbRefresh}
                            />
                        </CardBox>
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfoDetails title={dataRowClicick?.kode_scema ?? ''} titleColor="xl:text-gray-100" list={[]}>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex justify-center items-center  mt-2">
                                    <Link href={``} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
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
                            timeOut={50000}
                            onClick={(loadings) => {
                                router.push('/scema-street-money/store')
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
