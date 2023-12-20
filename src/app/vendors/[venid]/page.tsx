/** @format */

import Layout from '@/components/layouts/Layout'
import React from 'react'

export default function Detail() {
    return (
        <Layout>
            <div className="p-4 sm:ml-20 dark:border-gray-700 ">
                <div>
                    <div className="fixed z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
                        <div className="w-[108rem] flex-none flex justify-end">
                            <picture>
                                <source type="image/avif" />
                                <img src="https://www.braydoncoyer.dev/_next/static/media/rays.426980b9.png" className="w-[71.75rem] flex-none max-w-none opacity-70" decoding="async" />
                            </picture>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
                    <h2>ok</h2>
                </div>
            </div>
        </Layout>
    )
}
