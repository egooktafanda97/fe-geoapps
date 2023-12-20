/** @format */

import { useMasterData } from '@/utils/_hooks/useMasterData'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import InputGroupValidation from '@/components/molecules/InputGroupValidation'
import InputValidation from '@/components/molecules/InputValidation'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import InputCurency, { decodeRupiah } from '@/components/molecules/InputRupiah'
import { usePatch, usePost } from '@/utils/_hooks/useFetch'
import { JsonEncode, api, getDataById, isEmpty } from '@/utils/_function/utils'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import $ from 'jquery'

export default function PageFreightCostLand(props: any) {
    const { FaSearchreightTypeId, ContractPriceId, tipes, hendelTrigger, methods } = props
    const [units, setUnits] = useState<String>('')
    const [formData, setFormData] = useState<any>({})
    const { landState } = useSelector((state: any) => state?.landFreight ?? '')

    /**
     * form state
     */
    const [getTgl, setTgl] = useState<any>(moment().format('YYYY-MM-DD'))
    const [getAsal, setAsal] = useState<any>()
    const [getTujuan, setTujuan] = useState<any>()
    const [getJenismoda, setJenisModa] = useState<any>()
    const [getSelectType, setSelectType] = useState<any>()
    const [getStuan_berat, setSatuanBerat] = useState<any>()
    const [getLayanan, setLayanan] = useState<any>()
    const [getBeratH1, setBeratH1] = useState<any>()
    const [getBeratSdH1, setBeratSdH1] = useState<any>()
    const [getMinBeratH1, setMinBeratH1] = useState<any>()
    const [getHargaH1, setHargaH1] = useState<any>()
    const [getBeratH2, setBeratH2] = useState<any>()
    const [getBeratSdH2, setBeratSdH2] = useState<any>()
    const [getMinBeratH2, setMinBeratH2] = useState<any>()
    const [getHargaH2, setHargaH2] = useState<any>()
    const [getMinimumCharge, setMinimumCharge] = useState<any>()
    const [id, setId] = useState<Number | null>(null)

    /**
     * </String>
     */
    const apiPost = usePost(`${api}/freight/land`)
    const apipatch = usePatch(`${api}/freight/land`)

    const { mmoda, mtype, muwidget, mservice, loading, error } = useMasterData(['mmoda', 'mtype', 'muwidget', 'moda', 'mservice', 'city', 'type'])

    const hndelChangeUnitWidget = (event: any) => {
        const selectedValue = event.target.value
        setSatuanBerat(event.target.value)
        const selectedObject = muwidget.find((x: any) => x.id === parseInt(selectedValue))
        if (selectedObject) {
            setUnits(selectedObject.alias)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const dataControl: IFreightCoseDarat = {
            freight_type_id: parseInt(FaSearchreightTypeId) ?? 0,
            contract_price_id: parseInt(ContractPriceId) ?? 0,
            create_date: getTgl,
            origin_id: getAsal?.value ?? '',
            destination_id: getTujuan?.value ?? '',
            moda_id: getJenismoda?.id ?? getJenismoda,
            type_id: parseInt(getSelectType),
            // moda_type_id: parseInt(getSelectType),
            units_weight_id: parseInt(getStuan_berat),
            service_id: parseInt(getLayanan),
            in_weight_one: getBeratH1,
            out_weight_one: getBeratSdH1,
            min_berat_one: getMinBeratH1,
            priece_one: decodeRupiah(getHargaH1),
            in_weight_two: getBeratH2,
            out_weight_two: getBeratSdH2,
            min_berat_two: getMinBeratH2,
            priece_two: decodeRupiah(getHargaH2),
            min_charge: decodeRupiah(getMinimumCharge),
        }

        if (!isEmpty(landState))
            apipatch.patchData({
                id: id ?? 0,
                data: dataControl,
                responses(result) {
                    console.log(result)
                },
                onError: () => {},
            })
        else
            apiPost.postData({
                formData: dataControl,
                responses: (res) => {
                    hendelTrigger()
                    setTimeout(() => {
                        toast.success('Vendor Land Freight Price Successfully Saved!', {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        })
                    }, 1500)
                },
                onError: (erros: any) => {
                    toast.error('Failed to Save Vendor Land Freight Price!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    })
                },
            })
    }
    useEffect(() => {
        resetState()
    }, [])
    useEffect(() => {
        if (!isEmpty(landState) && muwidget) {
            isDefaultUpdate()
        }
    }, [muwidget])
    const resetState = () => {
        setId(null)
        setTgl('') // Atur ke nilai awal yang kosong
        setAsal('') // Atur ke nilai awal yang kosong
        setTujuan('') // Atur ke nilai awal yang kosong
        setJenisModa('')
        $('#jenis_moda').val('') // Anda mungkin ingin menghindari menggunakan jQuery untuk mengakses DOM
        setSelectType('')
        $('#tipes').val('') // Anda mungkin ingin menghindari menggunakan jQuery untuk mengakses DOM
        setSatuanBerat('')
        setUnits('')
        setLayanan('')
        setBeratH1('')
        setBeratSdH1('')
        setMinBeratH1('')
        setHargaH1('')
        setBeratH2('')
        setBeratSdH2('')
        setMinBeratH2('')
        setHargaH2('')
        setMinimumCharge('')
    }

    const isDefaultUpdate = () => {
        setId(landState?.id)
        setTgl(moment(landState?.create_date).format('YYYY-MM-DD'))
        setAsal(
            {
                id: landState?.origin?.id,
                label: landState?.origin?.city_name ?? '',
                value: landState?.origin?.id ?? '',
                attr: landState?.origin ?? '',
            } ?? '',
        )
        setTujuan(
            {
                id: landState?.destination?.id,
                label: landState?.destination?.city_name ?? '',
                value: landState?.destination?.id ?? '',
                attr: landState?.destination ?? '',
            } ?? '',
        )
        setJenisModa(landState?.moda?.id ?? '')
        $('#jenis_moda').val(landState?.moda?.id ?? '')
        setSelectType(landState?.modaType?.id ?? '')
        $('#tipes').val(landState?.modaType?.id ?? '')
        setSatuanBerat(landState?.units_weight_id)
        const selectedObject = muwidget.find((x: any) => x.id === parseInt(landState?.units_weight_id))
        if (selectedObject) {
            setUnits(selectedObject.alias)
        }
        setLayanan(landState?.service_id ?? '')
        setBeratH1(landState?.in_weight_one ?? '')
        setBeratSdH1(landState?.out_weight_one ?? '')
        setMinBeratH1(landState?.min_berat_one ?? '')
        setHargaH1(landState?.priece_one ?? '')
        setBeratH2(landState?.in_weight_two ?? '')
        setBeratSdH2(landState?.out_weight_two ?? '')
        setMinBeratH2(landState?.min_berat_two ?? '')
        setHargaH2(landState?.priece_two ?? '')
        setMinimumCharge(landState?.min_charge ?? '')
    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="row row-cols-12 mb-5">
                {
                    <div className="col-12 sm:col-12 md:col-12 xl:col-12 mb-5">
                        <InputValidation
                            ClassValidations="default"
                            message="form Company Name tidak boleh kosong"
                            label={
                                <>
                                    Tanggal Dibuat <span className="text-red-500">*</span>
                                </>
                            }
                            type="date"
                            id="create_date"
                            name="create_date"
                            value={getTgl ?? moment().format('YYYY-MM-DD')}
                            onChange={(e: any) => setTgl(e.target.value)}
                            // required={true}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Kota Asal <span className="text-red-500">*</span>
                        </label>
                        <div className="flex w-full">
                            <SelectAsyncCity
                                className="w-full"
                                handleInputChange={(e: any) => {
                                    console.log(e)

                                    setAsal(e)
                                }}
                                defaultInputValue={getAsal}
                            />
                            {getAsal && <div className="pl-2 pr-2 ml-1 rounded-lg bg-red-800 flex justify-center items-center text-white">{getAsal?.attr?.tlc ?? ''}</div>}
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Kota Tujuan <span className="text-red-500">*</span>
                        </label>
                        <div className="flex w-full">
                            <SelectAsyncCity
                                className="w-full"
                                handleInputChange={(e: any) => {
                                    setTujuan(e)
                                }}
                                defaultInputValue={getTujuan}
                            />
                            {getTujuan && <div className="pl-2 pr-2 ml-1 rounded-lg bg-red-800 flex justify-center items-center text-white">{getTujuan?.attr?.tlc ?? ''}</div>}
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Jenis Moda <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="jenis_moda"
                                name="jenis_moda"
                                value={getJenismoda?.id}
                                onChange={(e) => {
                                    const dataResults = getDataById(e.target.value, mmoda)
                                    setJenisModa(dataResults)
                                }}
                            >
                                <option selected>pilih moda</option>
                                {mmoda &&
                                    mmoda?.map((x: any, i: number) => (
                                        <option key={i} value={`${x?.id ?? ''}`}>
                                            {x?.moda_name ?? ''}
                                        </option>
                                    ))}
                            </select>
                            {getJenismoda?.moda_code && <div className="pl-2 pr-2 ml-1 rounded-lg bg-red-800 flex justify-center items-center text-white">{getJenismoda?.moda_code}</div>}
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Tipe <span className="text-red-500">*</span>
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="tipes" name="tipes" value={getSelectType} onChange={(e: any) => setSelectType(e.target.value)}>
                            <option selected>pilih type</option>
                            {mtype &&
                                mtype?.map((x: any, i: number) => (
                                    <option key={i} value={`${x?.id ?? ''}`}>
                                        {x?.name_type ?? ''}
                                    </option>
                                ))}
                        </select>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Satuan Berat <span className="text-red-500">*</span>
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="contract_types_id" name="contract_types_id" value={getStuan_berat ?? ''} onChange={hndelChangeUnitWidget}>
                            <option selected>pilih satuan</option>
                            {muwidget &&
                                muwidget?.map((x: any, i: number) => (
                                    <option key={i} value={`${x?.id ?? ''}`}>
                                        {x?.weght_unit_name ?? ''}
                                    </option>
                                ))}
                        </select>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Layanan <span className="text-red-500">*</span>
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="contract_types_id" name="contract_types_id" value={getLayanan} onChange={(e: any) => setLayanan(e.target.value)}>
                            <option selected>pilih service</option>
                            {mservice &&
                                mservice?.map((x: any, i: number) => (
                                    <option key={i} value={`${x?.id ?? ''}`}>
                                        {x?.service_name ?? ''}
                                    </option>
                                ))}
                        </select>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Berat <span className="text-red-500">*</span>
                        </label>
                        <div className="flex justify-between items-center">
                            <div className="flex w-full">
                                <InputGroupValidation ClassValidations="default" message="form tidak boleh kosong" type="number" id="create_at" name="create_at" elGroups={units} value={getBeratH1 ?? ''} onChange={(e: any) => setBeratH1(e.target.value)} />
                            </div>
                            <span className="ml-1 mr-1">S/D</span>
                            <div className="flex w-full">
                                <InputGroupValidation
                                    ClassValidations="default"
                                    message="form tidak boleh kosong"
                                    type="number"
                                    id="create_at"
                                    name="create_at"
                                    elGroups={units}
                                    value={getBeratSdH1 ?? ''}
                                    onChange={(e: any) => setBeratSdH1(e.target.value)}
                                    //  required={true}
                                />
                            </div>
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Minimal Berat <span className="text-red-500">*</span>
                        </label>
                        <InputGroupValidation
                            ClassValidations="default"
                            message="form tidak boleh kosong"
                            type="number"
                            id="create_at"
                            name="create_at"
                            elGroups={units}
                            value={getMinBeratH1 ?? ''}
                            onChange={(e: any) => setMinBeratH1(e.target.value)}
                            // required={true}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Harga Pertama <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val: string) => {
                                setHargaH1(val)
                            }}
                            values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }
                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5"></div>

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Berat <span className="text-red-500">*</span>
                        </label>
                        <div className="flex justify-between items-center">
                            <div className="flex w-full">
                                <InputGroupValidation ClassValidations="default" message="form tidak boleh kosong" type="number" id="create_at" name="create_at" elGroups={units} value={getBeratH2 ?? ''} onChange={(e: any) => setBeratH2(e.target.value)} />
                            </div>
                            <span className="ml-1 mr-1">S/D</span>
                            <div className="flex w-full">
                                <InputGroupValidation ClassValidations="default" message="form tidak boleh kosong" type="number" id="create_at" name="create_at" value={getBeratSdH2 ?? ''} onChange={(e: any) => setBeratSdH2(e.target.value)} />
                            </div>
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Minimal Berat <span className="text-red-500">*</span>
                        </label>
                        <InputGroupValidation ClassValidations="default" message="form tidak boleh kosong" type="number" id="create_at" name="create_at" elGroups={units} value={getMinBeratH2 ?? ''} onChange={(e: any) => setMinBeratH2(e.target.value)} />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Harga Kedua <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val: string) => {
                                setHargaH2(val)
                            }}
                            values={!isEmpty(landState?.priece_two ?? '') ? landState.priece_two : getHargaH2}
                        />
                    </div>
                }

                <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5"></div>

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Minimal Charge (Kg) <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val: string) => {
                                setMinimumCharge(val)
                            }}
                            values={!isEmpty(landState?.min_charge ?? '') ? landState.min_charge : getMinimumCharge}
                        />
                    </div>
                }

                <div className="col-12 flex justify-end sm:col-12 md:col-12 xl:col-12 mb-2">
                    <ButtonLoading type="submit" className="bg-gray-500 w-[10rem] flex justify-center items-center" label={`Upload`} onClick={() => {}} />
                </div>
            </div>
        </form>
    )
}
