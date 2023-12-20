/** @format */
'use client'

import ButtonLoading from '@/components/atoms/ButtonLoading'
import CardBox from '@/components/atoms/CardBox'
import SearchForm from '@/components/atoms/SearchForm'
import Layout from '@/components/layouts/Layout'
import Tables from '@/components/molecules/DataTables'
import { api, toastConfigTR1000 } from '@/utils/_function/utils'
import { usePatch, usePost } from '@/utils/_hooks/useFetch'
import { useMasterData } from '@/utils/_hooks/useMasterData'
import { Modal } from 'flowbite-react'
import moment from 'moment'
import React, { useState } from 'react'
import LoadingButton from 'react-bootstrap-button-loader'
import { FaSyncAlt } from 'react-icons/fa'
import { IoSyncCircleSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CardInfo from '../components/CardInfoDetails'
import { ColumnsFreight } from './Colom'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Box } from '@mui/system'

const SeaFreight: React.FC = () => {
    const [openModalGenerate, setOpenModalGenerate] = useState<Boolean | any>('')
    const [loadingGenerate, setLoadingGenerate] = useState<Boolean | any>(false)
    const dispatch = useDispatch()
    const { global } = useSelector((state: any) => state?.global ?? '')
    const [tbRefresh, setTbRefresh] = useState<Boolean>(false)
    const [typeAct, setTypeAct] = useState<String | number>(1)

    const [getCreatedAt, setCreatedAt] = useState<any>(moment().format('YYYY-MM-DD'))
    const [getPublishdAt, setPublishAt] = useState<any>(moment().format('YYYY-MM-DD'))
    const [geTypesId, setTypesId] = useState<any>()
    const [isDetail, setIsDetail] = useState<any>({})

    const [category, setCategory] = useState<any>(1)

    const { mtype, loading, error } = useMasterData(['mtype'])

    const storePost = usePost(`${api}/generate`)
    const updateFreight = usePatch(`${api}/generate`)

    const hndelGenerates = () => {
        storePost.postData({
            formData: {
                freight_type: 'sea',
                publish_at: getCreatedAt,
                created_at: getPublishdAt,
                types_id: geTypesId,
            },
            responses: (response) => {
                setTbRefresh(!tbRefresh)
                setLoadingGenerate(false)
                setOpenModalGenerate(!openModalGenerate)
                dispatch({
                    type: 'SET_STATE',
                    payload: {
                        loading: false,
                    },
                })
            },
        })
    }

    const colomDock = ColumnsFreight({
        hndelUpdate: (RowSelected: any) => {},
        hndelChangeStatus: (evn: any, row: any) => {
            updateFreight.patchData({
                data: {
                    status_id: evn.target.value,
                },
                id: row.id,
                responses: (ev) => {
                    setTbRefresh(!tbRefresh)
                    toast.success(`status berhasil di update ${evn.target.value}`, toastConfigTR1000)
                },
                onError: (error: any) => {
                    setTbRefresh(!tbRefresh)
                    toast.error(`status gagal di update ${evn.target.value}`, toastConfigTR1000)
                },
            })
        },
    })
    const onClickTable = (row: any) => {
        setIsDetail(row)
        dispatch({
            type: 'SET_STATE',
            payload: {
                isDetailState: row,
            },
        })
    }
    return (
        <Layout isAuth={true} header="Biaya Sea Freight">
            <div className="mt-20 pt-10">
                <div className="row row-cols-3">
                    <div className="col-12 sm:col-12 md:col-12 xl:col-9">
                        <CardBox classname="w-100">
                            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '& > *': {
                                            m: 1,
                                        },
                                    }}
                                >
                                    <ButtonGroup aria-label="outlined primary button group">
                                        <Button
                                            onClick={() => {
                                                setCategory(1)
                                                setTypeAct(1)
                                                setTbRefresh(!tbRefresh)
                                            }}
                                            style={category == 1 ? { background: 'blue', color: 'white' } : {}}
                                        >
                                            Biaya Sea Freight
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setCategory(2)
                                                setTypeAct(2)
                                                setTbRefresh(!tbRefresh)
                                            }}
                                            style={category == 2 ? { background: 'blue', color: 'white' } : {}}
                                        >
                                            by CBM
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                                <div className="flex">
                                    <SearchForm />
                                </div>
                            </div>

                            <Tables auth={true} refresh={tbRefresh} url={`${api}/generate/sea`} query={`&types=${typeAct}`} onRowClick={onClickTable} columns={colomDock} />
                        </CardBox>
                    </div>
                    <div className="col-12 sm:col-12 md:col-12 xl:col-3">
                        <CardInfo titleColor="xl:text-gray-100" isDetail={isDetail} />
                        <ButtonLoading
                            className="mt-2 p-3 rounded-lg text bg-green-500 w-full flex justify-center items-center"
                            label={
                                <span className="w-full flex content-center items-center">
                                    <div className="py-1 px-1 rounded-full bg-gray-100">
                                        <IoSyncCircleSharp size="40" />
                                    </div>
                                    <div className="w-full h-full flex flex-col text-gray-100 ">
                                        <label htmlFor="">Generate Freight Cost</label>
                                        <small>
                                            <i>(tekan tombol ini)</i>
                                        </small>
                                    </div>
                                </span>
                            }
                            classes="ok"
                            onClick={(loadings) => {
                                setOpenModalGenerate(!openModalGenerate)
                            }}
                        />
                    </div>
                </div>
            </div>
            <Modal show={openModalGenerate} size={`md`} onClose={() => (loadingGenerate ? {} : setOpenModalGenerate(!openModalGenerate))}>
                <Modal.Header>
                    <span className="w-full flex content-center items-center">
                        <div className="py-1 px-1 rounded-full bg-gray-100">
                            <IoSyncCircleSharp size="40" />
                        </div>
                        <div className="w-full h-full flex flex-col ">
                            <label htmlFor="" className="w-full">
                                Generate Freight Cost
                            </label>
                            <small>UDARA</small>
                        </div>
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="pr-2"
                        style={{
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        <div className="flex justify-between items-center mb-5">
                            <label htmlFor="" className="flex">
                                Tanggal Buat
                            </label>
                            <input type="date" className="bg-gray-50 border w-[60%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setCreatedAt(e.target.value)} value={getCreatedAt} />
                        </div>
                        <div className="flex justify-between items-center mb-5">
                            <label htmlFor="" className="flex">
                                Tanggal Publis
                            </label>
                            <input type="date" className="bg-gray-50 border w-[60%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setPublishAt(e.target.value)} value={getPublishdAt} />
                        </div>
                        <div className="flex justify-between items-center mb-5">
                            <label htmlFor="" className="flex">
                                Tipe Transport
                            </label>
                            <select
                                onChange={(e) => {
                                    setTypesId(e.target.value ?? '')
                                }}
                                className="bg-gray-50 border w-[60%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Pilih Tipe</option>
                                {mtype &&
                                    mtype?.map((x: any, i: number) => (
                                        <option key={i} value={x?.id ?? ''}>
                                            {x?.name_type ?? ''}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex justify-center items-center mb-5">
                            <small>Tekan tombol untuk proses generate freight cost</small>
                        </div>
                        <div className="flex justify-center items-center mb-5">
                            <button
                                type="button"
                                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                disabled={loadingGenerate}
                                onClick={() => {
                                    hndelGenerates()
                                    setLoadingGenerate(true)
                                    dispatch({
                                        type: 'SET_STATE',
                                        payload: {
                                            loading: !global?.loading,
                                        },
                                    })
                                }}
                            >
                                {global?.loading ? (
                                    <>
                                        <LoadingButton loading={true}>
                                            <b>Eksekusi</b>
                                        </LoadingButton>
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-3 w-5 h-5 flex justify-center items-center rounded-lg bg-white text-gray-700">
                                            <FaSyncAlt />
                                        </span>
                                        <b>Eksekusi</b>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="flex justify-center items-center mb-5">
                            <small>Tekan tombol untuk proses generate freight cost</small>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Layout>
    )
}
export default SeaFreight
