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
        const { rows } = await pool.query(
            `SELECT * FROM "user" JOIN user_role as ur ON id=ur.user_id WHERE email = $1`,
            [email]
        );
        console.log(rows)

        if (rows.length > 0) {
            if (rows[0].ur.name === 'ROLE_EMPLOYEE') {

                return new Response(JSON.stringify({
                    message: "User already exists"
                }), { status: 400, })
            }
            await pool.query(
                `UPDATE user_role SET role_id = (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE') WHERE user_id = $1`,
                [rows[0].id])
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