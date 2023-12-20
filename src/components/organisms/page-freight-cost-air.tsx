/** @format */

import { usePatch, usePost } from '@/utils/_hooks/useFetch'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import ButtonLoading from '@/components/atoms/ButtonLoading'
import InputCurency, { decodeRupiah } from '@/components/molecules/InputRupiah'
import InputValidation from '@/components/molecules/InputValidation'
import SelectAsyncCity from '@/components/molecules/SelectAsyncCity'
import { api } from '@/utils/_function/utils'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function PageFreightCostAir(props: any) {
    const { FaSearchreightTypeId, ContractPriceId, tipes, hendelTrigger, methods } = props
    const [getCreateAt, setCreateAt] = useState<any>(moment().format('YYYY-MM-DD'))
    const [getAsal, setAsal] = useState<any>()
    const [getTujuan, setTujuan] = useState<any>()
    const [getStuan_berat, setSatuanBerat] = useState<any>()
    const [units, setUnits] = useState<String>('')
    const [getAirline, setAirline] = useState<any>()
    const [getAirlineAlias, setAirlineAlias] = useState<any>()
    const [getSelectType, setSelectType] = useState<any>()
    const [getCapacity, setCapacity] = useState<any>('')
    const [getWeight, setWeight] = useState<any>('')
    const [getMinimumBerat, setMinimumBerat] = useState<any>('')
    const [getTarifSMU, setTarifSMU] = useState<any>('')
    const [getPpn, setPpn] = useState<any>('')
    const [getHandlingFee, setHandlingFee] = useState<any>('')
    const [getBiayaAdmin, setBiayaAdmin] = useState<any>('')
    const [getSurchargeAC, setSurchargeAC] = useState<any>('')
    const [getServiceFee, setServiceFee] = useState<any>('')
    const [getSewaGudang, setSewaGudang] = useState<any>('')
    const [getOtherCharge, setOtherCharge] = useState<any>('')
    const [getRegulatedAgent, setRegulatedAgent] = useState<any>('')
    const [getCargoCash, setCargoCash] = useState<any>('')
    const [getBasicStore, setBasicStore] = useState<any>('')
    const [getTotal, setTotal] = useState<any>('')
    const [getTarifSMUPlus, setTarifSMUPlus] = useState<any>('')
    const [getPpnPlus, setPpnPlus] = useState<any>('')
    const [getTotalPlus, setTotalPlus] = useState<any>('')
    const [getLeadTime, setLeadTime] = useState<any>('')
    const [getMetodePembayaran, setMetodePembayaran] = useState<Number | any>('')
    const [getPaymentPeriod, setPaymentPeriod] = useState<any>('')
    /**
     * </String>
     */
    const apiPost = usePost(`${api}/freight/air`)
    const apipatch = usePatch(`${api}/freight/air`)

    const { mmoda, mtype, muwidget, mairline, mpaytype, mservice, loading, error } = useMasterData(['mmoda', 'mtype', 'muwidget', 'mservice', 'mairline', 'mpaytype'])

    const hndelChangeUnitWidget = (event: any) => {
        const selectedValue = event.target.value
        setSatuanBerat(event.target.value)
        const selectedObject = muwidget.find((x: any) => x.id === parseInt(selectedValue))
        if (selectedObject) {
            setUnits(selectedObject.alias)
        }
    }

    const hndelChangeAIrline = (event: any) => {
        const selectedValue = event.target.value
        const selectedOption = event.target.options[event.target.selectedIndex]
        const dataAsValue = selectedOption.dataset.as
        setAirline(selectedValue)
        setAirlineAlias(dataAsValue)
    }

    const handleInputChangeMoneyInput = (field: string, val: string) => {
        switch (field) {
            case 'tarifSmu':
                setTarifSMU(val)
                break
            case 'ppn':
                setPpn(val)
                break
            case 'handlingFee':
                setHandlingFee(val)
                break
            case 'biayaAdmin':
                setBiayaAdmin(val)
                break
            case 'surchargeAC':
                setSurchargeAC(val)
                break
            case 'serviceFee':
                setServiceFee(val)
                break
            case 'sewaGudang':
                setSewaGudang(val)
                break
            case 'otherCharge':
                setOtherCharge(val)
                break
            case 'regulatedAgent':
                setRegulatedAgent(val)
                break
            case 'cargoCash':
                setCargoCash(val)
                break
            case 'basicStore':
                setBasicStore(val)
                break
            case 'total':
                setTotal(val)
                break
            case 'tarifSMUPlus':
                setTarifSMUPlus(val)
                break
            case 'ppnPlus':
                setPpnPlus(val)
                break
            case 'totalPlus':
                setTotalPlus(val)
                break
            default:
                break
        }
    }

    const hndelCollectData = (e: React.FormEvent) => {
        e.preventDefault()
        const dataControl: IFreightCoseUdara = {
            freight_type_id: parseInt(FaSearchreightTypeId) ?? 0,
            contract_price_id: parseInt(ContractPriceId) ?? 0,
            create_date: getCreateAt,
            origin_id: getAsal?.value ?? '',
            destination_id: getTujuan?.value ?? '',
            units_weight_id: getStuan_berat,
            airline_id: getAirline,
            type_id: getSelectType,
            capacity: getCapacity,
            weight: getWeight,
            minimum_weight: getMinimumBerat,
            tarif_smu: decodeRupiah(getTarifSMU ?? '0'),
            ppn: decodeRupiah(getPpn ?? '0'),
            handling_fee: decodeRupiah(getHandlingFee ?? '0'),
            biaya_admin: decodeRupiah(getBiayaAdmin ?? '0'),
            surcharge_ac: decodeRupiah(getSurchargeAC ?? '0'),
            service_fee: decodeRupiah(getServiceFee ?? '0'),
            sewa_gedung: decodeRupiah(getSewaGudang ?? '0'),
            other_cfc: decodeRupiah(getOtherCharge ?? '0'),
            regulated_agent: decodeRupiah(getRegulatedAgent ?? '0'),
            cargo_cash_msc: decodeRupiah(getCargoCash ?? '0'),
            basio_storage_zbc: decodeRupiah(getBasicStore ?? '0'),
            total: decodeRupiah(getTotal ?? '0'),
            tarif_smu_plus: decodeRupiah(getTarifSMUPlus ?? '0'),
            ppn_plus: decodeRupiah(getPpnPlus ?? '0'),
            total_plus: decodeRupiah(getTotalPlus ?? '0'),
            lead_time: decodeRupiah(getLeadTime ?? '0'),
            paytype_id: getMetodePembayaran,
            payment_period: getPaymentPeriod,
        }

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

    return (
        <form className="w-full" onSubmit={hndelCollectData}>
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
                            id="create_at"
                            name="create_at"
                            value={getCreateAt ?? ''}
                            onChange={(val: String) => setCreateAt(val)}
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
                            Airline <span className="text-red-500">*</span>
                        </label>
                        <div className="flex w-full">
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="contract_types_id" name="contract_types_id" value={getAirline ?? ''} onChange={hndelChangeAIrline}>
                                <option selected>pilih satuan</option>
                                {mairline &&
                                    mairline?.map((x: any, i: number) => (
                                        <option key={i} data-as={`${x?.alias ?? ''}`} value={`${x?.id ?? ''}`}>
                                            {x?.airline_name ?? ''}
                                        </option>
                                    ))}
                            </select>
                            {getAirlineAlias && <div className="pl-2 pr-2 ml-1 rounded-lg bg-red-800 flex justify-center items-center text-white">{getAirlineAlias ?? ''}</div>}
                        </div>
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
                                className=" ml-2"
                                style={{
                                    width: '50%',
                                }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Kapasitas <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input type="text" id="capasity" name="capasity" value={getCapacity ?? ''} onChange={(e) => setCapacity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Capacity" />
                                    {units && <div className="pl-2 pr-2 ml-1 rounded-lg bg-gray-500 flex justify-center items-center text-white">{units ?? ''}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <div className="flex w-full justify-between items-center">
                            <div
                                style={{
                                    width: '70%',
                                }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Berat {`(${units})`} <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input type="number" id="berat" name="berat" value={getWeight ?? ''} onChange={(e) => setWeight(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="berat" />
                                    {units && <div className="pl-2 pr-2 ml-1 rounded-lg bg-gray-500 flex justify-center items-center text-white">{units ?? ''}</div>}
                                </div>
                            </div>

                            <div
                                className="ml-2"
                                style={{
                                    width: '60%',
                                }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Minimum Berat <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input type="number" id="minimum_berat" name="minimum_berat" value={getMinimumBerat ?? ''} onChange={(e) => setMinimumBerat(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="kode pos" />
                                    {units && <div className="pl-2 pr-2 ml-1 rounded-lg bg-gray-500 flex justify-center items-center text-white">{units ?? ''}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Tarif SMU <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('tarifSmu', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            PPN <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('ppn', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Handling Fee <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('handlingFee', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Biaya Admin <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('biayaAdmin', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Surcharge/AC <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('surchargeAC', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Service Fee <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('serviceFee', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Sewa Gudang <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('sewaGudang', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Other Charge / Fuel Charge <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('otherCharge', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Regulated Agent <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('regulatedAgent', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Cargo Cash /MSC <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('cargoCash', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Basic Store / ZBC <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('basicStore', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Total <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('total', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Tarif SMU + <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('tarifSMUPlus', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            PPN + <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('ppnPlus', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Total + <span className="text-red-500">*</span>
                        </label>
                        <InputCurency
                            getValues={(val) => handleInputChangeMoneyInput('totalPlus', val)}
                            // values={!isEmpty(landState?.priece_one ?? '') ? landState.priece_one : getHargaH1}
                        />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Lead Time<span className="text-red-500">*</span>
                        </label>
                        <input type="number" id="Lead Time" name="Lead Time" value={getLeadTime ?? ''} onChange={(e) => setLeadTime(e.target.value ?? '')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="kode pos" />
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Metode Pembayaran<span className="text-red-500">*</span>
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="contract_types_id" name="contract_types_id" value={getMetodePembayaran ?? ''} onChange={(e) => setMetodePembayaran(e.target.value)}>
                            <option selected>pilih satuan</option>
                            {mpaytype &&
                                mpaytype?.map((x: any, i: number) => (
                                    <option key={i} value={`${x?.id ?? ''}`}>
                                        {x?.payment_type_name ?? ''}
                                    </option>
                                ))}
                        </select>
                    </div>
                }

                {
                    <div className="col-12 sm:col-12 md:col-6 xl:col-6 mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Periode Pembayaran<span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <input type="number" id="payment_period" name="payment_period" value={getPaymentPeriod ?? ''} onChange={(e) => setPaymentPeriod(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="kode pos" />
                            <div className="w-[100px] flex justify-center items-center">
                                <label htmlFor="">Hari</label>
                            </div>
                        </div>
                    </div>
                }

                <div className="col-12 flex justify-end sm:col-12 md:col-12 xl:col-12 mb-2">
                    <ButtonLoading className="bg-astronaut-900 w-[10rem] flex justify-center items-center" label={`Upload`} type="submit" onClick={(loadings) => {}} />
                </div>
            </div>
        </form>
    )
}
