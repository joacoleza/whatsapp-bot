# whatsapp-bot

whatsapp-bot is a simple bot that listens for specific commands in your WhatsApp chats and uses OpenAI's GPT API to analyze the messages and provide responses.

> **IMPORTANT!** It is not guaranteed you will not be blocked by using this. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe (more info on [pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)).

## Features

- Summarizes the last X messages in a chat.
- Utilizes OpenAI's GPT API for generating concise summaries.
- Ask for a joke.
- Ask for a cooking recipe.
- Easy to set up and run.

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

3. Create a _.env_ file copying the _.env.example_ file content and update the values

---

## Quickstart

1. Start the bot:

   ```bash
   node index.js
   ```

2. A QR code will be displayed in the console.
   Open the **WhatsApp app** on your phone, go to Linked Devices, and scan the QR code.

3. Once the bot is connected, send or receive a command in any chat. To trigger the openAI integration, the message must start with the `whatsapp-bot`. The responses then will be in the language used in the message.

Examples of messages:

- whatsapp-bot summarize the last 50 messages.
- whatsapp-bot tell me a joke.

---

## Project Structure

- src/index.js: Main application logic.
- .env: Stores environment variables like the OpenAI API key.
- node_modules/: Contains dependencies (auto-generated).
- .gitignore: Ensures sensitive files like .env are not committed to version control.

---

## Troubleshooting

- No QR Code Displayed: Ensure you have installed qrcode-terminal and whatsapp-web.js.
- Error: Missing API Key: Verify your .env file contains a valid OpenAI API key.
- Bot Not Responding: Ensure the bot is running and connected to WhatsApp.

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
