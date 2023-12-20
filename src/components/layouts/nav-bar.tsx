/** @format */

'use client'
import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Avatar, Button, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getSessionStorages, isEmpty } from '@/utils/_function/utils'

const Navbars: FC = function () {
    const dispatch = useDispatch()
    const { global } = useSelector((state: any) => state?.global ?? '')
    const trigger = () => {
        if (!isEmpty(getSessionStorages('sidebar-size')) && getSessionStorages('sidebar-size') == 'sm') {
            sessionStorage.setItem('sidebar-size', 'lg')
        } else {
            sessionStorage.setItem('sidebar-size', 'sm')
        }

        dispatch({
            type: 'SET_STATE',
            payload: {
                sidebarTrigger: !global?.sidebarTrigger ?? true,
            },
        })
    }
    return (
        <nav className="fixed top-0 z-50 w-full bg-astronaut-900 dark:border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="drawer-navigation" data-drawer-toggle="drawer-navigation" aria-controls="drawer-navigation" type="button" onClick={trigger} className="inline-flex items-center p-2 text-sm text-gray-200 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                            </svg>
                        </button>
                        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                            {/* <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8 mr-3"
                                alt="FlowBite Logo"
                            /> */}
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                <img src="/logo/pcp-logo.png" className="w-[150px]" alt="" />
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <DarkThemeToggle />
                        <div className="flex items-center ml-3">
                            <Dropdown inline arrowIcon={false} label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}>
                                <Dropdown.Header>
                                    <span className="block text-sm">Bonnie Green</span>
                                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbars
