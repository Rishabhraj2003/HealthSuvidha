

import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en"); // en | hi
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            text: "Hello 👋 I am your Healthसुविधा Assistant.",
            sender: "bot",
            time: new Date(),
          },
        ];
  });

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🌍 Detect Hindi characters automatically
  const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text) ? "hi" : "en";
  };

  // 🧠 Smart Reply Logic
  const generateReply = (msg) => {
    const text = msg.toLowerCase();
    const detectedLang = detectLanguage(msg);
    const lang = language === "auto" ? detectedLang : language;

    if (lang === "hi") {
      if (text.includes("appointment") || text.includes("अपॉइंटमेंट"))
        return "📅 आप डैशबोर्ड से अपॉइंटमेंट बुक कर सकते हैं।";
      if (text.includes("profile") || text.includes("प्रोफाइल"))
        return "👤 आप डैशबोर्ड से प्रोफाइल अपडेट कर सकते हैं।";
      if (text.includes("contact") || text.includes("संपर्क"))
        return "📞 नीचे दिए गए कॉल बटन से सहायता प्राप्त करें।";
      return "💙 मैं आपकी स्वास्थ्य सहायता के लिए यहाँ हूँ।";
    }

    // English Replies
    if (text.includes("appointment"))
      return "📅 You can book an appointment from Dashboard → Book Appointment.";

    if (text.includes("profile"))
      return "👤 You can edit your profile from Dashboard → Edit Profile.";

    if (text.includes("contact"))
      return "📞 Please use the call button below for support.";

    return "💙 I'm here to help with appointments, profile updates and support.";
  };

  const sendMessage = (customText = null) => {
    const messageText = customText || input;
    if (!messageText.trim()) return;

    const userMessage = {
      text: messageText,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMessage = {
        text: generateReply(messageText),
        sender: "bot",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
    }, 800);
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const quickReplies =
    language === "hi"
      ? ["अपॉइंटमेंट", "प्रोफाइल", "संपर्क करें"]
      : ["Book Appointment", "Edit Profile", "Contact Support"];

  return (
    <>
      {/* Floating Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: 25,
          right: 25,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 999,
        }}
      >
        {/* Chat Button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg,#0066ff,#00c6ff)",
            color: "#fff",
            fontSize: 24,
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0,102,255,0.4)",
          }}
        >
          💬
        </button>

        {/* Call Helpline Button */}
        <a
          href="tel:+918445516372"
          style={{
            width: 55,
            height: 55,
            borderRadius: "50%",
            background: "#00c853",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 22,
            textDecoration: "none",
            boxShadow: "0 8px 25px rgba(0,200,83,0.4)",
          }}
        >
          📞
        </a>
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 25,
            width: 360,
            height: 520,
            background: "#f4f8fb",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg,#0066ff,#00c6ff)",
              color: "#fff",
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>🤖 Healthसुविधा Assistant</span>

            {/* Language Toggle */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                borderRadius: 8,
                border: "none",
                padding: 5,
              }}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 15,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#0066ff" : "#ffffff",
                  color: msg.sender === "user" ? "#fff" : "#333",
                  padding: "10px 14px",
                  borderRadius: 15,
                  maxWidth: "75%",
                }}
              >
                {msg.text}
                <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6 }}>
                  {formatTime(msg.time)}
                </div>
              </div>
            ))}

            {typing && <div>🤖 Typing...</div>}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Replies */}
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "6px 10px",
              flexWrap: "wrap",
              background: "#eef4ff",
            }}
          >
            {quickReplies.map((btn, i) => (
              <button
                key={i}
                onClick={() => sendMessage(btn)}
                style={{
                  background: "#fff",
                  border: "1px solid #0066ff",
                  color: "#0066ff",
                  padding: "5px 10px",
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: 12, background: "#fff" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                language === "hi"
                  ? "अपना संदेश लिखें..."
                  : "Type your message..."
              }
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 25,
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={() => sendMessage()}
              style={{
                marginLeft: 8,
                background: "#0066ff",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: 45,
                height: 45,
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
