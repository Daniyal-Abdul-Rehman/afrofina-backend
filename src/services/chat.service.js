const Chat = require('../models/chat.models');

const createChat = async (chatBody) => {
  const chat = new Chat(chatBody);
  await chat.save();
  return chat;
};

const queryChats = async (filter, options) => {
  const chats = await Chat.paginate(filter, options);
  return chats;
};

const getChatById = async (id) => {
  return Chat.findById(id);
};

const updateChatById = async (chatId, updateBody) => {
  const chat = await getChatById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  Object.assign(chat, updateBody);
  await chat.save();
  return chat;
};

const deleteChatById = async (chatId) => {
  const chat = await getChatById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  await chat.remove();
};

module.exports = {
  createChat,
  queryChats,
  getChatById,
  updateChatById,
  deleteChatById,
};
