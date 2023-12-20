'use client'
import React, { ReactNode, useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'

import { useDestory } from '@/utils/_hooks/useFetch'

interface DialogDestoryProps {
    children: ReactNode
    url: string
    id: number
    onSuccress?: (r: any) => void
    onError?: (r: any) => void
}

export default function DialogDestory({ children, url, id, onSuccress, onError }: DialogDestoryProps) {
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }

    const destoryAction = useDestory(`${url}`)
    const henlder = () => {
        destoryAction.deleteData({
            id: id,
            onSuccess: (res: any) => {
                toast.success('Data has been deleted')
                if (onSuccress) if (res) onSuccress(res)
            },
            onError: (res: any) => {
                toast.error('Something went wrong')
                if (onError) if (res) onError(res)
            },
        })
    }
    return (
        <>
            <div onClick={() => setOpenModal('pop-up')}>{children}</div>
            <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this data?</h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    props.setOpenModal(undefined)
                                    henlder()
                                }}
                            >
                                Yes
                            </Button>
                            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
