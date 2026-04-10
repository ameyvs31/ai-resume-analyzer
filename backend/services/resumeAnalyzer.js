const groq = require('../config/groq');

const extractTextFromPDF = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const PDFParser = require('pdf2json');
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      try {
        let fullText = '';
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(textItem => {
            textItem.R.forEach(r => {
              try {
                fullText += decodeURIComponent(r.T) + ' ';
              } catch (e) {
                fullText += r.T + ' ';
              }
            });
          });
          fullText += '\n';
        });
        resolve(fullText);
      } catch (err) {
        reject(err);
      }
    });

    pdfParser.on('pdfParser_dataError', (error) => {
      reject(error);
    });

    pdfParser.parseBuffer(fileBuffer);
  });
};
const analyzeWithAI = async (resumeText) => {

  // Clean the text before sending to AI
  const cleanText = resumeText
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // remove control characters
    .replace(/\r\n/g, '\n')  // normalize line endings
    .substring(0, 3000);     // limit text length

  const chatCompletion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are an expert resume reviewer.
        Respond with ONLY a valid JSON object.
        No markdown, no backticks, no extra text whatsoever.`
      },
      {
        role: 'user',
        content: `Analyze this resume. Return ONLY this JSON:
        {
          "score": 75,
          "strengths": ["point1", "point2", "point3"],
          "weaknesses": ["point1", "point2", "point3"],
          "suggestions": ["point1", "point2", "point3"],
          "missingKeywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
          "summary": "Two sentence summary here."
        }
        
        Resume: ${cleanText}`
      }
    ],
    temperature: 0.3,
    max_tokens: 1024,
  });

  const responseText = chatCompletion.choices[0].message.content;
  
  // More aggressive cleaning
  const cleaned = responseText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();

  // Find JSON object in response
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AI did not return valid JSON');
  }

  return JSON.parse(jsonMatch[0]);
};