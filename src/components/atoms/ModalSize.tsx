'use client'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Select } from 'flowbite-react'

export default function ModalSize({ children, size }: { children: React.ReactNode; size: string }) {
   const [openModal, setOpenModal] = useState<string | undefined>()
   const [modalSize, setModalSize] = useState<string>('md')
   const props = { modalSize, openModal, setModalSize, setOpenModal }
   useEffect(() => {
      setModalSize(size)
   }, [size])
   return (
      <>
         {/* <div className="flex flex-wrap gap-4">
            <div className="w-40">
               <Select defaultValue="md" onChange={(event) => props.setModalSize(event.target.value)}>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                  <option value="2xl">2xl</option>
                  <option value="3xl">3xl</option>
                  <option value="4xl">4xl</option>
                  <option value="5xl">5xl</option>
                  <option value="6xl">6xl</option>
                  <option value="7xl">7xl</option>
               </Select>
            </div>
            <Button onClick={() => props.setOpenModal('size')}>Toggle modal</Button>
         </div> */}
         <Modal show={props.openModal === 'size'} size={props.modalSize} onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header>Small modal</Modal.Header>
            <Modal.Body>{children}</Modal.Body>
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
