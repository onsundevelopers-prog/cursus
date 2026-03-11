import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const zip = new JSZip();
        const extensionPath = path.join(process.cwd(), 'extension');
        
        function addFilesToZip(currentPath: string, zipFolder: JSZip) {
            const files = fs.readdirSync(currentPath);
            for (const file of files) {
                const filePath = path.join(currentPath, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    const nextFolder = zipFolder.folder(file);
                    if (nextFolder) {
                        addFilesToZip(filePath, nextFolder);
                    }
                } else {
                    const fileContent = fs.readFileSync(filePath);
                    zipFolder.file(file, fileContent);
                }
            }
        }

        addFilesToZip(extensionPath, zip);

        const content = await zip.generateAsync({ type: 'nodebuffer' });

        return new NextResponse(content, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename=cursus-ai-extension.zip',
            },
        });
    } catch (error) {
        console.error('Error generating ZIP:', error);
        return NextResponse.json({ error: 'Failed to generate extension ZIP' }, { status: 500 });
    }
}
