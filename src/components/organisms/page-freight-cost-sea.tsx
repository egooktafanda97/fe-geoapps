/** @format */

import { usePatch, usePost } from '@/utils/_hooks/useFetch'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import InputGroupValidation from '@/components/molecules/InputGroupValidation'
import InputCurency, { decodeRupiah } from '@/components/molecules/InputRupiah'
import InputValidation from '@/components/molecules/InputValidation'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'
import { api, getDataById } from '@/utils/_function/utils'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function PageFreightCostSea(props: any) {
    const { FaSearchreightTypeId, ContractPriceId, tipes, hendelTrigger, methods } = props
    /**
     * fetching
     */
    const { mmoda, mtype, muwidget, mservice, loading, error } = useMasterData(['mmoda', 'mtype', 'muwidget', 'moda', 'mservice', 'city', 'type'])

    const [getTgl, setTgl] = useState<any>(moment().format('YYYY-MM-DD'))
    const [getAsal, setAsal] = useState<any>()
    const [getTujuan, setTujuan] = useState<any>()
    const [getJenismoda, setJenisModa] = useState<any>()
    const [getSelectType, setSelectType] = useState<any>()
    const [getContainer, setContainer] = useState<String | any>()
    const [getLayanan, setLayanan] = useState<String | any>()
    const [getAtContainer, setAtContainer] = useState<any>()
    const [getStuffing, setStuffing] = useState<String | any>()
    const [getTrallingOrigin, setTrallingOrigin] = useState<string>('')
    const [getThc, setThc] = useState<string>('')
    const [getLolo, setLolo] = useState<string>('')
    const [getBillOfLading, setBillOfLading] = useState<string>('')
    const [getSegel, setSegel] = useState<string>('')
    const [getMaterai, setMaterai] = useState<string>('')
    const [getSurchargeFreight, setSurchargeFreight] = useState<string>('')
    const [getSurchargeAlihKapal, setSurchargeAlihKapal] = useState<string>('')
    const [getAsdp, setAsdp] = useState<string>('')
    const [getOtherHandFees, setOtherHandFees] = useState<string>('')
    const [getStorageAlihKapal, setStorageAlihKapal] = useState<string>('')
    const [getTrailerDestination, setTrailerDestination] = useState<string>('')
    const [getAmount, setAmount] = useState<string>('')
    const [getLeadtime, setLeadtime] = useState<string>('')
    const [getHpp, setHpp] = useState<string>('')

    /**
     * </String>
     */
    const apiPost = usePost(`${api}/freight/sea`)
    const apipatch = usePatch(`${api}/freight/sea`)

    /**
     * hndel entry curency
     */
    const handleInputChangeMoneyInput = (field: string, val: string) => {
        switch (field) {
            case 'tralling_origin':
                setTrallingOrigin(val)
                break
            case 'thc':
                setThc(val)
                break
            case 'lolo':
                setLolo(val)
                break
            case 'bill_ofladding':
                setBillOfLading(val)
                break
            case 'segel':
                setSegel(val)
                break
            case 'materai':
                setMaterai(val)
                break
            case 'surcharge_freight':
                setSurchargeFreight(val)
                break
            case 'surcharge_alih_kapal':
                setSurchargeAlihKapal(val)
                break
            case 'asdp':
                setAsdp(val)
                break
            case 'other_hand_fees':
                setOtherHandFees(val)
                break
            case 'storage_alih_kapal':
                setStorageAlihKapal(val)
                break
            case 'trailer_destination':
                setTrailerDestination(val)
                break
            case 'amount':
                setAmount(val)
                break
            case 'leadtime':
                setLeadtime(val)
                break
            case 'hpp':
                setHpp(val)
                break
            default:
                break
        }
    }

    const handlingRecord = (e: React.FormEvent) => {
        e.preventDefault()
        const dataCollect: IFreightCoselaut = {
            freight_type_id: parseInt(FaSearchreightTypeId) ?? 0,
            contract_price_id: parseInt(ContractPriceId) ?? 0,
            create_date: getTgl,
            origin_id: getAsal?.value ?? '',
            destination_id: getTujuan?.value ?? '',
            moda_id: getJenismoda?.id ?? getJenismoda,
            type_id: parseInt(getSelectType),
            // moda_type_id: parseInt(getSelectType),
            container: getContainer || null,
            service_id: getLayanan || null,
            atcontainer: getAtContainer || null,
            stuffing: getStuffing || null,
            tralling_origin: decodeRupiah(getTrallingOrigin) || null,
            thc: decodeRupiah(getThc) || null,
            lolo: decodeRupiah(getLolo) || null,
            bill_ofladding: decodeRupiah(getBillOfLading) || null,
            segel: decodeRupiah(getSegel) || null,
            materai: decodeRupiah(getMaterai) || null,
            surcharge_freight: decodeRupiah(getSurchargeFreight) || null,
            surcharge_alih_kapal: decodeRupiah(getSurchargeAlihKapal) || null,
            asdp: decodeRupiah(getAsdp) || null,
            other_hand_fees: decodeRupiah(getOtherHandFees) || null,
            storage_alih_kapal: decodeRupiah(getStorageAlihKapal) || null,
            trailer_destination: decodeRupiah(getTrailerDestination) || null,
            amount: decodeRupiah(getAmount) || null,
            leadtime: decodeRupiah(getLeadtime) || null,
            hpp: decodeRupiah(getHpp) || null,
        }

        apiPost.postData({
            formData: dataCollect,
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

    return (
        <form className="w-full" onSubmit={handlingRecord}>
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
                            required={true}
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
                        <div className="flex w-full justify-between items-center">
                            <div
                                style={{
                                    width: '80%',
                                }}
                            >
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

                            <div
                                className="ml-2"
                                style={{
                                    width: '50%',
                                }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Container <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input type="text" id="container" name="container" value={getContainer ?? ''} onChange={(e) => setContainer(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="container" />
                                    <div className="flex justify-center items-center ml-2 mr-2">ft</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Service <span className="text-red-500">*</span>
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
                            Tralling Origin <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('tralling_origin', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            @Container <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="atcontainer" name="atcontainer" value={getAtContainer ?? ''} onChange={(e) => setAtContainer(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="container" />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Stuffing <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="Stuffing" name="Stuffing" value={getStuffing ?? ''} onChange={(e) => setStuffing(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stuffing " />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            THC <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('thc', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Lolo <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('lolo', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Bill Of <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('bill_ofladding', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Segel <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('segel', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Materai <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('materai', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Surcharge Freight <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('surcharge_freight', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Surcharge Alih Kapal <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('surcharge_alih_kapal', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            ASDP <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('asdp', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Biaya Handling Lainnya <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('other_hand_fees', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Storage Alih Kapal <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('storage_alih_kapal', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Trailer Destination <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('trailer_destination', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Jumlah <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('amount', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Leadtime <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('leadtime', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            HPP <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('hpp', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                <div className="col-12 flex justify-end sm:col-12 md:col-12 xl:col-12 mb-2">
                    <ButtonLoading className="bg-gray-500 w-[10rem] flex justify-center items-center" label={`Upload`} onClick={(loadings) => {}} type="submit" />
                </div>
            </div>
        </form>
    )
}
