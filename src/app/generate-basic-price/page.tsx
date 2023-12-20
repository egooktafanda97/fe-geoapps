/** @format */
'use client'
import React from 'react'

import ButtonLoading from '@/components/atoms/ButtonLoading'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/Layout'
import AsyncSelectComponent from '@/components/molecules/AsyncSelectComponent'
import { useRouter } from 'next/navigation'
import { IoSyncCircleSharp } from 'react-icons/io5'
import CardInfo from '../freight/components/CardInfoDetails'

export default function GenerateBasicPriece(): React.JSX.Element {
    const router = useRouter()
    return (
        <Layout isAuth={true} header="Pembuatan Harga Pokok Operasional & Penjualan">
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <CardBox classname="w-100 p-5">
                            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                                <div></div>
                                <div className="flex"></div>
                            </div>
                            {
                                <div className="row mb-3">
                                    <div className="col-12 sm:col-6">
                                        {/* select option region */}
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                Jenis Layanan
                                            </label>
                                            <div className="flex">
                                                <AsyncSelectComponent className={`w-1/2`} collectData="mcar" urls="master/select-async" handleInputChange={() => {}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                <div className="row mb-5">
                                    <div className="col-12 sm:col-6">
                                        <h3 className="mb-5">
                                            <strong>Harga Pokok Operasional</strong>
                                        </h3>
                                        <div className="mb-3">
                                            <h3 className="mb-4">
                                                <strong>
                                                    <span className="p-2 bg-blue-500 rounded-full text-white">K1</span> Komponen Awal (First Mail)
                                                </strong>
                                            </h3>
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Pengantaran
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                <div className="row mb-5">
                                    <h3 className="mb-4">
                                        <strong>
                                            <span className="p-2 bg-blue-500 rounded-full text-white">K1</span> Komponen Awal (First Mail)
                                        </strong>
                                    </h3>

                                    <div className="row">
                                        <div className="col-12 sm:col-6">
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 sm:col-6">
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 sm:col-6">
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 sm:col-6">
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 sm:col-6">
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 sm:col-6">
                                            <div className="w-full mb-2">
                                                <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                    Biaya Penjemputan
                                                </label>
                                                <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Pilih Region</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="row mb-5">
                                <h3 className="mb-4">
                                    <strong>
                                        <span className="p-2 bg-blue-500 rounded-full text-white">K1</span> Komponen Awal (First Mail)
                                    </strong>
                                </h3>
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <div className="w-full mb-2">
                                            <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                Biaya Penjemputan
                                            </label>
                                            <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="">Pilih Region</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-6">
                                    <div className="mb-3">
                                        <div className="w-full mb-2">
                                            <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                                Biaya Penjemputan
                                            </label>
                                            <select name="" id="" className="w-1/2 block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="">Pilih Region</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
