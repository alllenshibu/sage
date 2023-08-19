

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from "@/lib/pg";


export async function GET(Request) {

    try {
        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        // Database access
        const { rows } = await pool.query(`SELECT * FROM "user"`);


        return new Response(JSON.stringify(rows), {
            status: 200,
        })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}


export async function POST(Request) {

    try {
        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        const { email } = await Request.json()

        // Database access
        const { rows } = await pool.query(`SELECT * FROM "user" WHERE email = $1`, [email]);

        if (rows.length > 0) {
            return new Response(JSON.stringify({
                message: "User already exists"
            }), { status: 400, })
        }

        await pool.query(`INSERT INTO "user" (email) VALUES ($1)`, [email])
        await pool.query(`INSERT INTO "user_role" (user_id, role_id) VALUES ((SELECT id FROM "user" WHERE email = $1), (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE'))`, [email])

        return new Response(JSON.stringify({
            message: "User created successfully"
        }), {
            status: 200,
        })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}