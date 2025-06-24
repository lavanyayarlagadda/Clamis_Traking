import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Badge,
  Divider,
  TextField,
} from '@mui/material';
import {
  Close,
  MessageOutlined,
  Send,
  SmartToy,
  AccountCircle,
  AccessTime,
  AutoAwesome,
  OpenInFull, CloseFullscreen
} from '@mui/icons-material';
import chatBot from '../assets/chatbot.png'

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! \u2728 I'm your intelligent assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto'; // Restore on unmount
  };
}, [isOpen]);

const generateBotResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();

  if (lower.includes('reconciliation rate') && lower.includes('january 2025'))
    return `Reconciliation Rate January 2025:\nBased on processed claims for January 2025, the reconciliation rate is 89.21%. This indicates that 89.21% of the total claimed amount was successfully settled`;

  if (lower.includes('claim summary') && lower.includes('36719688'))
    return `Claim Summary Claim No. 36719688 (Ravi Kumar Gandu):\nAdmission Discharge: 22-Feb-2024 to 24-Feb-2024\nInsurance Company: The New India Assurance Co. Ltd\nTPA: Medi Assist Insurance TPA India Pvt Ltd\nClaimed Amount: ₹20,000\nApproved Amount: ₹14,600\nCopay: ₹5,400\nShortfall: ₹0\nHospital Discount: ₹2,000\nTDS Deducted: ₹1,460\nSettled Amount: ₹13,140\nPaid via: NEFT (UTR No. AXISCN0559391200 on 20-Mar-2024)\nStatus: Settled\nDiagnosis: CAD, Unstable Angina, T2DM, HTN\nQuery Remarks: Treating doctor certificate and detailed treatment notes were requested.`;

  if (lower.includes('total settled amount') && lower.includes('may 2025'))
    return `Total Settled Amount May 2025:\nThe total settled amount for claims processed in May 2025 is ₹6,47,890.\nThis reflects the final amount paid to hospitals or beneficiaries after all applicable deductions and reconciliations.`;

  if (lower.includes('help'))
    return "I'm absolutely here to help! Think of me as your personal guide. What would you like to explore together?";

  if (lower.includes('thank'))
    return "You're so welcome!  It's my pleasure to assist. Anything else on your mind?";

  if (lower.includes('bye') || lower.includes('goodbye'))
    return "Until next time! I'm always here whenever you need assistance. Have a great day!";

  // Generic fallback for unknown prompts
  return `I'm sorry, I didn't quite understand that request.

You can ask me things like:
• "Show claim summary for [Patient Name] or [Claim Number]"
• "What is the reconciliation rate for [Month/Year]?"
• "How many claims were processed this month?"`;
};


  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(userMsg.text),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <Box sx={{ position: 'fixed', bottom: 1, right: 24, zIndex: 1300 }}>
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
              color: 'white',
              boxShadow: 6,
              '&:hover': {
                background: 'linear-gradient(135deg, #6D28D9, #7C3AED)',
              },
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {isOpen ? <Close /> : <img src={chatBot} alt="chatBot" style={{ width: 35, height: 35 }} />}
          </IconButton>
      </Box>

      {/* Chat Window */}
   {isOpen && (
  <Box
    sx={{
      position: 'fixed',
      top:  24,
      bottom: isExpanded ? 20 : 100,
      right: 24,
      width: isExpanded ? (isMobile ? '95%' : '90vw') : (isMobile ? '90%' : 400),
      height: isExpanded ? '88vh' : 520,
      bgcolor: 'white',
      borderRadius: 4,
      boxShadow: 12,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1200,
      transition: 'all 0.3s ease',
    }}
  >
    {/* Header */}
    <Box
      sx={{
        p: 1,
        background: 'linear-gradient(to right, #7C3AED,rgb(139, 92, 246))',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box position="relative" mr={2}>
        <Avatar sx={{ bgcolor: 'white', width: 40, height: 40 }}>
          <SmartToy color="primary" />
        </Avatar>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#48D56B',
            border: '2px solid white',
            animation: 'pulse-green 1.5s infinite',
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
              borderRadius: '50%',
              backgroundColor: '#48D56B',
            }}
          />
          <Typography variant="caption" sx={{ color: 'white' }}>
            Online & Ready
          </Typography>
        </Box>
      </Box>

      {/* Expand/Collapse Icon */}
      <Box ml="auto">
        <IconButton
          size="small"
          onClick={() => setIsExpanded((prev) => !prev)}
          sx={{ color: 'white' }}
        >
          {isExpanded ? <CloseFullscreen fontSize="small" /> : <OpenInFull fontSize="small" />}
        </IconButton>
      </Box>
    </Box>
          {/* Messages */}
          <Box sx={{ p: 2, flex: 1, overflowY: 'auto', bgcolor: '#f9fafb' }}>
            <Stack spacing={2}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1.5, flexDirection: msg.isUser ? 'row-reverse' : 'row' }}>
                    <Avatar sx={{background: msg.isUser ?'linear-gradient(to right,rgb(116, 94, 155),rgb(153, 138, 187))': 'linear-gradient(to right, #7C3AED,rgb(139, 92, 246))' }}>
                      {msg.isUser ? <AccountCircle /> : <img src={chatBot} alt="chatBot" style={{ width: 20, height: 20 }} />}
                    </Avatar>
                    <Paper
                      sx={{
                        p: 1.5,
                         background: msg.isUser ?'linear-gradient(to right,rgb(116, 94, 155),rgb(153, 138, 187))': 'white',
                        color: msg.isUser ? 'white' : 'text.primary',
                        borderRadius: 2,
                        maxWidth: isExpanded ? '1000px':300,
                        width:isExpanded?850:'auto',
                        boxShadow: 2,
                      }}
                    >
                      <Typography variant="body2" >{msg.text}</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
                        <AccessTime sx={{ fontSize: 14, opacity: 0.6 }} />
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Box>
              ))}
              {isTyping && (
                <Typography variant="body2" color="text.secondary">Assistant is typing...</Typography>
              )}
              <div ref={messagesEndRef} />
            </Stack>
          </Box>

          {/* Input */}
          <Box sx={{ p: 1, borderTop: '1px solid #eee' }}>
          <Box display="flex" gap={1} p={1}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              size="small"
              sx={{borderRadius:'20px'}}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              sx={{ px: 2, minWidth: 40 }}
            >
              <Send />
            </Button>
          </Box>
            {/* </Paper> */}
          </Box>
        </Box>
      )}
            <style>{`
        @keyframes pulse-green {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;