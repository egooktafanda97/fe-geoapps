/** @format */

import OptionTableVerical from '@/components/atoms/OptionTableVerical'

const columns: any = [
    {
        name: 'No',
        cell: (row: any) => <span style={{ width: '10px' }}>{row?.no ?? 0}</span>,
        width: '10px',
    },
    {
        name: 'Kode Kontrak',
        cell: (row: any) => row?.vendors_code ?? '',
    },
    {
        name: 'Jenis Vendors',
        cell: (row: any) => row?.contractType?.contract_types ?? '',
    },
    {
        name: 'Nomor Kontrak',
        selector: 'nomor_kontrak',
        sortable: true,
        sortField: 'nomor_kontrak',
    },
    {
        name: 'Nama Perusahaan',
        cell: (row: any) => row?.companyHolder?.company_name ?? '',
    },
    {
        name: 'Tanggal Buat',
        selector: 'start_period',
    },
    {
        name: 'Akhir Kontrak',
        selector: 'end_period',
    },
    {
        name: '',
        width: '70px',
        cell: (row: any) => <OptionTableVerical detailLink={`/vendors/store?id=${row?.id ?? undefined}`} editClick={() => 'edit'} destoryClick={() => 'hapus'} />,
    },
]

export default columns
