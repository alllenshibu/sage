import { pool } from '@/lib/pg'

export async function GET(Request, { params }) {

    try {
        // Check if authenticated

        // Database access
        const { rows } = await pool.query(`
        SELECT title, answer FROM user_quiz_answer JOIN "user" ON "user".id = user_quiz_answer.user_id JOIN quiz_question ON quiz_question.id = user_quiz_answer.quiz_question_id WHERE quiz_question_id = $1 AND user_id = $2`
            , [params.quizId, params.userId])

        if (rows.length === 0) return new Response('No answers found', { status: 200 })

        return new Response(JSON.stringify(rows), { status: 200 })
    }
    catch (err) {
        return new Response(err.message, { status: 500 })
    }
}
