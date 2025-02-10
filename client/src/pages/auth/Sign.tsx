"use client"

import { useState } from "react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useNavigate } from "react-router-dom"



export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()

    const handleSubmit = () => {
        setIsLoading(true)
        localStorage.setItem('email', email)
        navigator('/share')

    }

    return (
        <div className="space-y-6 max-w-96 mx-auto flex flex-col  items-center justify-end py-36">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your email below to receive a sign-in link</p>
            </div>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                <Input placeholder="you@example.com" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send magic link"}
                </Button>
            </form>
        </div>
    )
}

