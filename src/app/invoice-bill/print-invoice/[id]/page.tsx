/** @format */
'use client'
import React from 'react'

import ButtonLoading from '@/components/atoms/ButtonLoading'
import CardBox from '@/components/atoms/CardBox'
import SearchForm from '@/components/atoms/SearchForm'
import Layout from '@/components/layouts/Layout'
import Tables from '@/components/molecules/DataTables'
import { api } from '@/utils/_function/utils'
import { useRouter } from 'next/navigation'
import { IoSyncCircleSharp } from 'react-icons/io5'
import CardInfo from '../../../freight/components/CardInfoDetails'

export default function PrintInvoice(): React.JSX.Element {
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
                        <CardInfo titleColor="xl:text-gray-100" isDetail={[]} />
                        <ButtonLoading
                            className="mt-2 p-3 rounded-lg text bg-green-500 w-full flex justify-center items-center"
                            label={
                                <span className="w-full flex content-center items-center">
                                    <div className="py-1 px-1 rounded-full bg-gray-100">
                                        <IoSyncCircleSharp size="40" />
                                    </div>
                                    <div className="w-full h-full flex flex-col text-gray-100 ">
                                        <label htmlFor="">Generate Freight Cost</label>
                                        <small>
                                            <i>(tekan tombol ini)</i>
                                        </small>
                                    </div>
                                </span>
                            }
                            classes="ok"
                            onClick={(loadings) => {}}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
