
export async function GET(Request) {

    const response = await fetch(
        "https://api-inference.huggingface.co/models/Modifly/Mental-Health-Classification",
        {
            headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
            method: "POST",
            body: JSON.stringify({ "inputs": "happy" }),
        }
    );
    const result = await response.json();
    console.log(result);

    return new Response("Bruh")
}