'use server'

import { AuthError } from 'next-auth'
import User from '@/models/user'
import bcrypt from 'bcrypt'
import connect from '@/utils/db'
import { signIn } from '@/auth'

export async function authenticate(prevState, formData) {
	try {
		await signIn('credentials bilgi:', formData)
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Geçersiz kimlik bilgileri. Lütfen tekrar deneyin.'
				default:
					return 'Bir hata oluştu. Lütfen tekrar deneyin.'
			}
		}
		throw error
	}
}

export async function register(info) {
	try {
		await connect()
		const { username, email, password } = info

		// kullanıcı adı veya e-posta var mı
		const exist = await User.findOne({
			$or: [{ username }, { email }]
		})
		if (exist) {
			return 'Kullanıcı adı veya e-posta zaten kullanılıyor.'
		}

		// şifre hashleme
		const hashedPassword = await bcrypt.hash(password, 12)

		await User.create({
			username,
			email,
			password: hashedPassword
		})

		return
	} catch (error) {}
}
