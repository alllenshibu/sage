

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from "@/lib/pg";


// Remove this
export async function GET(Request) {

    try {

        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })


        // Database access
        const { rows } = await pool.query("SELECT * FROM counselling_request LEFT JOIN counselling_session cs on counselling_request.id = cs.counselling_request_id;");

        return new Response(rows)
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}


export async function POST(Request) {

    try {

        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        // Required stuff

        const { subject } = await Request.json()

        // Database layer

        const prevRequest = await pool.query("SELECT * FROM counselling_request WHERE employee_id = $1", [session.uid]);
        if (prevRequest.rows.length > 0) {
            return new Response({
                message: "You already have a pending request"
            }, { status: 400 })
        }

        const { rows } = await pool.query("INSERT INTO counselling_request (subject, employee_id) VALUES ($1, $2) RETURNING id", [subject, session.uid]);


        return new Response(JSON.stringify({
            message: "Counselling request created successfully",
            counsellingRequestId: rows[0].id
        }))
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}