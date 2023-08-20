

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from "@/lib/pg";
import { v4 as uuid } from 'uuid'

export async function GET(Request) {

    // Database access
    const { rows } = await pool.query('SELECT * FROM "user" as u JOIN counselling_request cr on u.id = cr.employee_id LEFT JOIN counselling_session cs on cr.id = cs.counselling_request_id;');

    return new Response(JSON.stringify(rows))
}


export async function POST(Request) {

    try {

        // Check if authenticated
        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })


        // Required stuff
        const { counsellingRequestId } = await Request.json()

        // Database layer
        console.log("Bro accepted " + counsellingRequestId)

        const chatRoomId = uuid()

        await pool.query(
            "INSERT INTO counselling_session(counselling_request_id, psychologist_id, chat_room_id) VALUES ($1, $2, $3)", [counsellingRequestId, session.uid, chatRoomId])

        const { rows } = await pool.query('SELECT * FROM "user" as u JOIN counselling_request cr on u.id = cr.employee_id LEFT JOIN counselling_session cs on cr.id = cs.counselling_request_id;');


        return new Response(JSON.stringify(rows))
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}