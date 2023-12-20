/** @format */

'use client'
import React, { useState, useEffect, SyntheticEvent } from 'react'
import CardBox from '@/components/atoms/CardBox'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Layout from '@/components/layouts/Layout'
import moment from 'moment'
import { Modal } from 'flowbite-react'
import ListDetail from '@/components/atoms/ListDetail'
import CheckBoxComponent from '@/components/atoms/CheckBox'
import { FaEye, FaHome, FaPlus, FaUpload, FaEdit, FaTrash, FaFile } from 'react-icons/fa'
import fetchGetAgreement from '@/utils/_fetch/fetch-get-agreement'
import Tables from '@/components/molecules/DataTables'
import PageFormCompany from '@/components/organisms/page-form-company'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import postDataCompany from '@/utils/_fetch/post-data-company'
import SelectAsyncCompany from '@/components/molecules/SelectAsyncCompany'
import FileMultySelection from '@/components/molecules/FileMultySelection'
import ListFileUpload from '@/components/molecules/ListFileUpload'
import { toast } from 'react-toastify'
import { JsonEncode, api, isEmpty, toastConfigTR1000, toastConfigTR500 } from '@/utils/_function/utils'
import pcpexpress from '@/data/PcpexpressCompany'
import { useFetch, usePatch, usePost } from '@/utils/_hooks/useFetch'
import MenuDaftarHarga from '@/components/organisms/MenuDaftarHarga'
import PageFormPriece from '@/components/organisms/page-form-priece'
import OptionTable from '@/components/atoms/OptionTable'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Link from 'next/link'
import OptionTableVerical from '@/components/atoms/OptionTableVerical'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import { PrieceColom, colomAttc } from './Colom'

// import { Tabs } from 'flowbite-react'

import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardInfoDetails from '@/app/vendors/components/CardInfoDetails'

interface VendorsTypes {
    nomor_kontrak: string
    contract_types_id: number | null
    company_holder_id: number
    is_agent: boolean
    start_period: any
    end_period: any
    description: string
}

const StoreVendors: React.FC = () => {
    const [agr, setAgr] = useState<any>([])
    const [agrAgent, setAgrAgent] = useState<any>([])
    const [dataCheckedAgrement, setDataChekedAgrement] = useState([])
    const [dataCheckedAgent, setDataChekedAgent] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openModalCompany, setOpenModalCompany] = useState(false)
    const [categotyFile, setCategoryFile] = useState<any>(null)
    const [formDataCompany, setFormDataCompany] = useState<any>()
    const [getCompany, setCompany] = useState<any>({})
    const [attecment, setAttecment] = useState<any>([])
    const [attecmentTrigger, setAttecmentTrigger] = useState<Boolean>(false)
    const [isCheckedAgent, setIsCheckedAgent] = useState<any>(false)
    const [formData, setFormData] = useState<any>()
    const [vendorId, setVendorId] = useState<Number | String | undefined>(undefined)
    const [openModalMenuFreig, setOpenModalMenuFreig] = useState<Boolean | any>()
    const [openModalPrieceFreig, setOpenModalPrieceFreig] = useState<Boolean | any>()
    const [openModalFreig, setOpenModalFreig] = useState<Boolean | any>()
    const [formFreightComponent, setFormFreightComponent] = useState<any>()
    const [getFreigTitle, setFreigTitle] = useState<any>()
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [refreshTriggerAttect, setRefreshTriggerAttect] = useState(false)

    const [getDocumentStatus, setDocumentStatus] = useState<any>(null)
    const [getDocumentName, setDocumentName] = useState<any>(null)

    const [value, setValue] = useState(0)
    const [detailPriece, setDetailPriece] = useState<any>()

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    /**
     * Hooks
     */
    const router = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()

    const contractType = useFetch(`${process.env.BACKEND_URL_PREFIX}/master/m-contract-types`)
    const post_vendors = usePost(`${process.env.BACKEND_URL_PREFIX}/vendor`)
    const post_attec = usePost(`${process.env.BACKEND_URL_PREFIX}/vendor`)
    // const patch_vendors = usePatch(`${process.env.BACKEND_URL_PREFIX}/vendor/${vendorId}`)
    const vendorExist = useFetch(`${process.env.BACKEND_URL_PREFIX}/vendor/${params.get('id') ?? undefined}/id`)

    const updateContract = usePatch(`${api}/contract-priece`)
    // const FileCategory = useFetch(`${process.env.BACKEND_URL_PREFIX}/master/m-category-file`)
    const getDataVendorExsits = vendorExist?.data?.result ?? null

    const { mstatusdocument, mnamedocument, mdocumentcategori, loading, error } = useMasterData(['mstatusdocument', 'mnamedocument', 'mdocumentcategori'])

    useEffect(() => {
        const getVenId: any = params.get('id') ?? undefined
        if (getVenId) setVendorId(getVenId)
        if (!isEmpty(vendorId)) setVendorId(params.get('id') ?? undefined)
        if (isEmpty(params.get('id'))) checkAgrementLogixStore()
        defautValues()
    }, [])

    const checkAgrementLogixStore = () => {
        fetchGetAgreement((read: any) => {
            const usingDataAgreement: any = []
            const usingDataAgreementAgent: any = []
            read?.data?.map((y: any) => {
                if (y?.magreement_types?.agreement_types_name == 'default') {
                    usingDataAgreement.push({
                        label: y?.statement,
                        name: y?.id,
                        checked: false,
                    })
                } else {
                    usingDataAgreementAgent.push({
                        label: y?.statement,
                        name: y?.id,
                        checked: false,
                    })
                }
            })
            setDataChekedAgrement(usingDataAgreement)
            setDataChekedAgent(usingDataAgreementAgent)
        })
    }

    const checkAgrementLogixUpdate = () => {
        fetchGetAgreement((read: any) => {
            const usingDataAgreement: any = []
            const usingDataAgreementAgent: any = []
            read?.data?.map((y: any) => {
                const Ck = getDataVendorExsits ? getDataVendorExsits.agrement.some((items: any) => items.m_agreement_id === y?.id) : false
                if (y?.magreement_types?.agreement_types_name == 'default') {
                    usingDataAgreement.push({
                        label: y?.statement,
                        name: y?.id,
                        checked: Ck,
                    })
                    setAgr((prevData: any) => ({
                        ...prevData,
                        [y?.id]: Ck,
                    }))
                } else {
                    usingDataAgreementAgent.push({
                        label: y?.statement,
                        name: y?.id,
                        checked: Ck,
                    })
                    setAgr((prevData: any) => ({
                        ...prevData,
                        [y?.id]: Ck,
                    }))
                }
            })
            setDataChekedAgrement(usingDataAgreement)
            setDataChekedAgent(usingDataAgreementAgent)
        })
    }

    useEffect(() => {
        defautValues()
        if (!isEmpty(getDataVendorExsits)) checkAgrementLogixUpdate()
    }, [getDataVendorExsits])

    const defautValues = () => {
        const defaultObj: VendorsTypes = {
            nomor_kontrak: getDataVendorExsits?.nomor_kontrak ?? '',
            contract_types_id: getDataVendorExsits?.contract_types_id ?? null,
            company_holder_id: getDataVendorExsits?.company_holder_id ?? null,
            is_agent: getDataVendorExsits?.is_agent ?? false,
            start_period: getDataVendorExsits?.start_period ?? moment().format('YYYY-MM-DD'),
            end_period: getDataVendorExsits?.end_period ?? moment().format('YYYY-MM-DD'),
            description: '',
        }
        if (getDataVendorExsits?.is_agent) setIsCheckedAgent(getDataVendorExsits?.is_agent)
        hndelChangeCompany({ attr: getDataVendorExsits?.companyHolder })
        setFormData(defaultObj)
        setFormData((prevData: any) => ({
            ...prevData,
            description: getDataVendorExsits?.description ?? null,
        }))
    }

    const hndelChangeCompany = (vals: any) => {
        setCompany(vals?.attr)
        setFormData((prevData: any) => ({
            ...prevData,
            company_holder_id: vals?.attr?.id ?? null,
        }))
    }

    const handleInputChange = (e: any, components?: any) => {
        if (isEmpty(components)) {
            const { id, value } = e.target
            setFormData((prevData: any) => ({
                ...prevData,
                [id]: value,
            }))
        } else {
            setFormData((prevData: any) => ({
                ...prevData,
                [components]: e?.value,
            }))
        }
    }

    const handleAgreementChange = (e: any) => {
        const { name, checked } = e.target
        setAgr((prevData: any) => ({
            ...prevData,
            [name]: checked,
        }))
    }

    const handleAgreementDefaultValues = (name: string, checked: string) => {
        setAgr((prevData: any) => ({
            ...prevData,
            [name]: checked,
        }))
    }

    const handleAgreementAgentChange = (e: any) => {
        const { name, checked } = e.target
        setAgrAgent((prevData: any) => ({
            ...prevData,
            [name]: checked,
        }))
    }

    const hendleStore = (loading: any) => {
        const form_data: any = new FormData()
        form_data.append('vendors', JsonEncode(formData))

        for (let i = 0; i < attecment.length; i++) {
            form_data.append('attecment', attecment[i])
        }

        form_data.append('categoty_file', categotyFile)
        form_data.append('status_document_id', getDocumentStatus)
        form_data.append('document_name_id', getDocumentName)

        form_data.append('agrment', JsonEncode(agr))
        form_data.append('agrment_agent', JsonEncode(agrAgent))
        form_data.append('is_agent', isCheckedAgent)

        if (!isEmpty(vendorId)) {
            form_data.append('id', vendorId)
        }
        post_vendors.postData({
            formData: form_data,
            responses: (results) => {
                setVendorId(results.vendor.id ?? undefined)
                // sessionStorage.setItem(`${page_name}.venId`, results.vendor.id ?? undefined)
                setTimeout(() => loading(false), 500)
                toast.success(results.message, toastConfigTR500)
                router.push(`${pathname}?id=${results.vendor.id}`)
                setAttecment([])
                setRefreshTriggerAttect(!refreshTriggerAttect)
            },
            header: {
                'Content-Type': 'multipart/form-data',
            },
            onError: (error: any) => {
                let msg: string = ``
                try {
                    const { response, message } = error
                    msg = response?.data?.message ?? ''
                    const mgs = response?.data?.error ?? {}
                    Object.keys(mgs).forEach((key) => {
                        toast.error(`${key} ${error.error[key]}`, toastConfigTR1000)
                    })
                    if (isEmpty(mgs)) {
                        toast.error(`${response?.data?.originError}`, toastConfigTR1000)
                    }
                } catch (error: any) {
                    msg = error?.message ?? ''
                    toast.error(msg, toastConfigTR1000)
                }

                setTimeout(() => loading(false), 500)
            },
        })
    }

    const listDetailVen = [
        {
            label: 'Nama Perusahaan',
            value: getDataVendorExsits?.contractType?.contract_types ?? '',
        },
        {
            label: 'Periode Kontrak',
            value: (
                <div className="flex justify-center items-center flex-col">
                    <strong>{getDataVendorExsits?.start_period ?? '-'}</strong>
                    <small>S/D</small>
                    <strong>{getDataVendorExsits?.end_period ?? '-'}</strong>
                </div>
            ),
        },
        {
            label: 'Nomor Kontrak',
            value: getDataVendorExsits?.nomor_kontrak ?? '',
        },
        {
            label: 'Dibuat Oleh',
            value: getDataVendorExsits?.user?.username ?? '',
        },
    ]

    const hndelingRowClick = (rows: any) => {
        setDetailPriece(() => (
            <li className="pb-3 sm:pb-4">
                <div className="flex justify-center items-center  mt-2">
                    <Link href={`/vendors/priece/${rows?.id}`} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        <>
                            <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-gray-700">
                                <FaFile />
                            </span>
                            <b>Lihat Detail Harga</b>
                        </>
                    </Link>
                </div>
            </li>
        ))
    }

    const updateStatusPriece = (even: any, row: any) => {
        updateContract.patchData({
            data: {
                status_id: even.target.value,
            },
            id: row.id,
            responses: (ev) => {
                setRefreshTrigger(!refreshTrigger)
                toast.success(`status berhasil di update ${even.target.value}`, toastConfigTR1000)
            },
            onError: (error: any) => {
                setRefreshTrigger(!refreshTrigger)
                toast.error(`status gagal di update ${even.target.value}`, toastConfigTR1000)
            },
        })
    }

    return (
        <Layout header="Management Vendor & Agent">
            <div>
                <div className="fixed z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none  ">
                    <div className="w-[108rem] flex-none flex justify-end">
                        <picture>
                            <source type="image/avif" />
                            <img src="https://www.braydoncoyer.dev/_next/static/media/rays.426980b9.png" className="w-[71.75rem] flex-none max-w-none opacity-50" decoding="async" />
                        </picture>
                    </div>
                </div>
            </div>
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    {
                        <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-white dark:text-white">
                                    <Breadcrumb
                                        wg={[
                                            {
                                                icon: (
                                                    <>
                                                        <FaHome />
                                                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                        </svg>
                                                    </>
                                                ),
                                                label: 'Vendor',
                                                url: '/vendors',
                                            },
                                            {
                                                icon: (
                                                    <>
                                                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                        </svg>
                                                    </>
                                                ),
                                                label: 'Form Entry Vendor',
                                                url: '',
                                            },
                                        ]}
                                    />
                                </div>
                                <ButtonLoading
                                    onClick={(loading) => {
                                        hendleStore(loading)
                                    }}
                                />
                            </div>

                            <CardBox classname="w-full shadow-md dark:text-white mt-0 mb-3 md:p-5 xl:p-5" bgOpacity={50}>
                                <Box sx={{ width: '100%' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="secondary tabs example">
                                        <Tab {...a11yProps(0)} label="Vendor" />
                                        <Tab {...a11yProps(1)} label="Lampiran" />
                                        <Tab {...a11yProps(2)} disabled={isEmpty(vendorId)} label="Harga Vendor" />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <div className="flex justify-end mb-5">
                                        <div className="flex justify-center items-center">
                                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                Tanggal
                                            </label>
                                            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required disabled value={moment().format('YYYY-MM-DD')} />
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="row row-cols-12 mb-10">
                                        <div className="row row-cols-12">
                                            <div className="col-12 sm:col-6 mb-2 md:col-4 xl:col-3">
                                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                    Tanggal Awal
                                                </label>
                                                <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required id="start_period" name="start_period" value={formData?.start_period ?? moment().format('YYYY-MM-DD')} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-12 sm:col-6 mb-2 md:col-4 xl:col-3">
                                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                    Tanggal Akhir
                                                </label>
                                                <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required id="end_period" name="end_period" value={formData?.end_period ?? moment().format('YYYY-MM-DD')} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-12 sm:col-6 mb-2 md:col-4 xl:col-3">
                                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                    Nomor Kontrak
                                                </label>
                                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="nomor kontrak" id="nomor_kontrak" name="nomor_kontrak" value={formData?.nomor_kontrak ?? ''} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-12 sm:col-6 mb-2 md:col-4 xl:col-3">
                                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                    Jenis Kontrak
                                                </label>

                                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="contract_types_id" name="contract_types_id" value={formData?.contract_types_id ?? ''} onChange={handleInputChange}>
                                                    <option selected>pilih jenis kontrak</option>
                                                    {contractType.data &&
                                                        contractType.data.map((x: any, i: number) => (
                                                            <option key={i} value={x?.id ?? ''}>
                                                                {x?.contract_types ?? ''}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="row row-cols-12 mb-5">
                                        <div className="col-12 sm:col-12 md:col-6 xl:col-6">
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="first_name" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                    Pemegang Kontrak
                                                </label>
                                                <a className="cursor-pointer hover:text-blue-600" onClick={() => setOpenModalCompany(!openModalCompany)}>
                                                    <FaPlus />
                                                </a>
                                            </div>
                                            <SelectAsyncCompany handleInputChange={hndelChangeCompany} />
                                            <ListDetail
                                                data={(() => {
                                                    return [
                                                        {
                                                            keys: 'Nama Perushaan',
                                                            value: getCompany?.company_name ?? '',
                                                        },
                                                        {
                                                            keys: 'Nama',
                                                            value: getCompany?.name ?? '',
                                                        },
                                                        {
                                                            keys: 'Alamat 1',
                                                            value: getCompany?.address_1 ?? '',
                                                        },
                                                        {
                                                            keys: 'Alamat 2',
                                                            value: getCompany?.address_2 ?? '',
                                                        },
                                                        {
                                                            keys: 'Kota',
                                                            value: getCompany?.city?.city_name ?? '',
                                                        },
                                                    ]
                                                })()}
                                            />
                                        </div>
                                        <div className="col-12 sm:col-12 md:col-6 xl:col-6 ">
                                            <label htmlFor="first_name" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">
                                                Pemilik Kontrak
                                            </label>

                                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly disabled value={`PT. YAPINDO TRANSPOT`} />
                                            <ListDetail
                                                data={(() => {
                                                    return [
                                                        {
                                                            keys: 'Nama Perushaan',
                                                            value: pcpexpress.company_name ?? '',
                                                        },
                                                        {
                                                            keys: 'Nama',
                                                            value: pcpexpress?.name ?? '',
                                                        },
                                                        {
                                                            keys: 'Alamat 1',
                                                            value: pcpexpress?.address_1 ?? '',
                                                        },
                                                        {
                                                            keys: 'Alamat 2',
                                                            value: pcpexpress?.address_2 ?? '',
                                                        },
                                                        {
                                                            keys: 'Kota',
                                                            value: pcpexpress?.city?.city_name ?? '',
                                                        },
                                                    ]
                                                })()}
                                            />
                                        </div>
                                    </div>
                                    {/**
                                     * =======================================================================================\
                                     * checkbox
                                     */}
                                    {dataCheckedAgrement.length > 0 && (
                                        <div className="row row-cols-12 mb-5">
                                            <label>Kesepakatan Kontrak</label>
                                            <div className="col-12 sm:col-12 md:col-12 xl:col-12">
                                                <div className="flex items-center shadow-sm p-4 mb-4 mt-3 text-gray-800 border-t-4 border-blue-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800" role="alert">
                                                    <div className="flex items-center mr-4">
                                                        <CheckBoxComponent onChange={handleAgreementChange} onDefaultInject={handleAgreementDefaultValues} data={dataCheckedAgrement} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="isAgent"
                                                    type="checkbox"
                                                    checked={isCheckedAgent}
                                                    onChange={() => {
                                                        setIsCheckedAgent(!isCheckedAgent)
                                                        setAgrAgent([])
                                                    }}
                                                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor="isAgent" className="ml-2">
                                                    Tambahan Khusus Agen / Perwakilan
                                                </label>
                                            </div>
                                            {isCheckedAgent && (
                                                <div className="col-12 sm:col-12 md:col-12 xl:col-12">
                                                    <div className="flex items-center shadow-sm p-4 mb-4  mt-3 text-gray-800 border-t-4 border-blue-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800" role="alert">
                                                        <div className="flex items-center mr-4">
                                                            <CheckBoxComponent onChange={handleAgreementAgentChange} data={dataCheckedAgent} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {/* ===================================    </CHECKBOX> ===================================== */}

                                    <div className="row row-cols-12 mb-5">
                                        <div className="col-12">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Keterangan
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write your thoughts here..."
                                                id="description"
                                                name="description"
                                                value={formData?.description ?? ''}
                                                onChange={handleInputChange}
                                                defaultValue={getDataVendorExsits?.description ?? ''}
                                            />
                                        </div>
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <div className="row row-cols-12 mb-5">
                                        <div className="col-12 sm:col-12 md:col-12 xl:col-12">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Upload Lampiran
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpenModal(true)
                                                        setAttecment([])
                                                        setDocumentStatus(null)
                                                        setDocumentName(null)
                                                    }}
                                                    className="ml-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    <FaUpload /> <span className="ml-2">{attecment.length != 0 ? '(' + attecment.length + ')' : ''} Upload Lapiran</span>
                                                </button>
                                            </div>
                                            {vendorId && <Tables auth={true} className={`mt-2`} url={`${api}/vendor/${vendorId}/attecment`} columns={colomAttc()} onSelected={() => {}} refresh={refreshTriggerAttect} />}

                                            {/* modal form upload attetcment */}
                                            <Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
                                                <Modal.Header>Upload Lampiran</Modal.Header>
                                                <Modal.Body>
                                                    <div>
                                                        <div className="mb-3">
                                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                Jenis Dokumen
                                                            </label>
                                                            <select
                                                                id="countries"
                                                                onChange={(val: any) => {
                                                                    setCategoryFile(val.target.value)
                                                                }}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                                <option selected>pilih Kategoti</option>
                                                                {mdocumentcategori &&
                                                                    mdocumentcategori?.map((ct: any, i: number) => (
                                                                        <option key={i} value={`${ct.id}`}>
                                                                            {ct.category_name}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                Status Dokumen
                                                            </label>
                                                            <select
                                                                id="countries"
                                                                onChange={(val: any) => {
                                                                    setDocumentStatus(val.target.value)
                                                                }}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                                <option selected>pilih status dokumen</option>
                                                                {mstatusdocument &&
                                                                    mstatusdocument?.map((ct: any, i: number) => (
                                                                        <option key={i} value={`${ct.id}`}>
                                                                            {ct.status_name}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                Nama Dokumen
                                                            </label>
                                                            <select
                                                                id="countries"
                                                                onChange={(val: any) => {
                                                                    setDocumentName(val.target.value)
                                                                }}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                                <option selected>pilih nama dokumen</option>
                                                                {mnamedocument &&
                                                                    mnamedocument?.map((ct: any, i: number) => (
                                                                        <option key={i} value={`${ct.id}`}>
                                                                            {ct.name}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">
                                                                Upload Lampiran
                                                            </label>
                                                            <FileMultySelection
                                                                onChange={(Ir: any) => {
                                                                    setAttecmentTrigger(false)
                                                                    setAttecment(Ir)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="flex justify-end">
                                                    <ButtonLoading
                                                        className="bg-blue-500 w-[10rem] flex justify-center items-center"
                                                        label={`Oke`}
                                                        onClick={(loadings) => {
                                                            setTimeout(() => {
                                                                setAttecmentTrigger(true)
                                                                // loadings(false)
                                                                setOpenModal(!openModal)
                                                            }, 500)
                                                        }}
                                                    />
                                                </Modal.Footer>
                                            </Modal>

                                            {/* <div
                                       className="flex items-center  p-4 mb-4 mt-3 text-gray-800 border-t-4 border-b-4 border-blue-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800"
                                       role="alert"
                                    >
                                       <div className="flex items-center mr-4">
                                          

                                          {attecmentTrigger && <ListFileUpload files={attecment} />}
                                       </div>
                                    </div> */}
                                        </div>
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    {!isEmpty(vendorId) && (
                                        <>
                                            <div className="w-full flex justify-between">
                                                <h5>Daftar Harga Vendor</h5>
                                                <div>
                                                    {/* <button
                                             type="button"
                                             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                          >
                                             <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-green-700">
                                                <FaPlus />
                                             </span>
                                             <b>Import</b>
                                             <span className="ml-2">
                                                <FaFileExcel />
                                             </span>
                                          </button> */}
                                                    <button
                                                        type="button"
                                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                        onClick={() => {
                                                            setOpenModalPrieceFreig(!openModalPrieceFreig)
                                                            // setOpenModalMenuFreig(!openModalMenuFreig)
                                                        }}
                                                    >
                                                        <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                                                            <FaPlus />
                                                        </span>
                                                        <b>Daftar Harga</b>
                                                    </button>
                                                </div>
                                            </div>
                                            <Tables
                                                auth={true}
                                                url={`${api}/contract-priece/${vendorId}`}
                                                columns={PrieceColom({
                                                    hndelChangeStatus: updateStatusPriece,
                                                })}
                                                onSelected={() => {}}
                                                refresh={refreshTrigger}
                                                onRowClick={hndelingRowClick}
                                            />
                                        </>
                                    )}
                                </CustomTabPanel>
                            </CardBox>
                        </div>
                    }
                    {/**
                     * ===============================================================================================
                     * CARD INFO
                     */}
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfoDetails list={listDetailVen} title={getDataVendorExsits?.vendors_code ?? 'VDR ... ...'} titleColor="">
                            <>{value == 2 && detailPriece}</>
                        </CardInfoDetails>
                    </div>
                    {/* =================== <> ================================================================== */}
                </div>
            </div>

            {/* modal companny */}
            <Modal show={openModalCompany} size={`5xl`} onClose={() => setOpenModalCompany(!setOpenModalCompany)}>
                <Modal.Header>Form Entry Company</Modal.Header>
                <Modal.Body>
                    <PageFormCompany
                        getData={(resonse: any) => {
                            setFormDataCompany(resonse)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <ButtonLoading
                        className="bg-primary-500 w-[10rem] flex justify-center items-center"
                        onClick={(loadings) => {
                            postDataCompany({
                                form: formDataCompany,
                                response: (res: any) => {
                                    setTimeout(() => {
                                        // loadings(false)
                                        setOpenModalCompany(!setOpenModalCompany)
                                        toast.success('new company success save!', {
                                            position: 'top-right',
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: 'light',
                                        })
                                        setFormDataCompany([])
                                    }, 1500)
                                },
                                errors: (error: any) => {
                                    setTimeout(() => {
                                        // loadings(false)
                                    }, 500)
                                },
                            })
                        }}
                    />
                </Modal.Footer>
            </Modal>

            {/* modal menu daftar harga */}
            <Modal show={openModalMenuFreig} size={`sm`} onClose={() => setOpenModalMenuFreig(!openModalMenuFreig)}>
                <Modal.Header>Pengisian Daftar Harga</Modal.Header>
                <Modal.Body>
                    <MenuDaftarHarga
                        titleComponent={(titles: string) => setFreigTitle(titles)}
                        onFreigtComponent={(components: React.FC) => {
                            setFormFreightComponent(components)
                            setOpenModalFreig(!openModalFreig)
                            setOpenModalMenuFreig(!openModalMenuFreig)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer className="flex justify-end"></Modal.Footer>
            </Modal>

            {/* modal priece */}
            <Modal show={openModalPrieceFreig} size={`5xl`} onClose={() => setOpenModalPrieceFreig(!openModalPrieceFreig)}>
                <Modal.Header>Pengisian Daftar {getFreigTitle ?? ''}</Modal.Header>
                <Modal.Body>
                    <div
                        className="pr-2"
                        style={{
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        <PageFormPriece
                            venId={vendorId}
                            onEvn={({ action, status }) => {
                                console.log({ action, status })

                                if (action == 'store' && status == true) {
                                    setOpenModalPrieceFreig(!openModalPrieceFreig)
                                    setRefreshTrigger(!refreshTrigger)
                                }
                            }}
                        />
                    </div>
                </Modal.Body>
                {/* <Modal.Footer className="flex justify-end"></Modal.Footer> */}
            </Modal>

            {/* modal freight */}
            <Modal show={openModalFreig} size={`5xl`} onClose={() => setOpenModalFreig(!openModalFreig)}>
                <Modal.Header>Pengisian Daftar {getFreigTitle ?? ''}</Modal.Header>
                <Modal.Body>
                    <div
                        className="pr-2"
                        style={{
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        {formFreightComponent}
                    </div>
                </Modal.Body>
                {/* <Modal.Footer className="flex justify-end"></Modal.Footer> */}
            </Modal>
        </Layout>
    )
}

export default StoreVendors

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
