'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '@/components/layouts/Layout'
import CardBox from '@/components/atoms/CardBox'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import Breadcrumb from '@/components/atoms/Breadcrumb'
import { FaCalculator, FaHome, FaPlus, FaProcedures, FaTrash } from 'react-icons/fa'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'
import Tables from '@/components/molecules/DataTables'
import { api, isEmpty, rupiah, toastConfigTR500 } from '@/utils/_function/utils'
import $ from 'jquery'
import moment from 'moment'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import AsyncSelectComponent from '@/components/molecules/AsyncSelectComponent'
import { useGetOne, usePost } from '@/utils/_hooks/useFetch'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { Modal } from 'flowbite-react'
import InputCurency, { decodeRupiah } from '@/components/molecules/InputRupiah'
import { coloms } from './Colom'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { IStoreScemaUangjalan, ScemaStreetProps } from '@/utils/_interface/Interface-scema-street-money-store'

const StoreScemaUangjalan = () => {
    const { mcartype, mcar, loading, error } = useMasterData(['mcartype', 'mcar'])
    const [ScemaStreet, setScemaStreet] = React.useState<ScemaStreetProps[]>([])
    const [getScema, setScema] = React.useState<any[]>([])
    const [getScemaDistance, setScemaDistance] = React.useState<any[]>([])
    const [getScemaDistanceTotal, setScemaDistanceTotal] = React.useState<any[]>([])
    const [openModalTol, setOpenModalTol] = useState<any>()
    const [thmRecordBp, setThmRecordBp] = useState<any[]>([])
    const [getBiayaTol, setBiayaTol] = useState<any>()
    const [tRefresh, setTrefresh] = useState<Boolean>(false)

    const [inputKonsumsiBbm, setInputKonsumsiBbm] = useState<number>(0)
    const [collectData, setCollectData] = useState<any[]>([])
    const [konsumsiBbm, setKonsumsiBbm] = useState<number>(0)
    const [numberPoliceSelected, setNumberPoliceSelected] = useState<any>(null)
    const [jarakTempuh, setJarakTempuh] = useState<number>(0)
    const [konsumsiBbmLiterPerKm, setKonsumsiBbmLiterPerKm] = useState<number>(0)
    const [konsumsiBbmTotal, setKonsumsiBbmTotal] = useState<any>(0)
    const [literPerKm, setLiterPerKm] = useState<any>(0)
    const [uangMakan, setUangMakan] = useState<any>(0)
    const [jmlUangmakan, setJmlUangmakan] = useState<any>(0)
    const [insentifpp, setInsentifpp] = useState<any>(0)
    const [jmlInsentifPp, setJmlInsentif] = useState<any>(0)
    const [jumlahLumpsum, setJumlahLumpsum] = useState<any>()
    const [sumData, setSumData] = useState<number>(0)

    const [metaOrigin, setMetaOrigin] = useState<any>({})
    const [metaSinggah1, setMetaSinggah1] = useState<any>({})
    const [metaSinggah2, setMetaSinggah2] = useState<any>({})
    const [metaDestination, setMetaDestination] = useState<any>({})
    const [metaSinggah3, setMetaSinggah3] = useState<any>({})
    const [metaSinggah4, setMetaSinggah4] = useState<any>({})
    const [metaFinalDestination, setMetaFinalDestination] = useState<any>({})

    const [data, setData] = useState<any>([])
    const [triggerUpdate, setTriggerUpdate] = useState<Boolean>(false)
    const [effectExecuted, setEffectExecuted] = useState(false)

    const [scemaAction, setScemaAction] = useState<string | any>('store')

    const StorePost = usePost(`${api}/uang-jalan`)
    const useGetFetching = useGetOne()

    // use rouiter
    const router = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()

    /**
     * effect trigger scema update.
     */
    useEffect(() => {
        if (data.length == 0 && !isEmpty(params.get('id'))) {
            hndelSetterUpdate()
        }
    }, [params.get('id')])

    /**
     * setter data update
     */
    const hndelSetterUpdate = () => {
        useGetFetching.fetchData({
            url: `${api}/uang-jalan/${params.get('id')}`,
            onSuccess: (res) => {
                setData(res)
                setScemaAction('update')
                $("[name='rute_perjalanan']").val(res?.rute_perjalanan ?? '')
                $("[name='jenis-mobil']").val(res?.jenis_mobil ?? '')
                $("[name='pengemudi1']").val(res?.pengemudi1 ?? '')
                $("[name='pengemudi2']").val(res?.pengemudi2 ?? '')
                $("[name='lama_perjalanan']").val(res?.lama_perjalanan ?? '')
                const { biaya_non_bbm_detail } = res
                if (biaya_non_bbm_detail) {
                    const columNonBBm = biaya_non_bbm_detail.map((x: any, i: number) => {
                        return {
                            id: uuidv4(),
                            jenis_tol: x?.jenis_tol ?? '',
                            nama_ruas_tol: x?.nama_ruas_tol ?? '',
                            biaya: decodeRupiah(`${x?.biaya}` ?? ''),
                            keterangan: x?.keterangan ?? '',
                        }
                    })
                    setThmRecordBp(columNonBBm)
                    setTrefresh(!tRefresh)
                }
                $("[name='jumlah-mlm-perjalanan']").val(res?.jumlah_mlm_perjalanan)
            },
            onLoading: (v: any) => {},
            onError: (err: any) => {
                console.log(err)
            },
        })
    }

    /**
     * fungsi pembuatan scema rute untuk created data baru
     * @param e
     * @param name
     * @param order
     * @param main
     */
    const hndlerScemaStreet = (e: any, name: string, order?: number, main: boolean = false) => {
        console.log(e, name, order, main)

        const existingDataIndex = ScemaStreet.findIndex((item) => item.name === name)
        const data = {
            cityId: e?.value,
            order: order ?? ScemaStreet.length + 1,
            name: name,
            main: main,
        }

        if (existingDataIndex !== -1) {
            const updatedData = [...ScemaStreet]
            updatedData[existingDataIndex].cityId = e?.value
            setScemaStreet(updatedData)

            if (ScemaStreet.length > 0) {
                const result = []
                console.log('los1', updatedData)
                for (let i = 0; i < updatedData.length - 1; i++) {
                    result.push([updatedData[i], updatedData[i + 1]])
                }

                setScema(result)
            }
        } else {
            const dataStoreState = [...ScemaStreet, data].sort((a, b) => a.order - b.order)
            setScemaStreet(dataStoreState)

            if (ScemaStreet.length > 0) {
                const result = []
                for (let i = 0; i < dataStoreState.length - 1; i++) {
                    result.push([dataStoreState[i], dataStoreState[i + 1]])
                }
                setScema(result)
            }
        }
    }

    /**
     * effect trigger untuk kalkulasi kilometer perjalanan
     */
    useEffect(() => {
        if (getScema) hendlerRoute(getScema)
    }, [getScema])

    /**
     * fungsi sum data untuk data pada tabel temporary biaya non bbm
     * @param data
     * @returns
     */
    function sumTotalBiaya(data: any): number {
        let totalBiaya: number = 0
        for (const item of data) {
            totalBiaya += item.biaya
        }
        return totalBiaya
    }

    /**
     * fungsi kalkulasi kilometer perjalanan pada database untuk 2 titik
     * @param dataStoreState
     */
    const hendlerRoute = async (dataStoreState: ScemaStreetProps[]) => {
        const updatedDataStoreState = [...getScemaDistance]
        dataStoreState.map((xData: any, index: number) => {
            const data = xData
            // const { fetchData } = useGetOne()
            useGetFetching.fetchData({
                url: `${api}/master/rute_travel/comparison?origin=${data[0].cityId}&destination=${data[1].cityId}`,
                onSuccess: (res) => {
                    if (res?.distance) {
                        const distance: string = res?.distance
                        const existingDataIndex = updatedDataStoreState.findIndex((item) => item.name === data[1].name)
                        if (existingDataIndex !== -1) {
                            updatedDataStoreState[existingDataIndex].distance = distance
                        } else {
                            const objTrav: any = {
                                origin_city: data[0].cityId,
                                origin_name_initial: data[0].name,
                                origin_order: data[0].order,
                                destination: data[1].cityId,
                                destination_name_initial: data[1].name,
                                destination_order: data[1].order,
                                name: data[1].name, // fungsi awal bukan untuk backend
                                order: data[1].order, // fungsi awal bukan untuk backend
                                distance: distance,
                            }
                            updatedDataStoreState.push(objTrav)
                        }
                        updatedDataStoreState.sort((a, b) => a.order - b.order)

                        const calculates = updatedDataStoreState.map((calculateDistance, index) => {
                            calculateDistance.distanceTotal = (updatedDataStoreState[index - 1]?.distanceTotal ?? 0) + calculateDistance.distance
                            $(`.${calculateDistance.name}`).val(`${calculateDistance.distanceTotal ?? ''}/${calculateDistance.distance}`)
                            return calculateDistance
                        })
                        setScemaDistanceTotal(calculates)
                    }
                },
                onLoading: (v: any) => {},
                onError: (err) => {
                    console.log(err)
                    $(`.${data[1].name}`).val(``)
                    toast.error('origin and destination found.', toastConfigTR500)
                },
            })
        })
        setScemaDistance(updatedDataStoreState)
    }
    /**
     * fungsi hndel temporary biaya perjanalanan non bbm
     * @param e
     */
    const hndelTemporarySetBiayaPerjalanan = (e: any) => {
        e.preventDefault()

        const formData: any = new FormData(e.target)
        const newData = {
            id: uuidv4(),
            jenis_tol: formData.get('jenis_tol'),
            nama_tol: formData.get('nama_tol'),
            nama_ruas_tol: formData.get('nama_ruas_tol'),
            biaya: decodeRupiah(formData.get('biaya')),
            keterangan: formData.get('keterangan'),
        }

        setThmRecordBp([...thmRecordBp, newData])
        setOpenModalTol(!openModalTol)
        setTrefresh(!tRefresh)
    }
    /**
     * fungsi hndel change selectd nomor polisi
     * @param selected
     */
    const hndelNoPoliceChange = (selected: any) => {
        console.log('>>', selected)
        setNumberPoliceSelected(selected.attr)
    }
    /**
     * fungsi kalkulasi total pemakaian bbm
     * @param e
     */
    const hndelKomsumsiBbm = (e: any) => {
        const values: any = e?.target?.value ?? 0
        setInputKonsumsiBbm(values ?? 0)
        const totalKonsumsiBBms: any = ((values ?? 0) * parseInt(numberPoliceSelected?.mbbm?.harga_per_liter ?? 0)).toFixed(1)
        setKonsumsiBbmTotal(rupiah(totalKonsumsiBBms))
    }

    /**
     * effect kalkulasi konsumsi BBM
     */
    useEffect(() => {
        const jTempuhKm: number = getScemaDistanceTotal[getScemaDistanceTotal.length - 1]?.distanceTotal ?? 0

        const konsumsiPerKm = numberPoliceSelected?.bbm_perkm ?? 0
        const totalBbm: any = jTempuhKm * konsumsiPerKm
        setInputKonsumsiBbm(totalBbm.toFixed(1) ?? 0)

        const totalKonsumsiBBms: any = ((totalBbm.toFixed(1) ?? 0) * parseInt(numberPoliceSelected?.mbbm?.harga_per_liter ?? 0)).toFixed(1)
        setKonsumsiBbmTotal(rupiah(totalKonsumsiBBms))

        const literPerKm: any = (numberPoliceSelected?.bbm_perkm ?? 0) * parseInt(numberPoliceSelected?.mbbm?.harga_per_liter ?? 0)
        setLiterPerKm(literPerKm.toFixed(1) ?? 0)
    }, [getScemaDistanceTotal, numberPoliceSelected])

    /**
     * fungsi save data scema uang jalan
     * @param loaded
     */
    const handleStore = (loaded: any) => {
        const initData = hndelCollectData(() => {})

        StorePost.postData({
            formData: initData,
            responses: (res) => {
                console.log(res)

                toast.success('skema uang jalan berhasil disimpan.', toastConfigTR500)
                router.push(`/scema-street-money`)
            },
            onError: (err) => {
                console.log(err)
            },
        })
    }
    /**
     * fungsi collect dataform
     * @param loaded
     * @returns
     */
    const hndelCollectData = (loaded: any) => {
        const CollectData: any = {
            rute_perjalanan: $("[name='rute_perjalanan']").val(),
            jenis_mobil: $("[name='jenis-mobil']").val(),
            pengemudi1: $("[name='pengemudi1']").val(),
            pengemudi2: $("[name='pengemudi2']").val(),
            lama_perjalanan: $("[name='lama_perjalanan']").val(),
            car_id: numberPoliceSelected?.id,
            travel_distance: getScemaDistance,
            biaya_non_bbm: thmRecordBp,
            biaya_non_bbm_total: sumTotalBiaya(thmRecordBp),
            konsumsi_bbm: inputKonsumsiBbm,
            konsumsi_bbm_total: decodeRupiah(konsumsiBbmTotal),
            bbm_perkm: numberPoliceSelected?.bbm_perkm,
            liter_km: (numberPoliceSelected?.bbm_perkm ?? 0) * (numberPoliceSelected?.mbbm?.harga_per_liter ?? 0),
            harga_bbm: numberPoliceSelected?.mbbm?.harga_per_liter,
            travel_distance_total: getScemaDistanceTotal[getScemaDistanceTotal.length - 1]?.distanceTotal ?? 0,
            spsi: decodeRupiah(`${$("[name='spsi']").val()}`),
            retribusi: decodeRupiah(`${$("[name='retribusi']").val()}`),
            jemtim: decodeRupiah(`${$("[name='jemtim']").val()}`),
            parkir: decodeRupiah(`${$("[name='parkir']").val()}`),
            mel: decodeRupiah(`${$("[name='mel']").val()}`),
            lainnya: decodeRupiah(`${$("[name='lainnya']").val()}`),
            jumlah_lumpsum: decodeRupiah(`${$("[name='jumlah-lumpsum']").val()}`),
            jumlah_mlm_perjalanan: decodeRupiah(`${$("[name='jumlah-mlm-perjalanan']").val()}`),
            lumpsum_per_malam: decodeRupiah(`${$("[name='lumpsum-per-malam']").val()}`),
            jumlah_insentif: decodeRupiah(`${$("[name='jumlah-insentif']").val()}`),
            insentif_pp: decodeRupiah(`${$("[name='insentif-pp']").val()}`),
            jumlah_uang_makan: decodeRupiah(`${$("[name='jumlah-uang-makan']").val()}`),
            uang_muka_harian: decodeRupiah(`${$("[name='uang-muka-harian']").val()}`),
            scema_perjalanan: ScemaStreet,
        }

        const calculate =
            CollectData.konsumsi_bbm_total + // Total konsumsi BBM
            CollectData.biaya_non_bbm_total + // Total biaya non-BBM
            CollectData.spsi + // Biaya SP/SI
            CollectData.retribusi + // Biaya retribusi
            CollectData.jemtim + // Biaya jemput timbal balik
            CollectData.parkir + // Biaya parkir
            CollectData.mel + // Biaya bensin, minyak pelumas, dan cairan pendingin
            CollectData.lainnya + // Biaya lainnya
            CollectData.jumlah_lumpsum + // Jumlah lump sum
            CollectData.jumlah_insentif + // Jumlah insentif
            CollectData.jumlah_uang_makan // Jumlah uang makan
        // tambah object total paket pada data
        CollectData.total_biaya = calculate
        if (scemaAction == 'update') CollectData.id = data.id
        setSumData(calculate)
        return CollectData
    }
    /**
     *funsgi parsing stter rute update
     */
    useEffect(() => {
        if (!isEmpty(data?.scema_distances) && !effectExecuted) {
            setDataRute(data?.scema_distances)
            setEffectExecuted(true)
        }
    }, [data, effectExecuted])
    /**
     * fungsi setter kalkulasi rute
     */
    const metaRute = async (data_parsing: any, name_init: string) => {
        if (data_parsing) {
            return new Promise<void>((resolve, reject) => {
                useGetFetching.fetchData({
                    url: `${api}/uang-jalan/getCity/${data_parsing?.city?.id}`,
                    onSuccess: (res) => {
                        if (name_init == 'origin') setMetaOrigin(res[0])
                        if (name_init == 'singgah1') setMetaSinggah1(res[0])
                        if (name_init == 'singgah2') setMetaSinggah2(res[0])
                        if (name_init == 'destination') setMetaDestination(res[0])
                        if (name_init == 'singgah3') setMetaSinggah3(res[0])
                        if (name_init == 'singgah4') setMetaSinggah4(res[0])
                        if (name_init == 'final-destination') setMetaFinalDestination(res[0])
                        const e = res[0]
                        const name = name_init
                        const order: any = data_parsing?.order
                        const main: any = data_parsing?.main

                        const inQueryResult = (prevScemaStreet: any) => {
                            const updatedData = [
                                ...prevScemaStreet,
                                {
                                    cityId: e?.value,
                                    order: order ?? ScemaStreet.length + 1,
                                    name: name,
                                    main: main,
                                },
                            ].sort((a, b) => a.order - b.order)
                            if (prevScemaStreet.length > 0) {
                                const result = updatedData
                                    .map((item, index) => {
                                        if (index < updatedData.length - 1) {
                                            return [item, updatedData[index + 1]]
                                        }
                                        return null
                                    })
                                    .filter(Boolean)
                                console.log('los2', result)

                                setScema(result)
                            }

                            return updatedData
                        }
                        setScemaStreet((prevScemaStreet) => inQueryResult(prevScemaStreet))
                        resolve()
                    },
                    onError: (error) => {
                        // Handle error jika diperlukan
                        console.error(`Error fetching data for ${name_init}:`, error)

                        // Resolve promise dengan error
                        resolve()
                    },
                    onLoading: () => {
                        // Handle loading state jika diperlukan
                    },
                })
            })
        } else {
            console.error('Data tidak valid untuk diproses.')
        }
    }
    /**
     * fungsi setter data rute form update
     */
    const setDataRute = async (data: any = []) => {
        if (Array.isArray(data)) {
            const sortedLocations = data.sort((a, b) => a.order - b.order)

            const promises = sortedLocations.map(async (x) => {
                await metaRute(x, x?.name_initial)
                await new Promise((resolve) => setTimeout(resolve, 1000))
            })

            Promise.all(promises)
                .then(() => {})
                .catch((error) => {
                    // Tangani kesalahan yang mungkin terjadi selama iterasi
                    console.error('Kesalahan selama iterasi:', error)
                })
        }
    }
    return (
        <Layout isAuth={true} header="Skema Uang Jalan">
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
                                            label: 'Sekma Uang Jalan',
                                            url: '/scema-street-money',
                                        },
                                        {
                                            icon: (
                                                <>
                                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                                                    </svg>
                                                </>
                                            ),
                                            label: 'Store',
                                            url: 'store',
                                        },
                                    ]}
                                />
                            </div>
                            {/* save */}
                            <ButtonLoading onClick={(loading) => handleStore(loading)} />
                        </div>
                        <CardBox classname=" shadow-md dark:text-white mt-0 mb-3 md:p-5 xl:p-5" bgOpacity={50}>
                            <div className="row mb-3">
                                <div className="md:col-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowra flex mr-3 roboto-500 mb-2">
                                            Tanggal Buat
                                        </label>
                                        <input readOnly name="created_at" value={moment().format('Y-m-d')} type="text" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500 mb-2">
                                            Rute Perjalanan
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <select
                                                onChange={(e: any) => {
                                                    if (e.target.value == 1) {
                                                        $('#rute-select').show()
                                                        $('#rute-select').html('P')
                                                    } else if (e.target.value == 2) {
                                                        $('#rute-select').show()
                                                        $('#rute-select').html('PP')
                                                    } else {
                                                        $('#rute-select').hide()
                                                    }
                                                }}
                                                id="rute_perjalanan"
                                                name="rute_perjalanan"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  rounded-tr-[0] rounded-br-[0] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option selected>PILIH RUTE</option>
                                                <option value="1">1 Trip</option>
                                                <option value="2">2 Trip</option>
                                            </select>
                                            <div id="rute-select" className="pl-2 pr-2 rounded-tr-md rounded-br-md bg-gray-800 mr-1 flex justify-center items-center text-white"></div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500 mb-2">
                                            Jenis Mobil
                                        </label>
                                        <select name="jenis-mobil" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>PILIH JENIS MOBIL</option>
                                            {mcartype &&
                                                mcartype.map((x: any, i: number) => (
                                                    <option key={i} value={x?.id}>
                                                        {x?.types}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Nomor Polisi
                                        </label>
                                        <AsyncSelectComponent
                                            collectData="mcar"
                                            urls="master/select-async"
                                            handleInputChange={(e: ChangeEvent<any>) => {
                                                hndelNoPoliceChange(e)
                                            }}
                                            setIdSelected={!isEmpty(data) ? data?.car_id ?? null : null}
                                            SelectedValueById={scemaAction == 'update' ? hndelNoPoliceChange : (e) => {}}
                                            // defaultInputValue={}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Nama Pengemudi 1
                                        </label>
                                        <input name="pengemudi1" type="text" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Nama Pengemudi 2
                                        </label>
                                        <input name="pengemudi2" type="text" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Lama Perjalanan
                                        </label>
                                        <div className="flex items-center">
                                            <input name="lama_perjalanan" type="number" className="w-1/2 block mr-2  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            Hari
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Cabang Asal
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                value={(metaOrigin && metaOrigin) ?? {}}
                                                className=" w-full"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    hndlerScemaStreet(e, 'origin', 1, true)
                                                }}
                                                // setCityId={}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Singgah Ke-1
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                value={(metaSinggah1 && metaSinggah1) ?? {}}
                                                className=" w-full"
                                                isDisabled={ScemaStreet.length == 0}
                                                appendTlc={true}
                                                tlcClass="bg-gray-800"
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    hndlerScemaStreet(e, 'singgah1', 2)
                                                }}
                                            />
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 singgah1" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Singgah Ke-2
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                isDisabled={ScemaStreet.length == 0}
                                                appendTlc={true}
                                                tlcClass="bg-gray-800"
                                                value={(metaSinggah2 && metaSinggah2) ?? {}}
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    hndlerScemaStreet(e, 'singgah2', 3)
                                                }}
                                            />

                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 singgah2" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Cabang Tujuan
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                isDisabled={ScemaStreet.length == 0}
                                                appendTlc={true}
                                                value={(metaDestination && metaDestination) ?? {}}
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    hndlerScemaStreet(e, 'destination', 4, true)
                                                }}
                                            />
                                            <input type="text" className="w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 destination" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700  flex mr-3 roboto-500">
                                            Singgah Ke-1
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                isDisabled={ScemaStreet.length == 0}
                                                appendTlc={true}
                                                tlcClass="bg-gray-800"
                                                value={(metaSinggah3 && metaSinggah3) ?? {}}
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    hndlerScemaStreet(e, 'singgah3', 5)
                                                }}
                                            />

                                            <input type="text" className="singgah3 w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Singgah Ke-2
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                isDisabled={ScemaStreet.length == 0}
                                                appendTlc={true}
                                                tlcClass="bg-gray-800"
                                                value={(metaSinggah4 && metaSinggah4) ?? {}}
                                                handleInputChange={(e: ChangeEvent<any>) => {
                                                    hndlerScemaStreet(e, 'singgah4', 6)
                                                }}
                                            />

                                            <input type="text" className="singgah4 w-[80px] md:w-[80px] xl:w-[100px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Cabang Tujuan
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <SelectAsyncCity
                                                className=" w-full"
                                                isDisabled={ScemaStreet.length == 0}
                                                appendTlc={true}
                                                value={(metaFinalDestination && metaFinalDestination) ?? {}}
                                                handleInputChange={(e: any) => {
                                                    hndlerScemaStreet(e, 'final-destination', 7, true)
                                                }}
                                            />

                                            <input type="text" className="final-destination w-[80px] md:w-[80px] xl:w-[100px]  block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Jarak Tempuh
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <input
                                                onChange={(e: ChangeEvent<any>) => setJarakTempuh(e.target.value)}
                                                value={`${getScemaDistanceTotal[getScemaDistanceTotal.length - 1]?.distanceTotal ?? 0} Km`}
                                                type="text"
                                                className="w-[150px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="row mb-4">
                                <div className="md:col-6">
                                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <h4 className="mb-2">
                                            <strong>Biaya Paket Perjalanan</strong>
                                        </h4>
                                        <div className="inline-flex rounded-md shadow-sm w-full" role="group">
                                            <InputCurency getValues={(val: any) => {}} name="sumData" costumClass="w-1/2 px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-blue-500 rounded-l-lg  focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700" values={sumData} />

                                            <button type="button" className="w-1/2 bg-blue-500 px-4 py-2 text-sm font-medium  border border-blue-500 rounded-r-lg  text-white hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                                1.350.000
                                            </button>

                                            <ButtonLoading offLabelLoading label={<FaCalculator />} classes="bg-green-500 rounded-full ml-1 px-3 py-2 text-sm font-medium  border border-green-500 text-white hover:bg-green-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-green-500 focus:bg-green-500 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700" onClick={(loading) => hndelCollectData(loading)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="row mb-4">
                                <div className="md:col-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Konsumsi BBM
                                        </label>
                                        <div className="flex h-full justify-start w-full items-center">
                                            <input onChange={hndelKomsumsiBbm} value={inputKonsumsiBbm ?? 0} type="text" className="w-[150px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            <span className="font-08em ml-1">Liter</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Total
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <input value={konsumsiBbmTotal} type="text" className="w-[150px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="md:col-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            BBM per Kilometer
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <input type="text" className="w-[150px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={numberPoliceSelected?.bbm_perkm ?? 0} />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Liter / Km
                                        </label>
                                        <div className="flex">
                                            <div className="flex h-full justify-start w-full items-center">
                                                <input readOnly value={literPerKm} type="text" className="w-[150px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                <span className="font-08em flex flex-nowrap ml-1">Rp / Km</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                            Harga BBM per Liter
                                        </label>
                                        <div className="flex h-full justify-start w-full">
                                            <input value={rupiah(`${parseInt(numberPoliceSelected?.mbbm?.harga_per_liter) ?? 0}`)} type="text" className="w-[150px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="row mb-4">
                                <div className="md:col-12">
                                    <div className="w-full flex justify-between items-center">
                                        <h4 className="mb-2">
                                            <strong>Biaya Perjalanan (Non BBM)</strong>
                                        </h4>
                                        <button
                                            type="button"
                                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            onClick={() => {
                                                setOpenModalTol(!openModalTol)
                                            }}
                                        >
                                            <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-red-700">
                                                <FaPlus />
                                            </span>
                                            <b>Daftar Harga</b>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:col-12 mb-5">
                                    <Tables
                                        selectedRow={false}
                                        auth={true}
                                        dataCostum={thmRecordBp ?? []}
                                        onSelected={(res) => {}}
                                        onRowClick={() => {}}
                                        refresh={tRefresh}
                                        columns={coloms({
                                            onRemove: (rows: any) => {
                                                const updatedThmRecordBp = thmRecordBp.filter((item) => item.id !== rows.id)
                                                setThmRecordBp(updatedThmRecordBp)
                                                setTrefresh(!tRefresh)
                                            },
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="md:col-6">
                                    <div className="flex items-center flex-col">
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                SPSI
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="spsi"
                                                    values={scemaAction == 'update' ? data?.spsi : null}
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Retribusi
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="retribusi"
                                                    values={scemaAction == 'update' ? data?.retribusi : null}
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Jembatan Timbang
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="jemtim"
                                                    values={scemaAction == 'update' ? data?.jemtim : null}
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-6">
                                    <div className="flex items-center flex-col">
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Parkir
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="parkir"
                                                    values={scemaAction == 'update' ? data?.parkir : null}
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Mel
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="mel"
                                                    values={scemaAction == 'update' ? data?.mel : null}
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Lainnya
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="lainnya"
                                                    values={scemaAction == 'update' ? data?.lainnya : null}
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="row mb-4">
                                <div className="md:col-4">
                                    <div>
                                        <h4 className="mb-2">
                                            <strong>Biaya Pengemudi</strong>
                                        </h4>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Uang Makan Harian (/ pengemudi)
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {
                                                        setUangMakan(val)
                                                        const getLamaPerjalanan: any = $("[name='lama_perjalanan']").val()
                                                        const lamaPerjalanan: any = (decodeRupiah(val) ?? 0) * parseInt(getLamaPerjalanan)
                                                        setJmlUangmakan(lamaPerjalanan)
                                                    }}
                                                    name="uang-muka-harian"
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    values={scemaAction == 'update' ? data?.uang_muka_harian : decodeRupiah(`${uangMakan}`)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Jumlah Uang Makan
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="jumlah-uang-makan"
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    attributes={{
                                                        readOnly: true,
                                                    }}
                                                    values={scemaAction == 'update' ? data?.jumlah_uang_makan : jmlUangmakan}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-4">
                                    <div>
                                        <h4 className="mb-2">
                                            <strong>Insentif Pengemudi</strong>
                                        </h4>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Insentif PP (/ pengemudi)
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {
                                                        setInsentifpp(val)
                                                        const getPengemudi: any = !isEmpty($("[name='pengemudi2']").val()) ? 2 : 1
                                                        const lamaPerjalanan = (decodeRupiah(val) ?? 0) * parseInt(getPengemudi)
                                                        setJmlInsentif(lamaPerjalanan)
                                                    }}
                                                    name="insentif-pp"
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    values={scemaAction == 'update' ? data?.insentif_pp : insentifpp}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Jumlah Insentif
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="jumlah-insentif"
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    attributes={{
                                                        readOnly: true,
                                                    }}
                                                    values={scemaAction == 'update' ? data?.jumlah_insentif : jmlInsentifPp}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-4">
                                    <div>
                                        <h4 className="mb-2">
                                            <strong>Lumpsum</strong>
                                        </h4>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Lumpsum per malam (/ Pengemudi)
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {
                                                        const jmlMlm = parseInt(`${$("[name='jumlah-mlm-perjalanan']").val()}`)
                                                        const jmlLmp = (decodeRupiah(val) ?? 0) * jmlMlm
                                                        if (!isNaN(jmlLmp)) setJumlahLumpsum(jmlLmp)
                                                    }}
                                                    name="lumpsum-per-malam"
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    values={scemaAction == 'update' ? data?.lumpsum_per_malam : null}
                                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                Jumlah Malam Perjalanan
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <input
                                                    name="jumlah-mlm-perjalanan"
                                                    type="number"
                                                    className="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(el: any) => {
                                                        const getLP: any = decodeRupiah(`${$("[name='lumpsum-per-malam']").val()}`)
                                                        const jmlLmp = (getLP ?? 0) * parseInt(el.target.value)
                                                        if (!isNaN(jmlLmp)) setJumlahLumpsum(jmlLmp)
                                                    }}
                                                    defaultValue={``}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                                jumlah Lumpsum
                                            </label>
                                            <div className="flex h-full justify-start w-full">
                                                <InputCurency
                                                    getValues={(val: any) => {}}
                                                    name="jumlah-lumpsum"
                                                    costumClass="w-[250px] block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    attributes={{
                                                        readOnly: true,
                                                    }}
                                                    values={scemaAction == 'update' ? data?.jumlah_lumpsum : jumlahLumpsum}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBox>
                    </div>
                </div>
            </div>

            <Modal show={openModalTol} size={`2xl`} onClose={() => setOpenModalTol(!openModalTol)}>
                <Modal.Header>Modal Tol</Modal.Header>
                <Modal.Body>
                    <div
                        className="pr-2"
                        style={{
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            paddingLeft: '2px',
                        }}
                    >
                        <form onSubmit={hndelTemporarySetBiayaPerjalanan}>
                            <div className="mb-3">
                                <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                    Jenis Tol
                                </label>
                                <select name="jenis_tol" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Pilih Jenis Tol</option>
                                    <option value="tol1">Jalan 1</option>
                                    <option value="tol2">Jalan 2</option>
                                    <option value="tol3">Jalan 3</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                    Nama Ruas Tol
                                </label>
                                <input name="nama_ruas_tol" type="text" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                    Biaya
                                </label>
                                <InputCurency
                                    getValues={(val: any) => setBiayaTol(val)}
                                    name="biaya"
                                    // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                                />
                                {/* <input name="biaya" type="text" className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" /> */}
                            </div>
                            {/* textrea keterangan */}
                            <div className="mb-3">
                                <label htmlFor="" className="font-08em whitespace-nowrap text-gray-700 flex mr-3 roboto-500">
                                    Keterangan
                                </label>
                                <textarea name="keterangan" rows={3} className="w-full block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                            <div className="mb-3 flex justify-end mt-10">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-blue-700">
                                        <FaPlus />
                                    </span>
                                    <b>Daftar Harga</b>
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer className="flex justify-end"></Modal.Footer> */}
            </Modal>
        </Layout>
    )
}

export default StoreScemaUangjalan
