
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

import { pool } from '@/lib/pg'

export async function POST(Request) {

    try {
        // Check if authenticated

        const session = await getServerSession(authOptions)
        const token = await getToken({ req: Request, authOptions: authOptions })

        // Required stuff

        const answers = await Request.json()

        // Database layer

        for (let answer of answers) {
            console.log(answer)
            await pool.query(`
                INSERT INTO user_quiz_answer (quiz_question_id, answer, user_id) VALUES ($1, $2, $3)`,
                [answer.id, answer.answer, session.uid])
        }

        return new Response("Successfully submitted quiz", { status: 200 })
    }
    catch (err) {
        return new Response(err.message, { status: 500 })
    }
}