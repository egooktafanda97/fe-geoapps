/** @format */

'use client'
import { Sidebar } from 'flowbite-react'
import React from 'react'
import { MdDashboardCustomize } from 'react-icons/md'
import { BsFolderFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

export default function SidebarMaster() {
    const router = useRouter()
    return (
        <Sidebar id="drawer-navigation" className="fixed top-0 bg-gray-50 left-0 z-40 md:w-20 sm:w-20 xs:w-64 lg:w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
            <Sidebar.ItemGroup className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                <h3 className="pl-2 dark:text-white">Menu</h3>
                <Sidebar.Item className="cursor-pointer bg-red-500" onClick={() => router.push('/master')} icon={MdDashboardCustomize}>
                    <p className="pointer">Dashboard</p>
                </Sidebar.Item>
                <Sidebar.Item className="cursor-pointer" onClick={() => router.push('/master/company')} icon={BsFolderFill}>
                    <p className="pointer">Company</p>
                </Sidebar.Item>
                <Sidebar.Item className="cursor-pointer" onClick={() => router.push('/master/mcity')} icon={BsFolderFill}>
                    <p className="pointer">City</p>
                </Sidebar.Item>
                <Sidebar.Item className="cursor-pointer" onClick={() => router.push('/master/agreement')} icon={BsFolderFill}>
                    <p className="pointer">Agreement</p>
                </Sidebar.Item>

                <Sidebar.Item className="cursor-pointer" onClick={() => router.push('/master/mrute')} icon={BsFolderFill}>
                    <p className="pointer">Rute</p>
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar>
    )
}
