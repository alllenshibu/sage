

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from "@/lib/pg";


// Remove this
export async function GET(Request) {

    // Database access
    const { rows } = await pool.query("SELECT * FROM counselling_request");

    return new Response(JSON.stringify(rows))
}


export async function POST(Request) {

    try {

        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        // Required stuff

        const { subject } = await Request.json()

        // Database layer

        const { rows } = await pool.query("INSERT INTO counselling_request (subject, employee_id) VALUES ($1, $2) RETURNING id", [subject, session.uid]);


        return new Response(JSON.stringify({
            message: "Counselling request created successfully",
            counsellingRequestId: rows[0].id
        }))
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}