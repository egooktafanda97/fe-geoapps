'use client'
import CardBox from '@/components/atoms/CardBox'
import Layout from '@/components/layouts/LayoutMaster'
import React, { useEffect } from 'react'
import Tables from '@/components/molecules/DataTables'
import SearchForm from '@/components/atoms/SearchForm'
import { ColomnInterface } from '@/utils/_interface/DatatableInterface'

// Initialize jquery and Datatable

const columns: ColomnInterface[] = [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.id ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'City Name',
        selector: 'city_name',
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Province Name',
        cell: (row: any) => row.province.province_name,
        sortable: true,
        sortField: 'director',
    },
    {
        name: 'Tlc',
        selector: 'tlc',
        sortField: 'director',
    },
    {
        name: 'City districts Name',
        selector: 'city_districts_name',
        sortField: 'director',
    },
]
const City: React.FC = (): React.JSX.Element => {
    return (
        <Layout>
            <div className="jumbotrons z-0 lg:pl-64 p-4 absolute h-[200px] dark:bg-opacity-40 bg-astronaut-950 w-full text-white">
                <div className="flex w-full h-full justify-between pl-3 items-center"></div>
            </div>
            <div className="p-4 sm:ml-20 lg:ml-64 relative z-10">
                <div className="mt-20 pt-10">
                    <CardBox classname="w-100">
                        <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                            <h3>city</h3>
                            <div>
                                <SearchForm />
                            </div>
                        </div>
                        <Tables auth={true} url={`${process.env.BACKEND_URL_PREFIX}/master/m-city`} columns={columns} />
                    </CardBox>
                </div>
            </div>
        </Layout>
    )
}

export default City
