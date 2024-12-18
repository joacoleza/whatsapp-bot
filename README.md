# whatsapp-bot

whatsapp-bot is an open-source project that enables users to interact with WhatsApp chats using AI-driven commands. It listens for specific commands and integrates with OpenAI's GPT API to generate responses, such as summarizing chat conversations, telling jokes, or providing cooking recipes.

> **IMPORTANT!**
>
> - WhatsApp does not officially support bots or unofficial clients on their platform. Use this bot at your own risk. There is a possibility of getting blocked or restricted. For more information, see the [WhatsApp Web.js documentation](https://github.com/pedroslopez/whatsapp-web.js).

## Features

- **OpenAI Integration:** Uses OpenAI's GPT API to generate human-like responses
- **Custom Commands:** Users can interact with the bot using the `whatsapp-bot` prefix to trigger the following actions
  - summarize the last messages on the conversation or group
  - tell a joke
  - share a cooking recipe
- **Easy to set up and run.**

---

## Prerequisites

1. Node.js (version 16 or later).
2. A valid OpenAI API key.
3. WhatsApp installed on your phone.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joacoleza/whatsapp-bot
   cd whatsapp-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a _.env_ file by copying the contents of the _.env.example_ file and update the required values, such as your OpenAI API key.

---

## Quickstart

1. Start the bot:

   ```bash
   node src/index.js
   ```

2. A QR code will be displayed in the console. Open the **WhatsApp app** on your phone, go to Linked Devices, and scan the QR code.

3. Once the bot is connected, send or receive a command in any chat. To trigger the OpenAI integration, the message must start with the `whatsapp-bot` prefix. The bot will respond in the language of the message.

Examples of messages:

- whatsapp-bot summarize the last 50 messages.
- whatsapp-bot tell me a joke.
- whatsapp-bot tell me the carbonara recipe.

---

## Project Structure

- `src/index.js`: Main application logic.
- `src/openAiClient.js`: Integration with openAI logic.
- `.env`: Stores environment variables like the OpenAI API key.
- `node_modules/`: Contains dependencies (auto-generated).
- `.gitignore`: Ensures sensitive files like `.env` are not committed to version control.

---

## Troubleshooting

- **No QR Code Displayed:** Ensure you have installed both qrcode-terminal and whatsapp-web.js. If not, install them with npm install qrcode-terminal whatsapp-web.js.
- **Error: Missing API Key:** Make sure your .env file contains a valid OpenAI API key. You can obtain one from OpenAI's website.
- **Bot Not Responding:** Double-check that the bot is properly connected to WhatsApp (scanned QR code successfully) and running in the terminal. Ensure the bot's configuration is correct in the .env file.

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
