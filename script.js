async function generateDescription(){

let name = document.getElementById("productName").value
let features = document.getElementById("features").value
let benefits = document.getElementById("benefits").value
let keywords = document.getElementById("keywords").value

let prompt = `
Viết mô tả sản phẩm thương mại điện tử.

Tên sản phẩm: ${name}

Tính năng:
${features}

Lợi ích:
${benefits}

SEO keywords:
${keywords}

Yêu cầu:
- tiêu đề hấp dẫn
- bullet tính năng
- đoạn mô tả marketing
`

// gửi tới API AI
let response = await fetch("/api/generate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({prompt})
})

let data = await response.json()

document.getElementById("output").innerText = data.text
}

function copyText(){
let text = document.getElementById("output").innerText
navigator.clipboard.writeText(text)
alert("Đã copy")
}
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AIzaSyDzGX7OVg5iJqphhXeil-Q9x7EbcDXH0JA);

export default async function handler(req,res){

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const prompt = req.body.prompt;

const result = await model.generateContent(prompt);

res.status(200).json({
text: result.response.text()
});

}