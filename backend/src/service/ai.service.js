const { GoogleGenAI } = require("@google/genai");
const { text } = require("express");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile){
  const contents = [
    {
      inlineData:{
        mimeType:"image/jpeg",
        data: base64ImageFile,
      },
    },
    {
      text:"Caption this image"
    },
  ];

  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:contents,
    config:{
      systemInstruction:`
      you are an expert in gernating caption for images.
      you gernate single caption for the image.
      your caption should be short and concise.
      you use hashtags and emojis in the caption.
      gernate caption in tapori language.
      create aesthetic caption.
      the caption should be in dark humor.
      `
    }
  });
  return response.text
}

module.exports = generateCaption