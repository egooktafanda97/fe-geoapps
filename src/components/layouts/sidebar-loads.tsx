'use client'
import React from 'react'

export default function SidebarLgLoads() {
    return (
        <div
            id="drawer-navigation"
            className="fixed top-0 bg-gray-100  left-0 z-40 md:w-20 sm:w-20 xs:w-64 lg:w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
            aria-labelledby="drawer-navigation-label"
        >
            <div className="h-full bg-gray-100 px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                <ul className="space-y-2 font-medium"></ul>
            </div>
        </div>
    )
}
