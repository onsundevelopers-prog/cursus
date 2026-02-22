import { NextRequest } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";

export async function POST(req: NextRequest) {
    try {
        const { text, title } = await req.json();

        if (!text) {
            return new Response("Text content is required", { status: 400 });
        }

        // Extremely basic parsing: split by newlines into paragraphs
        const lines = text.split('\n');

        const paragraphs = lines.map((line: string) =>
            new Paragraph({
                children: [new TextRun(line)],
                spacing: { after: 120 }
            })
        );

        const doc = new Document({
            sections: [{
                properties: {},
                children: paragraphs
            }]
        });

        const buffer = await Packer.toBuffer(doc);

        return new Response(new Uint8Array(buffer), {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="${title || 'Export'}.docx"`,
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        });
    } catch (error) {
        console.error("Export error:", error);
        return new Response("Failed to generate document", { status: 500 });
    }
}
