

const q = [
    {
        id: 1,
        question: 'What is the capital of India?',
        options: [
            'New Delhi',
            'Mumbai',
            'Kolkata',
            'Chennai',
        ],
        answer: 'New Delhi',
    },
    {
        id: 2,
        question: 'What is the capital of USA?',
        options: [
            'New York',
            'Washington DC',
            'Los Angeles',
            'Chicago',
        ],
        answer: 'Washington DC',
    }
]

export async function GET(Request) {

    try {
        // Check if authenticated
        // Database access
        let quiz = [{}];

        q.forEach((qz) => {
            quiz.push({
                id: qz.id,
                question: qz.question,
                options: qz.options,
            })
        })

        return new Response(JSON.stringify(quiz), { status: 200 })
    }
    catch (err) {
        return new Response(err.message, { status: 500 })
    }
}