

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from "@/lib/pg";
import { v4 as uuid } from 'uuid'


// Remove this
export async function GET(Request) {

    try {

        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        if (session.role === 'ROLE_EMPLOYEE') {

            // Database access
            const { rows } = await pool.query('SELECT * FROM "user" as u JOIN counselling_request cr on u.id = cr.employee_id LEFT JOIN counselling_session cs on cr.id = cs.counselling_request_id;', [session.uid]);


            

            if (rows.length === 0) {
                return new Response(JSON.stringify({
                    message: "Your counselling request has not been accepted"
                }), { status: 200 })
            }

            if (rows.psychologist_id === null) {
                const chatRoomId = uuid()
                await pool.query("UPDATE counselling_session SET chat_room_id = $1 WHERE employee_id = $2", [chatRoomId, session.uid])

                return new Response(JSON.stringify({
                    chatRoomId: chatRoomId,
                    title: rows[0].title,
                }))
            }

            return new Response(JSON.stringify({
                chatRoomId: rows[0].chat_room_id,
                title: rows[0].title,
            }))
        } else if (session.role === 'ROLE_PSYCHOLOGIST') {
            // Database access
            const { rows } = await pool.query("SELECT chat_room_id FROM counselling_request LEFT JOIN counselling_session cs on counselling_request.id = cs.counselling_request_id WHERE psychologist_id = $1;", [session.uid]);

            return new Response(JSON.stringify(rows))
        }
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}
