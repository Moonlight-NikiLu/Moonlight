document.addEventListener("DOMContentLoaded", function() {
    const messagesDiv = document.getElementById("messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // 自動回覆邏輯
    const autoReply = (message) => {
        const replies = {
            "hello": "Hi there! How can I help you?",
            "how are you": "I'm just a bot, but I'm doing great!",
            "bye": "Goodbye! Have a nice day!",
            "你好": "你好，Moonlight現在有Instagram 帳號喔!!",
        };

        return replies[message.toLowerCase()] || "I'm not sure how to respond to that.";
    };

    // 新增訊息到對話框
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = text;
        messageDiv.className = sender;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // 自動捲動到最新訊息
    };

    // 發送訊息
    const sendMessage = () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            // 用戶訊息
            addMessage(`You: ${userMessage}`, "user");
            userInput.value = "";

            // 機器人回覆
            const botReply = autoReply(userMessage);
            setTimeout(() => {
                addMessage(`Bot: ${botReply}`, "bot");
            }, 500);
        }
    };

    // 按鈕點擊事件
    sendButton.addEventListener("click", sendMessage);

    // Enter 鍵支援
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("send-button");

    // 測試按鈕是否有反應
    sendButton.addEventListener("click", () => {
        console.log("Send button clicked!");
    });
});

// 保存對話歷史
const saveChatHistory = (message, sender) => {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({ message, sender });
    localStorage.setItem("chatHistory", JSON.stringify(history));
};

// 加載對話歷史
const loadChatHistory = () => {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.forEach(({ message, sender }) => {
        addMessage(message, sender);
    });
};

// 在頁面載入時調用
loadChatHistory();
