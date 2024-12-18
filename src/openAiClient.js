const { OpenAI } = require("openai");

const model = "gpt-3.5-turbo";

class OpenAiClient {
  constructor(apiKey) {
    // Initialize OpenAI API
    this.openai = new OpenAI({
      apiKey,
    });
  }

  async getCommand(userCommand) {
    const response = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that analyzes user commands and identifies their type. Follow these rules strictly: " +
            "1. If the user command is a request to summarize the last X messages (where X is a number), respond with: 'summarize X' (replace X with the actual number extracted from the command). Do not include X if no specific number has been specified" +
            "2. If the user command is a request to tell a joke, respond with: 'tellJoke'. " +
            "3. If the user command is a request for a cooking recipe, respond with: 'recipe' followed by the name of the requested recipe. " +
            "4. If the user command does not match either of these, respond with: 'unknown'. " +
            "Your response must strictly follow the above format and contain no additional information, explanations, or text.",
        },
        {
          role: "user",
          content: userCommand,
        },
      ],
      temperature: 0.7,
    });

    const command = response.choices[0].message.content.trim();

    console.log("[OpenAiClient] getCommand:", command);

    return command;
  }

  async getJoke(languageCode) {
    const response = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are an assistant that tells jokes in the following language: ${languageCode}.
            Tell a unique and funny joke that is not very common. Do not tell the joke about birds not having Facebook.
            Do not provide any explanations, preambles, or additional text—just the joke itself.
          `,
        },
      ],
      temperature: 1,
    });

    const joke = response.choices[0].message.content.trim();

    console.log("[OpenAiClient] getJoke:", joke);

    return joke;
  }

  async getRecipe(recipe, languageCode) {
    const response = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are an assistant that tells cooking recipes in the following language: ${languageCode}.
            Do not provide any explanations, preambles, or additional text—just the joke itself.
          `,
        },
        {
          role: "user",
          content: `Recipe for ${recipe}.
          `,
        },
      ],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content.trim();

    console.log("[OpenAiClient] getRecipe:", result);

    return result;
  }

  async detectLanguage(userCommand) {
    // OpenAI API call to detect language
    const languageResponse = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are an assistant that detects the language users input.
            Analyze the user input and respond only with the language code (e.g., "en" for English, "es" for Spanish, "fr" for French, etc.). 
            If you cannot confidently determine the language, respond with "en"
            Your response must only contain the language code and contain no additional information, explanations, or text.
          `,
        },
        {
          role: "user",
          content: userCommand,
        },
      ],
      temperature: 0.7,
    });

    const languageCode = languageResponse.choices[0].message.content.trim();

    console.log("[OpenAiClient] detectLanguage:", languageCode);

    return languageCode;
  }

  async translateText(textToTranslate, languageCode) {
    // OpenAI API call to translate text
    const translationResponse = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are an assistant that translates text into the following language code: ${languageCode}.
            Your response must only contain the translation result and contain no additional information, explanations, or text.
          `,
        },
        {
          role: "user",
          content: textToTranslate,
        },
      ],
      temperature: 0.7,
    });

    const translation = translationResponse.choices[0].message.content.trim();
    console.log("[OpenAiClient] translateText:", translation);

    return translation;
  }

  async translateText(textToTranslate, languageCode) {
    // OpenAI API call to translate text
    const translationResponse = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are an assistant that translates text into the following language code: ${languageCode}.
            Your response must only contain the translation result and contain no additional information, explanations, or text.
          `,
        },
        {
          role: "user",
          content: textToTranslate,
        },
      ],
      temperature: 0.7,
    });

    const translation = translationResponse.choices[0].message.content.trim();
    console.log("[OpenAiClient] translateText:", translation);

    return translation;
  }

  async summarizeMessages(content, languageCode) {
    const prompt = `
      Messages:
      ${content}
    `;

    // OpenAI API call
    const response = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are a highly skilled assistant specializing in summarizing messages into a specified language. Summarize into ${languageCode}.
            Your response must include only the summary of the mesages, grouping them by topic and mentioning the opinion of each person on the topic (only the ones that participated).
            Do not include any labels, explanations, or additional context.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  }
}

module.exports = OpenAiClient;
