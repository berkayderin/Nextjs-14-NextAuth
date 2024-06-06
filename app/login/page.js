'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authenticate } from '../serverActions/userActions'
import { useState } from 'react'

export default function Login() {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const error = await authenticate(null, formData)
		if (error) {
			setErrorMessage(error)
		}
	}

	const handleInputChange = (event) => {
		const { id, value } = event.target
		setFormData((prevData) => ({ ...prevData, [id]: value }))
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<form onSubmit={handleSubmit} className="w-full max-w-sm">
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>Enter your email below to login to your account.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
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
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	)
}
