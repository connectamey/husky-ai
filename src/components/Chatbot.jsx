// "use client"
// import "../app/chatbot.css";
// import { useState } from "react";
// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from "@chatscope/chat-ui-kit-react";

// const API_KEY = "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";
// const systemMessage = {
//   role: "system",
//   content:
//     "Explain things like you're talking to a software professional with 2 years of experience.",
// };

// function App() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT",
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);
//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: "outgoing",
//       sender: "user",
//     };
//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     // messages is an array of messages
//     // Format messages for chatGPT API
//     // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
//     // So we need to reformat

//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant";
//       } else {
//         role = "user";
//       }
//       return { role: role, content: messageObject.message };
//     });

//     // Get the request body set up with the model we plan to use
//     // and the messages which we formatted above. We add a system message in the front to'
//     // determine how we want chatGPT to act.
//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         systemMessage, // The system message DEFINES the logic of our chatGPT
//         ...apiMessages, // The messages from our chat with ChatGPT
//       ],
//     };

//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//     })
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setMessages([
//           ...chatMessages,
//           {
//             message: data.choices[0].message.content,
//             sender: "ChatGPT",
//           },
//         ]);
//         setIsTyping(false);
//       });
//   }

//   return (
//     <div className="App">
//       <div style={{ position: "relative", height: "400px", width: "400px" }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//               scrollBehavior="smooth"
//               typingIndicator={
//                 isTyping ? (
//                   <TypingIndicator content="ChatGPT is typing" />
//                 ) : null
//               }
//             >
//               {messages.map((message, i) => {
//                 console.log(message);
//                 return <Message key={i} model={message} />;
//               })}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// }

// export default App;


"use client"
import "../app/chatbot.css";
import { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

function App({ courseName }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize with a course-specific greeting when the component mounts or courseName changes
    setMessages([
      {
        message: `Hello, I can assist you for this course! I'm ready to answer any questions about ${courseName}. Ask me anything about it!`,
        sentTime: "just now",
        sender: "ChatGPT",
      }
    ]);
  }, [courseName]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map(messageObject => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Explain things like you're talking to a student who is eager to learn about ${courseName}.Explain in a beginner friendly way`,
        },
        ...apiMessages,
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then(data => data.json())
      .then(data => {
        const responseMessage = {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        };
        setMessages([...chatMessages, responseMessage]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "400px", width: "400px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
