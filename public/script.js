document.addEventListener("DOMContentLoaded", function() {
    const messagesDiv = document.getElementById("messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    //自動回覆
    const autoReply = (message) => {
        const replies = {
            "hello": "Hi there! How can I help you?",
            "how are you": "I'm just a bot, but I'm doing great!",
            "bye": "Goodbye! Have a nice day!",
            "你好": `你好，Moonlight現在有Instagram帳號喔!! <a href="https://www.instagram.com/moonlight_handwriting" target="_blank">點擊這裡查看</a>`,
            "line貼圖": `你好，Moonlight 現在有Line手寫貼圖喔!! <a href="https://store.line.me/emojishop/product/67611db8feefbb031e0150b8/zh-Hant?lang=en&utm_source=gnsh_sticonDetail" target="_blank">點擊這裡查看</a>`,
        };
    
        return replies[message.toLowerCase()] || "I'm not sure how to respond to that.";
    };

    // 新增訊息到對話框
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = text; // 使用 innerHTML 支持 HTML 格式
        messageDiv.className = sender;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // 自動滾動到底部
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
