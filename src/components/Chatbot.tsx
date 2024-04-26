


// "use client"
// import "../app/chatbot.css";
// import { useState, useEffect } from "react";
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

// function App({ courseName }) {
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     // Initialize with a course-specific greeting when the component mounts or courseName changes
//     setMessages([
//       {
//         message: `Hello, I can assist you for this course! I'm ready to answer any questions about ${courseName}. Ask me anything about it!`,
//         sentTime: "just now",
//         sender: "ChatGPT",
//       }
//     ]);
//   }, [courseName]);

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
//     let apiMessages = chatMessages.map(messageObject => ({
//       role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
//       content: messageObject.message
//     }));

//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: `Explain things like you're talking to a student who is eager to learn about ${courseName}.Explain in a beginner friendly way. If the question is not related to ${courseName} , then reply You have asked unrelated question. Please ask question related to ${courseName}`,
//         },
//         ...apiMessages,
//       ],
//     };

//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//     })
//       .then(data => data.json())
//       .then(data => {
//         const responseMessage = {
//           message: data.choices[0].message.content,
//           sender: "ChatGPT",
//         };
//         setMessages([...chatMessages, responseMessage]);
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
//               typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}
//             >
//               {messages.map((message, i) => (
//                 <Message key={i} model={message} />
//               ))}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// }

// export default App;


//@ts-nocheck

"use client";
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
          content: `Explain things like you're talking to a student who is eager to learn about ${courseName}. Explain in a beginner friendly way. If the question is not related to ${courseName}, then reply: You have asked an unrelated question. Please ask questions related to ${courseName}.`,
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
      // After getting the response, call the vectorization function
      convertIntoVector(chatMessages.map(msg => msg.message).join(' '));
      // vectorizeConversation(chatMessages.map(msg => msg.message).join(' '));
    });
  }

  // Function to convert into vector

  async function convertIntoVector(conversationText) {
    try {
      const response = await fetch('/api/vectorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: conversationText })
      });

      if (!response.ok) {
        throw new Error('Failed to vectorize text');
      }

      const data = await response.json();
      console.log('Converted Vector:', data); // You can handle the vector as needed
      let jsonConvertedData = data;
      updateMetadataWithUUID(jsonConvertedData);
      console.log("converted json ", jsonConvertedData);
      saveIntoVectorDB(jsonConvertedData);
    } catch (error) {
      console.error('Error vectorizing text:', error);
    }
  }

  async function saveIntoVectorDB(modifiedText) {
    try {
      const response = await fetch('/api/upsertVector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedText)
      });

      if (!response.ok) {
        throw new Error('Failed to vectorize text');
      }

      const data = await response.json();
      console.log("storage response ", data);
    } catch (error) {
      console.error('Error vectorizing text:', error);
    }
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
  function updateMetadataWithUUID(data) {
    data.vectors.forEach(vector => {
        // Check if 'conversation' key exists
        if(vector.metadata.conversation) {
            vector.metadata.conversation = uuidv4(); // Add 'uuid' key
        }
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


