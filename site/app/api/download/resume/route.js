import resume from "../../../page/cv/resume.js";

export async function GET(request, response) {
    return new Response(JSON.stringify(resume), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "content-disposition": `attachment; filename=resume-juuso-korhonen.json`,
        },
    });
}