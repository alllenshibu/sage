

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from "@/lib/pg";


// Remove this
export async function POST(Request) {

    try {

        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        console.log(Request.body)

        const title = await Request.body.title
        const description = await Request.body.description

        if (!title || title === '' || title === undefined) {
            return new Response(JSON.stringify({
                message: "Invalid title"
            }), { status: 400 })
        }

        if (!description || description === '' || description === undefined) {
            return new Response(JSON.stringify({
                message: "Invalid description"
            }), { status: 400 })
        }

        // Database access
        const data = await pool.query("INSERT INTO complaint (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [title, description, session.uid]);

        return new Response(JSON.stringify({
            message: "Complaint created successfully",
        }))
    } catch (err) {
        console.log(err)
        return new Response(err.message, { status: 500 })
    }
}