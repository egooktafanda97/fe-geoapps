/** @format */

import OptionTable from '@/components/atoms/OptionTable'
import OptionTableVerical from '@/components/atoms/OptionTableVerical'
import { rupiah } from '@/utils/_function/utils'
import moment from 'moment'
import React from 'react'
interface ColLand {
    hndelUpdate: (res: any) => void
}
/**
 *
 * @param param0
 * @returns colom land
 */
export const ColumnsLand: any = ({ hndelUpdate }: ColLand) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Tanggal',
        cell: (row: any) => <span style={{ width: '200px' }}>{moment(row?.create_date).format('YYYY-MM-DD') ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Asal',
        cell: (row: any) => row?.origin?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Tujuan',
        cell: (row: any) => row?.destination?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Jenis Moda',
        cell: (row: any) => row?.moda?.moda_name ?? '',
        sortable: true,
    },
    {
        name: 'Tipe',
        cell: (row: any) => row?.mtype?.name_type ?? '',
        sortable: true,
    },
    {
        name: 'Layanan',
        cell: (row: any) => row?.service?.service_name ?? '',
        sortable: true,
    },
    {
        name: 'Berat-1',
        cell: (row: any) => `${row?.in_weight_one ?? ''} s/d ${row?.out_weight_one ?? ''}`,
        sortable: true,
        wrap: true,
    },
    {
        name: 'Min Berat-1',
        cell: (row: any) => row?.min_berat_one ?? '',
        sortable: true,
    },
    {
        name: 'Harga Ke-1',
        cell: (row: any) => rupiah(`${row?.priece_one}`) ?? '',
        sortable: true,
    },
    {
        name: 'Berat-2',
        cell: (row: any) => `${row?.in_weight_two ?? ''} s/d ${row?.out_weight_two ?? ''}`,
        sortable: true,
    },
    {
        name: 'Min Berat-2',
        cell: (row: any) => row?.min_berat_two ?? '',
        sortable: true,
    },
    {
        name: 'Harga Ke-2',
        cell: (row: any) => rupiah(`${row?.priece_two}`) ?? '',
        sortable: true,
    },
    {
        name: 'Min Charge',
        cell: (row: any) => rupiah(`${row?.min_charge}`) ?? '',
        sortable: true,
    },
    {
        name: '#',
        width: '100px',
        cell: (row: any) => (
            <div>
                <OptionTableVerical detailClick={``} editClick={() => hndelUpdate(row)} destoryClick={() => 'hapus'} />
            </div>
        ),
    },
]

/**
 *
 * @param (hndeling)
 * @returns colom air
 */
export const ColumnsAir: any = ({ hndelUpdate }: ColLand) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Tanggal',
        cell: (row: any) => <span style={{ width: '200px' }}>{moment(row?.create_date).format('YYYY-MM-DD') ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Asal',
        cell: (row: any) => row?.origin?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Tujuan',
        cell: (row: any) => row?.destination?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Airline',
        cell: (row: any) => row?.airline?.airline_name ?? '',
        state: { columnVisibility: { Airline: false } },
    },
    {
        name: 'ID',
        cell: (row: any) => row?.airline?.alias ?? '',
        sortable: true,
    },
    {
        name: 'Berat',
        cell: (row: any) => `${row?.weight ?? ''} ${row?.unitsWeight?.alias ?? ''}`,
        sortable: true,
    },
    {
        name: 'Tarif SMU',
        cell: (row: any) => rupiah(`${row?.tarif_smu ?? '0'}`),
        sortable: true,
        wrap: true,
    },
    {
        name: 'PPN',
        cell: (row: any) => rupiah(`${row?.ppn ?? '0'}`),
        sortable: true,
    },
    {
        name: 'Handling Fee',
        cell: (row: any) => rupiah(`${row?.heandling_fee}`) ?? '',
        sortable: true,
    },
    {
        name: 'Biaya Admin',
        cell: (row: any) => rupiah(`${row?.biaya_admin ?? '0'}`),
        sortable: true,
    },
    {
        name: 'Surcharge',
        cell: (row: any) => rupiah(`${row?.surcharge_ac ?? '0'}`),
        sortable: true,
    },
    {
        name: '#',
        width: '100px',
        cell: (row: any) => (
            <div>
                <OptionTableVerical
                    detailClick={function () {
                        console.log('ok')
                    }}
                    editClick={() => hndelUpdate(row)}
                    destoryClick={() => 'hapus'}
                />
            </div>
        ),
    },
]

/**
 *
 * @param (hndeling)
 * @returns colom air
 */
export const ColumnsSea: any = ({ hndelUpdate }: ColLand) => [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no + 1 ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Tanggal',
        cell: (row: any) => <span style={{ width: '200px' }}>{moment(row?.create_date).format('YYYY-MM-DD') ?? ''}</span>,
        sortable: true,
    },
    {
        name: 'Asal',
        cell: (row: any) => row?.origin?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Tujuan',
        cell: (row: any) => row?.destination?.city_districts_name ?? '',
        sortable: true,
    },
    {
        name: 'Jenis Moda',
        cell: (row: any) => row?.moda?.moda_name ?? '',
        sortable: true,
    },
    {
        name: 'Tipe',
        cell: (row: any) => row?.mtype?.name_type ?? '',
        sortable: true,
    },
    {
        name: 'Service',
        cell: (row: any) => row?.service?.service_name ?? '',
        sortable: true,
    },
    {
        name: 'Trailing Origin',
        cell: (row: any) => row?.tralling_origin ?? '',
        sortable: true,
    },
    {
        name: '@Container',
        cell: (row: any) => row?.atcontainer ?? '',
        sortable: true,
    },
    {
        name: 'Stuffing',
        cell: (row: any) => row?.stuffing ?? '',
        sortable: true,
    },
    //data hide default
    {
        name: 'Container',
        cell: (row: any) => `${row?.container} ft` ?? '',
        sortable: true,
    },
    {
        name: 'Thc',
        cell: (row: any) => rupiah(row?.thc) ?? '',
        sortable: true,
    },
    {
        name: 'Lolo',
        cell: (row: any) => rupiah(row?.lolo) ?? '',
        sortable: true,
    },
    {
        name: 'Bill of Lading',
        cell: (row: any) => rupiah(row?.bill_ofladding) ?? '',
        sortable: true,
    },
    {
        name: 'Segel',
        cell: (row: any) => rupiah(row?.segel) ?? '',
        sortable: true,
    },
    {
        name: 'Materai',
        cell: (row: any) => rupiah(row?.materai) ?? '',
        sortable: true,
    },
    {
        name: 'Surcharge Freight',
        cell: (row: any) => rupiah(row?.surcharge_freight) ?? '',
        sortable: true,
    },
    {
        name: 'Surcharge Alih Kapal',
        cell: (row: any) => rupiah(row?.surcharge_alih_kapal) ?? '',
        sortable: true,
    },
    {
        name: 'ASDP',
        cell: (row: any) => rupiah(row?.asdp) ?? '',
        sortable: true,
    },
    {
        name: 'Other Hand Fees',
        cell: (row: any) => rupiah(row?.other_hand_fees) ?? '',
        sortable: true,
    },
    {
        name: 'Storage Alih Kapal',
        cell: (row: any) => rupiah(row?.storage_alih_kapal) ?? '',
        sortable: true,
    },
    {
        name: 'Trailer Destination',
        cell: (row: any) => rupiah(row?.trailer_destination) ?? '',
        sortable: true,
    },
    {
        name: 'Amount',
        cell: (row: any) => rupiah(row?.amount) ?? '',
        sortable: true,
    },
    {
        name: 'Leadtime',
        cell: (row: any) => rupiah(row?.leadtime) ?? '',
        sortable: true,
    },
    {
        name: 'HPP',
        cell: (row: any) => rupiah(row?.hpp) ?? '',
        sortable: true,
    },
    {
        name: '#',
        width: '100px',
        cell: (row: any) => (
            <div>
                <OptionTableVerical detailClick={``} editClick={() => hndelUpdate(row)} destoryClick={() => 'hapus'} />
            </div>
        ),
    },
]
