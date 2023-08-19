
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from '@/lib/pg'

export async function POST(Request) {

    const session = await getServerSession(authOptions)
    const token = await getToken({ req: Request, authOptions: authOptions })

    try {
        // Check if authenticated
        // Database access

        console.log(session)
        console.log(token)

        return new Response("Ffdsaf", { status: 200 })
    }
    catch (err) {
        return new Response(err.message, { status: 500 })
    }
}