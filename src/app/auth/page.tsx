'use client'
import fetchApi from '@/utils/_function/api'
import { Button, Spinner } from 'flowbite-react'
import $ from 'jquery'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Auth() {
    const [loading, setLoading] = useState()
    const [classInput, setInputClass] = useState('bg-gray-50 border border-gray-300')
    const clsInputError = 'bg-red-50 border border-red-500'
    const clsInputPrimary = 'bg-gray-50 border border-gray-300'
    const clsInputSuccess = `bg-green-50 border border-green-500`
    const router = useRouter()

    const hndelLogin = () => {
        const items = {
            user: $("[name='email']").val(),
            password: $("[name='password']").val(),
        }
        const postData: any = items
        fetchApi(`${process.env.BACKEND_URL_PREFIX}/auth/login`, 'POST', postData)
            .then((data) => {
                setInputClass(clsInputSuccess)
                localStorage.setItem('authToken', data?.token?.token)
                localStorage.setItem('user-session', data?.token?.token)
                router.push('/dashboard')
            })
            .catch((error) => {
                setInputClass(clsInputError)
            })
    }
    const hndelChngeInput = () => {
        if (classInput != clsInputPrimary) {
            setInputClass(clsInputPrimary)
        }
    }

    return (
        <div>
            <div className="jumbotrons z-0 lg:pl-64 p-4 absolute h-[200px] dark:bg-opacity-40 bg-astronaut-950 w-full text-white">
                <div className="flex w-full h-full justify-between pl-3 items-center"></div>
            </div>
            <div className="p-4 relative z-10">
                <div className="mt-20 pt-10 sm:pl-1 sm:pr-1 md:pl-10 md:pr-10 xl:pl-[200px] xl:pr-[200px]">
                    <section className="bg-gray-50 dark:bg-gray-900 rounded-md shadow-md bg-opacity-10 backdrop-blur-lg bg-cover bg-center bg-fixed">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                            <div className="flex flex-col justify-center">
                                <img src="https://dashfin.pcpexpress.com/images/1_Logo_PCP_Express.png" className="w-[150px]" alt="" />
                                <h1 className="mb-4 mt-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                    <span style={{ fontSize: '.9em' }}> Geo</span> APPS
                                </h1>
                                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">..</p>
                                {/* <a
                                    href="#"
                                    className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
                                >
                                    Read more about our app
                                    <svg
                                        className="w-3.5 h-3.5 ml-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </a> */}
                            </div>
                            <div>
                                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to Geo APPS</h2>
                                    <div className="mt-8 space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Your email
                                            </label>
                                            <input onChange={hndelChngeInput} type="email" name="email" id="email" className={`${classInput} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Your password
                                            </label>
                                            <input onChange={hndelChngeInput} type="password" name="password" id="password" placeholder="••••••••" className={`${classInput} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">
                                                    Remember this device
                                                </label>
                                            </div>
                                            <a href="#" className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                                Lost Password?
                                            </a>
                                        </div>
                                        <Button onClick={hndelLogin}>
                                            {loading ? (
                                                <>
                                                    <Spinner aria-label="Spinner button example" />
                                                    <span className="pl-3">Loading...</span>
                                                </>
                                            ) : (
                                                <>Login</>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
