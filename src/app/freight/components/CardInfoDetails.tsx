/** @format */

import CardBox from '@/components/atoms/CardBox'
import { isEmpty } from '@/utils/_function/utils'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { FaFile } from 'react-icons/fa'
interface CardInfoInterface {
    isDetail: any
    ButtonShow?: Boolean
    titleColor?: string
}
export default function CardInfo(props: CardInfoInterface): React.JSX.Element {
    const { isDetail, ButtonShow = true, titleColor } = props
    return (
        <CardBox classname="w-full dark:text-white pt-5 mb-5 shadow-md" bgOpacity={10}>
            <div className="pl-3 pr-3 mb-5">
                <h5 className={`mb-5 p-b text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ${!isEmpty(titleColor) ? titleColor : ' xl:text-gray-900'}`}>{!isEmpty(isDetail) ? isDetail?.nomor_dokument : ' -'}</h5>
                <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center flex-col  justify-center w-full">
                            <div className="min-w-0">
                                <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">Tanggal Buat</p>
                            </div>
                            <span className="text-sm ml-0 mr-0">{isDetail?.created_at ? moment(isDetail?.created_at ?? null).format('Y-m-d') : '-'}</span>
                        </div>
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center flex-col  justify-center w-full">
                            <div className="min-w-0">
                                <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">Tanggal Terbit</p>
                            </div>
                            <span className="text-sm ml-0 mr-0">{isDetail?.publish_at ? moment(isDetail?.publish_at ?? null).format('Y-m-d') : '-'}</span>
                        </div>
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center flex-col  justify-center w-full">
                            <div className="min-w-0">
                                <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">Tanggal Pemutakhiran</p>
                            </div>
                            <span className="text-sm ml-0 mr-0">{isDetail?.updated_at ? moment(isDetail?.updated_at ?? null).format('Y-m-d') : '-'}</span>
                        </div>
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center flex-col  justify-center w-full">
                            <div className="min-w-0">
                                <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">Jumlah Baris</p>
                            </div>
                            <span className="text-sm ml-0 mr-0">{isDetail?.number_rows ?? '-'}</span>
                        </div>
                    </li>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center flex-col  justify-center w-full">
                            <div className="min-w-0">
                                <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">Diterbitkan Oleh:</p>
                            </div>
                            <span className="text-sm ml-0 mr-0">{isDetail?.user?.username ?? '-'}</span>
                        </div>
                    </li>
                    {!isEmpty(isDetail) && ButtonShow && (
                        <li className="pb-3 sm:pb-4">
                            <div className="flex justify-center items-center  mt-2">
                                <Link href={`/freight/air-freight/priece/${isDetail?.id}/${isDetail?.freightType?.alias ?? undefined}`} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                    <>
                                        <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-gray-700">
                                            <FaFile />
                                        </span>
                                        <b>Lihat Dokument</b>
                                    </>
                                </Link>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </CardBox>
    )
}
