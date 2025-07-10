import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Close,
  Send,
  SmartToy,
  AccountCircle,
  AccessTime,
  OpenInFull,
  CloseFullscreen,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import chatBot from "../assets/chatbot.png";
import FloatingChatIcon from "./FloatChatBotIcon";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  tableData?: any[];
  tableTitle?: string;
}

interface ApiResponse {
  answer: string;
  table_data?: any[];
  table_title?: string;
  token_count?: number;
}

// TypingIndicator component for the animated dots
const TypingIndicator = () => {
  const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    bgcolor: 'grey.500',
    animation: 'typing-bounce 1.2s infinite ease-in-out',
  };

  return (
    <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center', p: '10px' }}>
      <Box sx={{ ...dotStyle, animationDelay: '0s' }} />
      <Box sx={{ ...dotStyle, animationDelay: '0.2s' }} />
      <Box sx={{ ...dotStyle, animationDelay: '0.4s' }} />
    </Box>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded view
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your intelligent assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]); // Also trigger scroll on isTyping change

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const fetchBotResponse = async (userMessage: string): Promise<ApiResponse> => {
    try {
      // Simulate network delay for testing the animation
      // await new Promise(resolve => setTimeout(resolve, 3000));
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return {
        answer: "I'm sorry, I encountered an error processing your request. Please try again later.",
        token_count: 0
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetchBotResponse(userMsg.text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
        tableData: response.table_data,
        tableTitle: response.table_title,
      };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderTable = (tableData: any[], tableTitle?: string) => {
    if (!tableData || tableData.length === 0) return null;
    
    const columns = Object.keys(tableData[0]);
    
    return (
      <Box sx={{ mt: 2, mb: 1, overflowX: 'auto' }}>
        {tableTitle && (
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {tableTitle}
          </Typography>
        )}
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 3,
            maxWidth: '100%',
            display: 'block',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          <Table size="small" aria-label="response table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                {columns.map((column) => (
                  <TableCell key={column} sx={{ fontWeight: 600 }}>
                    {column.replace(/_/g, ' ')}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column}`}>
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <>
      {!isOpen && (
        <FloatingChatIcon
          onClick={() => {
            setIsOpen(true), setIsExpanded(true); // Open in expanded view by default
          }}
        />
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              position: "fixed",
              top: {
                xs: isExpanded ? 20 : 175,
                sm: isExpanded ? 20 : 170,
                md: isExpanded ? 20 : 170,
                lg: isExpanded ? 20 : 50,
                xl: isExpanded ? 20 : 170,
              },
              bottom: { xs: 20, sm: 20, md: isExpanded ? 20 : 100 },
              right: { xs: 20, sm: 24 },
              left: {
                xs: isExpanded ? 20 : "auto",
                sm: "auto",
              },
              width: {
                xs: isExpanded ? "calc(100% - 40px)" : "calc(100% - 20px)",
                sm: isExpanded ? "calc(100% - 48px)" : 400,
                md: isExpanded ? "calc(100% - 48px)" : 400,
                lg: isExpanded ? "calc(100% - 48px)" : 400,
                xl: isExpanded ? "calc(100% - 48px)" : 400,
              },
              height: {
                xs: isExpanded ? "calc(100vh - 40px)" : 520,
                sm: isExpanded ? "calc(100vh - 40px)" : 520,
                md: isExpanded ? "calc(100vh - 40px)" : 520,
              },
              bgcolor: "white",
              borderRadius: 3,
              boxShadow: 24,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 1200,
              transition: "all 0.3s ease",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 1,
                background:
                  "linear-gradient(to right, #7C3AED, rgb(139, 92, 246))",
                color: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box position="relative" mr={2}>
                <Avatar sx={{ bgcolor: "white", width: 40, height: 40 }}>
                  <SmartToy color="primary" />
                </Avatar>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#48D56B",
                    border: "2px solid white",
                    animation: "pulse-green 1.5s infinite",
                  }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  AI Assistant
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#48D56B",
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "white" }}>
                    Online & Ready
                  </Typography>
                </Box>
              </Box>
              <Box ml="auto">
                <IconButton
                  size="small"
                  onClick={() => setIsExpanded((p) => !p)}
                  sx={{ color: "white" }}
                >
                  {isExpanded ? <CloseFullscreen /> : <OpenInFull />}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setIsOpen(false)}
                  sx={{ color: "white" }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ 
              p: 2, 
              flex: 1, 
              overflowY: "auto", 
              bgcolor: "#f9fafb",
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              }
            }}>
              <Stack spacing={2}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isUser ? "flex-end" : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        flexDirection: msg.isUser ? "row-reverse" : "row",
                      }}
                    >
                      <Avatar
                        sx={{
                          background: msg.isUser
                            ? "linear-gradient(to right,rgb(116, 94, 155),rgb(153, 138, 187))"
                            : "linear-gradient(to right, #7C3AED, rgb(139, 92, 246))",
                        }}
                      >
                        {msg.isUser ? (
                          <AccountCircle />
                        ) : (
                          <img
                            src={chatBot}
                            alt="chatBot"
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </Avatar>
                      <Paper
                        sx={{
                          p: 1.5,
                          background: msg.isUser
                            ? "linear-gradient(to right,rgb(116, 94, 155),rgb(153, 138, 187))"
                            : "white",
                          color: msg.isUser ? "white" : "text.primary",
                          borderRadius: 2,
                          maxWidth: {
                            xs: isExpanded ? "100%" : "90%",
                            sm: isExpanded ? "100%" : "85%",
                            md: isExpanded ? "100%" : "75%",
                          },
                          width: "auto",
                          boxShadow: 2,
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography variant="body2">{msg.text}</Typography>
                        {msg.tableData && renderTable(msg.tableData, msg.tableTitle)}
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          mt={1}
                        >
                          <AccessTime sx={{ fontSize: 14, opacity: 0.6 }} />
                          <Typography variant="caption" sx={{ opacity: 0.6 }}>
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Box>
                  </Box>
                ))}
                {isTyping && (
                   <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          background: "linear-gradient(to right, #7C3AED, rgb(139, 92, 246))",
                        }}
                      >
                         <img
                            src={chatBot}
                            alt="chatBot"
                            style={{ width: 20, height: 20 }}
                          />
                      </Avatar>
                      <Paper
                        sx={{
                          p: 0.5, // Reduced padding for the compact animation
                          background: "white",
                          borderRadius: 2,
                          boxShadow: 2,
                        }}
                      >
                        <TypingIndicator />
                      </Paper>
                    </Box>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Stack>
            </Box>

            {/* Input */}
            <Box sx={{ 
              p: { xs: 0.5, sm: 1 }, 
              borderTop: "1px solid #eee",
              background: 'white'
            }}>
              <Box display="flex" gap={1} p={1} flexWrap="nowrap">
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  variant="outlined"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: '#f9fafb',
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  sx={{ 
                    px: 2, 
                    minWidth: 40,
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    }
                  }}
                >
                  <Send />
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse-green {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes typing-bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;