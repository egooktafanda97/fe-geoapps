/** @format */

import PageFreightCostLand from './page-freight-cost-Land'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import PageFreightCostSea from './page-freight-cost-sea'
import PageFreightCostAir from './page-freight-cost-air'

export default function MenuDaftarHarga({ onFreigtComponent, titleComponent }: { onFreigtComponent: any; titleComponent: any }) {
    return (
        <>
            <div className="w-full flex justify-center flex-col">
                <button type="button" className="mb-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                        <FaPlus />
                    </span>
                    <b>Harga Agent</b>
                </button>
                <button type="button" className="mb-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                        <FaPlus />
                    </span>
                    <b>Harga Agent</b>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        titleComponent('Harga Vendor Freight - Darat')
                        onFreigtComponent(<PageFreightCostLand />)
                    }}
                    className="mb-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                        <FaPlus />
                    </span>
                    <b>Harga Vendor Freight - Darat</b>
                </button>
                <button
                    type="button"
                    className="mb-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    onClick={() => {
                        titleComponent('Harga Vendor Freight - Laut')
                        onFreigtComponent(<PageFreightCostSea />)
                    }}
                >
                    <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                        <FaPlus />
                    </span>
                    <b>Harga Vendor Freight - Laut</b>
                </button>
                <button
                    type="button"
                    className="mb-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    onClick={() => {
                        titleComponent('Harga Vendor Freight - Udara')
                        onFreigtComponent(<PageFreightCostAir />)
                    }}
                >
                    <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                        <FaPlus />
                    </span>
                    <b>Harga Vendor Freight - Udara</b>
                </button>
            </div>
        </>
    )
}
