/// <reference types="node" />
import { PDFMargin } from "puppeteer";
import { JSXElementConstructor, ReactElement } from 'react';
export interface GeneratePdfInterface {
    footer?: string;
    header?: string;
    margin?: PDFMargin;
    content: ReactElement<any, string | JSXElementConstructor<any>>;
    cssFilePath?: string;
    cssAsString?: string;
    destination?: string;
}
export declare const setDefaultMargin: (margin: PDFMargin) => void;
declare const generatePdf: (data: GeneratePdfInterface) => Promise<Buffer | undefined>;
export default generatePdf;
//# sourceMappingURL=index.d.ts.map