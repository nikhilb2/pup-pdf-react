/// <reference types="node" />
import { PDFMargin, PaperFormat } from "puppeteer";
import { JSXElementConstructor, ReactElement } from 'react';
export interface GeneratePdfInterface {
    footer?: ReactElement<any, string | JSXElementConstructor<any>>;
    header?: ReactElement<any, string | JSXElementConstructor<any>>;
    margin?: PDFMargin;
    content: ReactElement<any, string | JSXElementConstructor<any>>;
    cssFilePath?: string;
    cssAsString?: string;
    destination?: string;
    paperFormat?: PaperFormat;
}
export declare const setDefaultMargin: (margin: PDFMargin) => void;
declare const generatePdf: (data: GeneratePdfInterface) => Promise<Buffer | undefined>;
export default generatePdf;
//# sourceMappingURL=index.d.ts.map