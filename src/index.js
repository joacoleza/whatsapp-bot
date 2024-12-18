require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const OpenAiClient = require("./openAiClient");

// Validate that the API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key. Please set it in the .env file.");
}

// Initialize OpenAI client
const openAiClient = new OpenAiClient(process.env.OPENAI_API_KEY);

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code with your WhatsApp app:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});

const whatsappBotMessageHeader = "🤖🤖🤖 *whatsapp-bot* 🤖🤖🤖";
const MAX_SUMMARY_MESSAGES = 150;

// Message event listener
client.on("message_create", async (message) => {
  const senderName = await getUserName(message);
  console.log("message:", senderName, "-", message.body);

  if (message.body.toLowerCase().startsWith("whatsapp-bot")) {
    const userCommand = message.body.slice(12).trim(); // Extract command after "whatsapp-bot"

    console.log("User command:", userCommand);

    try {
      // Use OpenAiClient to get the command response
      const command = await openAiClient.getCommand(userCommand);

      const languageCode = (
        await openAiClient.detectLanguage(userCommand)
      ).toLowerCase();

      // Handle different commands based on OpenAI response
      if (command.toLowerCase().startsWith("summarize")) {
        const regex = /\d+/;
        const match = command.match(regex);
        let messageLimit = !match || !match[0] ? 50 : match[0];

        let headerToTranslate = `Here you have the summary of the last ${messageLimit}`;

        if (messageLimit > MAX_SUMMARY_MESSAGES) {
          headerToTranslate = `${messageLimit} are too many! Here you have the summary of the last ${MAX_SUMMARY_MESSAGES}`;
          messageLimit = MAX_SUMMARY_MESSAGES;
        }

        const header =
          languageCode === "en"
            ? headerToTranslate
            : await openAiClient.translateText(headerToTranslate, languageCode);

        const chat = await message.getChat();
        const messages = await chat.fetchMessages({ limit: messageLimit });
        const summarizedText = await summarizeMessages(messages, languageCode);

        message.reply(
          `${whatsappBotMessageHeader}\n\n${header}\n\n${summarizedText}`
        );
      } else if (command.toLowerCase().startsWith("telljoke")) {
        const joke = await openAiClient.getJoke(languageCode);
        message.reply(`${whatsappBotMessageHeader}\n\n${joke}`);
      } else if (command.toLowerCase().startsWith("recipe")) {
        const resultRecipe = await openAiClient.getRecipe(
          command,
          languageCode
        );
        message.reply(`${whatsappBotMessageHeader}\n\n${resultRecipe}`);
      } else {
        const textToTranslate = `Unknown command. You can ask me to tell a joke or summarize the last X messages. Please retry.`;
        const unknownCommandResponse =
          languageCode === "en"
            ? textToTranslate
            : await openAiClient.translateText(textToTranslate, languageCode);

        message.reply(
          `${whatsappBotMessageHeader}\n\n${unknownCommandResponse}`
        );
      }
    } catch (error) {
      console.error("Error processing the command:", error);
      message.reply(
        `${whatsappBotMessageHeader}\n\nAn error occurred while processing your command. Please try again.`
      );
    }
  }
});

const getUserName = async (message) => {
  if (message.fromMe) {
    return process.env.MY_NICKNAME || "Unknown";
  }

  if (!message.getContact) {
    return "unknown";
  }

  const contact = await message.getContact();
  return contact.pushname || contact.name || "Unknown"; // Get pushname or fallback to name
};

const summarizeMessages = async (messages, languageCode) => {
  // Extract user names and format messages
  const contentArray = [];
  for (const msg of messages) {
    const userName = await getUserName(msg);
    contentArray.push(`${userName} said: ${msg.body}`);
  }

  const content = contentArray.join("\n\n");

  const summary = await openAiClient.summarizeMessages(content, languageCode);

  return summary;
};

// Start the WhatsApp client
client.initialize();
