import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export const ChatbotSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinkingText, setThinkingText] = useState("Thinking.");

  useEffect(() => {
    if (loading) {
      let dotCount = 1;
      const interval = setInterval(() => {
        dotCount = (dotCount % 3) + 1; // 1, 2, 3
        setThinkingText("Thinking" + ".".repeat(dotCount));
      }, 500);
      return () => clearInterval(interval); // cleanup when loading stops
    } else {
      setThinkingText("Thinking.");
    }
  }, [loading]);

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (question = input) => {
    const newMessages = [...messages, { role: "user", text: question }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("https://terence-app.duckdns.org/ask-stream", {
      method: "POST",
      body: JSON.stringify({ question: question }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || !response.body) {
      console.error("Error with stream");
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let botText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      let chunk = decoder.decode(value, { stream: true });

      if (chunk) {
        botText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          if (last?.role === "bot") {
            updated[updated.length - 1] = { role: "bot", text: botText };
          } else {
            updated.push({ role: "bot", text: botText });
          }
          return [...updated];
        });
      }
    }

    setLoading(false);
  };

  const suggestedQuestions = [
    "What skills does Terence have?",
    "Is Terence a good team player?",
    "What technologies has Terence worked with?",
    "Tell me about Terence's experience at Standard Chartered.",
  ];

  return (
    <section id="chatbot" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <a href="#chatbot">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Chat with my <span className="text-primary">AI Assistant</span>
          </h2>
        </a>

        <div style={{ width: "100%" }}>
          <h2>Chat with my AI assistant! </h2>
          <p>
            Find out more about Terence's career and skills - powered by
            qwen3:0.6b
          </p>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <div style={{ marginBottom: "10px" }}>
              <div style={{ textAlign: "left" }}>
                <strong>Suggested Questions:</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "5px",
                }}
              >
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      sendMessage(question);
                    }}
                    disabled={loading}
                    // className="suggestion-button"
                    className="px-2 py-1 text-s border font-medium rounded-full bg-secondary text-secondary-foreground"
                    style={{
                      padding: "5px 10px",
                      // backgroundColor: "#f0f0f0",
                      // border: "1px solid #ccc",
                      // borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                height: "400px",
                overflowY: "auto",
              }}
              className="chat-box"
            >
              {messages.map((msg, index) => (
                // <p
                //   key={index}
                //   style={{
                //     textAlign: msg.role === "user" ? "right" : "left",
                //   }}
                // >
                //   <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
                //   {msg.text}
                // </p>
                <div className="">
                  <div
                    className={
                      msg.role === "user" ? "user-message" : "bot-message"
                    }
                  >
                    <ReactMarkdown
                      key={index}
                      children={`${
                        msg.role === "user" ? "**You:**" : "**Bot:**"
                      } ${String(msg.text).trimStart()}`}
                      components={{
                        p: ({ node, ...props }) => (
                          <p
                            style={{
                              textAlign: msg.role === "user" ? "right" : "left",
                              marginBottom: "10px",
                            }}
                            {...props}
                          />
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", marginTop: "1.3em" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                // style={{
                //   padding: "10px",
                //   marginTop: "10px",
                //   marginRight: "10px",
                // }}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                placeholder="Talk to the chatbot"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                // style={{ padding: "10px", marginTop: "10px" }}
                disabled={loading || input.trim() === ""}
                // className="chat-button"
                className={cn(
                  "cosmic-button px-15 ml-5 flex items-center justify-center gap-2"
                )}
              >
                {loading ? thinkingText : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// import React, { useState, useEffect } from "react";
// import "./Chatbot.css";
// import { chatUrl } from "../../config/config";
// import ReactMarkdown from "react-markdown";

// export default function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [thinkingText, setThinkingText] = useState("Thinking.");

//   useEffect(() => {
//     if (loading) {
//       let dotCount = 1;
//       const interval = setInterval(() => {
//         dotCount = (dotCount % 3) + 1; // 1, 2, 3
//         setThinkingText("Thinking" + ".".repeat(dotCount));
//       }, 500);
//       return () => clearInterval(interval); // cleanup when loading stops
//     } else {
//       setThinkingText("Thinking.");
//     }
//   }, [loading]);

//   useEffect(() => {
//     const chatBox = document.querySelector(".chat-box");
//     if (chatBox) {
//       chatBox.scrollTop = chatBox.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = async (question = input) => {
//     const newMessages = [...messages, { role: "user", text: question }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     const response = await fetch("https://terence-app.duckdns.org/ask-stream", {
//       method: "POST",
//       body: JSON.stringify({ question: question }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok || !response.body) {
//       console.error("Error with stream");
//       setLoading(false);
//       return;
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder("utf-8");
//     let botText = "";

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       let chunk = decoder.decode(value, { stream: true });

//       if (chunk) {
//         botText += chunk;
//         setMessages((prev) => {
//           const updated = [...prev];
//           const last = updated[updated.length - 1];

//           if (last?.role === "bot") {
//             updated[updated.length - 1] = { role: "bot", text: botText };
//           } else {
//             updated.push({ role: "bot", text: botText });
//           }
//           return [...updated];
//         });
//       }
//     }

//     setLoading(false);
//   };

//   const suggestedQuestions = [
//     "What skills does Terence have?",
//     "Is Terence a good team player?",
//     "What technologies has Terence worked with?",
//     "Tell me about Terence's experience at Standard Chartered.",
//   ];

//   return (
//     <div style={{ width: "100%" }}>
//       <h2>Chat with my AI assistant! </h2>
//       <p>
//         Find out more about Terence's career and skills - powered by qwen3:0.6b
//       </p>
//       <div style={{ marginBottom: "10px" }}>
//         <strong>Suggested Questions:</strong>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "10px",
//             marginTop: "5px",
//           }}
//         >
//           {suggestedQuestions.map((question, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setInput(question);
//                 sendMessage(question);
//               }}
//               disabled={loading}
//               className="suggestion-button"
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#f0f0f0",
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               {question}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "10px",
//           height: "400px",
//           overflowY: "auto",
//         }}
//         className="chat-box"
//       >
//         {messages.map((msg, index) => (
//           // <p
//           //   key={index}
//           //   style={{
//           //     textAlign: msg.role === "user" ? "right" : "left",
//           //   }}
//           // >
//           //   <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
//           //   {msg.text}
//           // </p>
//           <div className="">
//             <div
//               className={msg.role === "user" ? "user-message" : "bot-message"}
//             >
//               <ReactMarkdown
//                 key={index}
//                 children={`${
//                   msg.role === "user" ? "**You:**" : "**Bot:**"
//                 } ${String(msg.text).trimStart()}`}
//                 components={{
//                   p: ({ node, ...props }) => (
//                     <p
//                       style={{
//                         textAlign: msg.role === "user" ? "right" : "left",
//                         marginBottom: "10px",
//                       }}
//                       {...props}
//                     />
//                   ),
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div style={{ display: "flex" }}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{ padding: "10px", marginTop: "10px", marginRight: "10px" }}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           disabled={loading}
//         />
//         <button
//           onClick={() => sendMessage()}
//           // style={{ padding: "10px", marginTop: "10px" }}
//           disabled={loading || input.trim() === ""}
//           className="chat-button"
//         >
//           {loading ? thinkingText : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }
