/** @format */

'use client'
import React, { useState, useEffect } from 'react'
import DataTable, { IDataTableProps } from 'react-data-table-component'
import { customStyles } from '@/styles/datatable'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { isEmpty } from '@/utils/_function/utils'
import { token } from '@/utils/_function/token'

import Paper from '@mui/material/Paper'
import { Dropdown } from 'flowbite-react'
import { FaFilter } from 'react-icons/fa'

interface propsInterface {
    columns: any[]
    url?: string
    logApiSuccess?: any
    logApiError?: any
    pages?: number
    auth?: Boolean
    refresh?: Boolean
    onSelected?: (events: any) => void
    className?: String
    selectedRow?: Boolean | any
    filter?: any[] | any
    HeadflexStart?: any
    HeadflexEnd?: any
    onRowClick?: (events: any) => void
    query?: string
    dataCostum?: any[]
}
const error = console.error
console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return
    error(...args)
}
function Tables(props: propsInterface) {
    const { auth, onSelected, className, selectedRow, filter, onRowClick, dataCostum } = props
    const [data, setData] = useState<{ data: any; total: number }>({ data: [], total: 0 })
    const [page, setPage] = useState<number>(1)

    const [colom, setColom] = useState<any[]>(props.columns)
    const [colomFilter, setColomFilter] = useState<any[]>([])
    const [filterColom, setFilterColom] = useState<any[]>([])

    const countPerPage = 20
    const router = useRouter()
    const getList = async () => {
        try {
            const tokens: string | null = await token
            const useData: any = await axios
                .get(`${props.url}?page=${page}&per_page=${countPerPage}&delay=1&format=dt${props.query ?? ''}`, {
                    headers: {
                        Authorization: 'Bearer ' + tokens, // Ganti dengan token otentikasi Anda
                        'Content-Type': 'application/json',
                    },
                })
                .catch((error) => {
                    // if (auth == true) router.push('/auth')
                    console.log(error.message)
                })
            const main_data: any = useData.data
            setData(main_data)
        } catch (error: any) {
            // if (auth == true && error.status == 401) router.push('/auth')
            console.log(error.message)
        }
        console.log(token)
    }

    const setPages = () => {
        const seter_page: number = props.pages ?? 1
        setPage(seter_page)
    }

    useEffect(() => {
        if (isEmpty(props.url))
            setData({
                data: dataCostum,
                total: dataCostum?.length ?? 0,
            })
        else getList()
    }, [page, props.refresh])

    /**
     * ================================================================================
     * units filter
     */
    useEffect(() => {
        if (props?.columns) {
            setColomFilter(
                props?.columns?.map((x: any) => {
                    return {
                        name: x?.name,
                        visible: !isEmpty(filter) && filter.includes(x?.name) ? false : true,
                    }
                }) ?? [],
            )
        }
    }, [props.columns])
    const hendleUpdateFilter = (e: any, x: any) => {
        const updatedColomFilter = [...colomFilter]
        const index = updatedColomFilter.findIndex((item) => item.name === x.name)
        updatedColomFilter[index].visible = e.target.checked
        setColomFilter(updatedColomFilter)
    }
    useEffect(() => {
        const invisibleColumns = colomFilter.filter((colom) => colom.visible === false)
        const invisibleColumnNames = invisibleColumns.map((colom) => colom.name)
        setFilterColom(invisibleColumnNames)
    }, [colomFilter])
    //====================================================================================

    return (
        <div className={`table-container ${className}`}>
            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                <h3>
                    {/* <strong>Harga Vendor {dataPriece?.freightType?.freight_type_name ?? ''}</strong> */}

                    {props?.HeadflexStart && props?.HeadflexStart()}
                </h3>
                <div className="flex items-center">
                    {/* <SearchForm /> */}
                    {props?.HeadflexEnd && props?.HeadflexEnd()}
                    {filter && (
                        <div className="mr-1 ml-1">
                            <Dropdown dismissOnClick={false} label={<FaFilter />} color={`#111`} arrowIcon={false} size="sm">
                                {colomFilter?.map((x: any, i: number) => (
                                    <Dropdown.Item key={i} className="p-0 pl-1 pr-1">
                                        <input id={`${x?.name}`} className="w-3 h-3 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name={`${x?.name}`} defaultChecked={x.visible} onChange={(e) => hendleUpdateFilter(e, x)} />
                                        <label htmlFor={`${x?.name}`} className="text-sm">
                                            {x?.name}
                                        </label>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                    )}
                </div>
            </div>
            <Paper>
                <DataTable
                    columns={hideColumns(props.columns, filterColom)}
                    data={data.data}
                    customStyles={customStyles}
                    noHeader
                    noDataComponent="..."
                    pagination
                    selectableRows={selectedRow ?? true}
                    onSelectedRowsChange={(ev: any) => {
                        if (onSelected) onSelected(ev)
                    }}
                    paginationServer
                    paginationTotalRows={data.total}
                    paginationPerPage={countPerPage}
                    onRowClicked={onRowClick}
                    // paginationComponentOptions={{
                    //     noRowsPerPage: true,
                    // }}
                    highlightOnHover
                    pointerOnHover
                    onChangePage={(rows: number) => setPage(rows)}
                />
            </Paper>
        </div>
    )
}
export const hideColumns = (columns: any, columnsToHide: any) => {
    return columns.filter((column: any) => {
        return !columnsToHide.includes(column.name)
    })
}

export default Tables

// model table example
// const columns: any = [
//     {
//         name: 'Avatar',
//         cell: (row: any) => <img height="30px" width="30px" alt={row.first_name} src={row.avatar} />,
//     },
//     {
//         name: 'First Name',
//         selector: 'first_name',
//     },
//     {
//         name: 'Last Name',
//         selector: 'last_name',
//     },
//     {
//         name: 'Email',
//         selector: 'email',
//     },
// ]
