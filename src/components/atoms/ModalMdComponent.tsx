'use client'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'flowbite-react'

export default function DefaultModal({ modal = undefined }: { modal: string | undefined }) {
   const [openModal, setOpenModal] = useState<string | undefined>()
   const props = { openModal, setOpenModal }
   useEffect(() => {
      setOpenModal(modal)
   }, [modal])
   return (
      <>
         <Button onClick={() => props.setOpenModal('default')}>Toggle modal</Button>
         <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header>Upload Lampiran</Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
               <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
               <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                  Decline
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}
