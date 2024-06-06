import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import User from './models/user.js'
import { authConfig } from './auth.config.js'
import bcrypt from 'bcrypt'
import connect from './utils/db.js'

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				console.log('bu bir konsol logudur', credentials)
				try {
					await connect()

					// kullanıcıyı veritabanında var mı
					const user = await User.findOne({ email: credentials.email })
					if (!user) {
						return null
					}

					// şifre doğru mu
					const isCorrect = await bcrypt.compare(credentials.password, user.password)
					if (!isCorrect) {
						return null
					}

					return user
				} catch (error) {
					console.log('Hata:', error)
					return null
				}
			}
		})
	]
})
