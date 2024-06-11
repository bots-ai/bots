const TelegramBot = require("node-telegram-bot-api");

// Replace the token with your bot's API token
const token = "7335731750:AAGSg3AC_L-m3Mts1c_rO2W8jx4PoA0YS5k";
const forwardChatId = 6006504756; // The chat ID where messages will be forwarded
const bot = new TelegramBot(token, { polling: true });

// Function to handle media message forwarding
function forwardMediaMessage(message) {
  let caption = message.caption ? message.caption : "";
  if (message.photo || message.document || message.video || message.voice || message.audio || message.sticker) {
    caption += `\n\n${message.from.id}`;
    bot.copyMessage(forwardChatId, message.chat.id, message.message_id, { caption: caption });
  }
}

// Event listener for messages in restricted group
bot.on("message", (message) => {
  if (message.chat.id !== forwardChatId && (message.photo || message.document || message.video || message.voice || message.audio || message.sticker)) {
    forwardMediaMessage(message);
  }
});

// Event listener for edited messages in restricted group
bot.on("edited_message", (message) => {
  if (message.chat.id !== forwardChatId && (message.photo || message.document || message.video || message.voice || message.audio || message.sticker)) {
    forwardMediaMessage(message);
  }
});
