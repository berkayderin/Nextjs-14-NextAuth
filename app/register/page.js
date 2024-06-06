'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { register } from '../serverActions/userActions'
import { useState } from 'react'

export default function Register() {
	const [formData, setFormData] = useState({ username: '', email: '', password: '' })
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const handleInputChange = (event) => {
		const { id, value } = event.target
		setFormData((prevData) => ({ ...prevData, [id]: value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const error = await register(formData)
		if (error) {
			setErrorMessage(error)
		} else {
			setSuccessMessage('Hesabınız başarıyla oluşturuldu! Giriş yapmak için yönlendiriliyorsunuz.')
			setTimeout(() => {
				window.location.href = '/dashboard'
			}, 3000)
		}
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" type="text" required value={formData.username} onChange={handleInputChange} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" required value={formData.password} onChange={handleInputChange} />
						</div>
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
						{successMessage && <p className="text-green-500">{successMessage}</p>}
						<Button type="submit" className="w-full">
							Create an account
						</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{' '}
						<Link href="/login" className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
