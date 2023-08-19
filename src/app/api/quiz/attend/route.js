import { pool } from '@/lib/pg'

export async function GET(Request) {

    try {
        // Check if authenticated
        
        // Database access
        const { rows } = await pool.query(`SELECT * FROM quiz_question `)

        return new Response(JSON.stringify(rows), { status: 200 })
    }
    catch (err) {
        return new Response(err.message, { status: 500 })
    }
}

export async function POST(Request) {

    try {
        // Check if authenticated
        // Database access

        return new Response(JSON.stringify(rows), { status: 200 })
    }
    catch (err) {
        return new Response(err.message, { status: 500 })
    }
}