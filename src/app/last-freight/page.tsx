/** @format */
'use client'
import React from 'react'

import ButtonLoading from '@/components/atoms/ButtonLoading'
import Layout from '@/components/layouts/Layout'
import { useRouter } from 'next/navigation'
import { FaFile, FaFolderOpen, FaHome } from 'react-icons/fa'
import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'
import Tables from '@/components/molecules/DataTables'
import { api } from '@/utils/_function/utils'
import SearchForm from '@/components/atoms/SearchForm'
import CardBox from '@/components/atoms/CardBox'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import Link from 'next/link'

export default function LastFreight(): React.JSX.Element {
    const router = useRouter()
    return (
        <Layout isAuth={true} header="Skema Uang Jalan">
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <CardBox classname="w-100">
                            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                                <div></div>
                                <div className="flex">
                                    <SearchForm />
                                    {/* <Link
                                 href={'/vendors/store'}
                                 type="button"
                                 className="ml-3 flex text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                              >
                                 <div className="flex justify-between align-center">Dokument Baru</div>
                              </Link> */}
                                </div>
                            </div>

                            <Tables auth={true} url={`${api}/vendor`} onSelected={(res) => {}} onRowClick={() => {}} columns={[]} />
                        </CardBox>
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfoDetails title={'-'} titleColor="xl:text-gray-100" list={[]}>
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
                                router.push('/last-freight/store')
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
