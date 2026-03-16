export default async function handler(req, res) {

  const { name, features, benefits, keywords } = req.body;

  const prompt = `
  Viết mô tả sản phẩm ecommerce.

  Tên sản phẩm: ${name}
  Tính năng: ${features}
  Lợi ích: ${benefits}
  Từ khóa SEO: ${keywords}

  Yêu cầu:
  - Viết đoạn mô tả hấp dẫn
  - Có bullet tính năng
  - Có đoạn lợi ích
  - Tối ưu SEO
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();

  res.status(200).json({
    text: data.candidates[0].content.parts[0].text
  });
}