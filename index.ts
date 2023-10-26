import puppeteer, { PDFMargin } from "puppeteer";
import { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { renderToString } from "react-dom/server";
import fs from "fs"
import path from "path"

let defaultMargin: PDFMargin = {
  top: "100px",
  bottom: "200px",
  right: "30px",
  left: "30px",
};

export interface GeneratePdfInterface {
  footer?: string;
  header?: string;
  margin?: PDFMargin;
  content: ReactElement<any, string | JSXElementConstructor<any>>,
  cssFilePath?: string;
  cssAsString?: string;
  destination?: string

}


export const setDefaultMargin = (margin: PDFMargin) => {
    defaultMargin = margin
}

function mergeCssWithContent(data: GeneratePdfInterface) {
    let css = data.cssAsString
    if (data.cssFilePath) {
        const filePath = data.cssFilePath;
        css = fs.readFileSync(filePath, "utf8");
    }


    return `<style>${css}</style>` + renderToString(data.content);
}
  

const generatePdf = async (data: GeneratePdfInterface) => {
  const {
    footer,
    header,
    margin = defaultMargin,
    content
  } = data;

  const stringifiedContent = mergeCssWithContent(data)

  const browser = await puppeteer.launch();
  const tab = await browser.newPage();

  await tab.setContent(stringifiedContent, { waitUntil: 'networkidle2' });
  let destination: undefined | string
  if (data.destination) {
    destination = data.destination
    
  }
  try {
    const fileBuffer = await tab.pdf({
      path: destination,
      displayHeaderFooter: !!footer || !!header ,
      footerTemplate: footer,
      format: "A4",
      headerTemplate: header,
      printBackground: true,
      margin,
    });
    await browser.close();
    return fileBuffer
    
  } catch (err) {
    console.error(err)
  }

  await browser.close();
  
  
};

export default generatePdf
