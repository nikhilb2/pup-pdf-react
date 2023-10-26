"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultMargin = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const server_1 = require("react-dom/server");
const fs_1 = __importDefault(require("fs"));
let defaultMargin = {
    top: "100px",
    bottom: "200px",
    right: "30px",
    left: "30px",
};
const setDefaultMargin = (margin) => {
    defaultMargin = margin;
};
exports.setDefaultMargin = setDefaultMargin;
function mergeCssWithContent(data) {
    let css = data.cssAsString;
    if (data.cssFilePath) {
        const filePath = data.cssFilePath;
        css = fs_1.default.readFileSync(filePath, "utf8");
    }
    return `<style>${css}</style>` + (0, server_1.renderToString)(data.content);
}
const generatePdf = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { footer, header, margin = defaultMargin, content } = data;
    const stringifiedContent = mergeCssWithContent(data);
    const browser = yield puppeteer_1.default.launch();
    const tab = yield browser.newPage();
    yield tab.setContent(stringifiedContent, { waitUntil: 'networkidle2' });
    let destination;
    if (data.destination) {
        destination = process.env.ROOT_DIR + data.destination;
    }
    try {
        const fileBuffer = yield tab.pdf({
            path: destination,
            displayHeaderFooter: !!footer || !!header,
            footerTemplate: footer,
            format: "A4",
            headerTemplate: header,
            printBackground: true,
            margin,
        });
        yield browser.close();
        return fileBuffer;
    }
    catch (err) {
        console.error(err);
    }
    yield browser.close();
});
exports.default = generatePdf;
