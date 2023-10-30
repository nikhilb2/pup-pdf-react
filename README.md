
# pup-pdf-react

This library uses puppeteer and react to generate pdf.

**`Note: You need to install chromium browser`**


Just call function generatePdf(data)

data parameter can have following parameters

```
export interface GeneratePdfInterface {
  footer?: ReactElement<any, string | JSXElementConstructor<any>>;
  header?: ReactElement<any, string | JSXElementConstructor<any>>;
  margin?: PDFMargin;
  content: ReactElement<any, string | JSXElementConstructor<any>>,
  cssFilePath?: string;
  cssAsString?: string;
  destination?: string;
  paperFormat?: PaperFormat
}
```
```
type PaperFormats = "LETTER" | "LEGAL" | "TABLOID" | "LEDGER" | "A0" | "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "Letter" | "Legal" | "Tabloid" | "Ledger"
```

 ## Example
 ```
 import generatePdf from "pup-pdf-react"
 
 generatePdf({
     footer: <Footer />,
     header: <Header />,
     content: <Content />,
     cssFilePath: "./css/content.css",
     destination: "pdf/newPdf.pdf"
 })


