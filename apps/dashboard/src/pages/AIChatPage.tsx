import { Icon } from '@financeai/ui';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function AIChatPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Good morning! I noticed your weekly grocery spend is up 15% compared to last month. How can I help you manage your finances today?'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Portfolio Mode: Simulated AI Response
      // Generate a context-aware mock response based on the input
      let mockResponse = '';
      const lowerInput = userMessage.content.toLowerCase();
      
      if (lowerInput.includes('spend') || lowerInput.includes('spending')) {
        mockResponse = "Based on your recent transactions, you've spent Rp 4.112.000 this month. The largest category is Shopping (39.4%). You are currently on track to stay within your budget, but consider reducing discretionary purchases to save more.";
      } else if (lowerInput.includes('laptop')) {
        mockResponse = "You currently have Rp 6.388.000 remaining this month. Depending on the laptop's price, you might want to save for another month. If it's around Rp 10.000.000, setting aside 20% of your income for the next two months will comfortably cover it.";
      } else if (lowerInput.includes('analyze')) {
        mockResponse = "Analyzing your pattern... You have consistent income but your Food & Dining expenses spike on weekends. By meal-prepping twice a week, you could save approximately Rp 800.000 per month based on your current habits.";
      } else {
        mockResponse = "That's an interesting question. While I'm in portfolio demo mode, I can help you analyze your spending, give tips on buying large items like a laptop, or give a general financial overview. What would you like to know?";
      }

      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add empty message first
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: ''
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false); // Stop the bouncing dots

      // Typewriter effect simulation
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < mockResponse.length) {
          const char = mockResponse.charAt(i);
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessageIndex = newMessages.length - 1;
            const lastMessage = newMessages[lastMessageIndex];
            
            if (lastMessage && lastMessage.role === 'assistant') {
              newMessages[lastMessageIndex] = {
                ...lastMessage,
                content: lastMessage.content + char
              };
            }
            return newMessages;
          });
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 15); // Adjust typing speed here

    } catch (err: any) {
      setIsLoading(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${err.message || 'Something went wrong.'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleChipClick = (text: string) => {
    setInput(text);
  };

  return (
    <main className="flex-1 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] relative flex justify-center lg:justify-end">
      {/* Ambient Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-secondary-container/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[20%] w-[50%] h-[50%] rounded-full bg-primary-container/10 blur-[100px]" />
      </div>

      {/* Chat Container */}
      <div className="w-full lg:max-w-[800px] h-full flex flex-col glass-panel border-r-0 border-t-0 border-b-0 shadow-[-20px_0_40px_rgba(0,0,0,0.3)] relative z-10 slide-in-right">
        
        {/* Chat Header */}
        <header className="flex items-center justify-between px-lg py-md border-b border-outline-variant/10 bg-surface/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
              <Icon name="auto_awesome" filled className="text-primary" />
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md ai-gradient-text m-0">FinanceAI</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Powered by Groq API</p>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <button aria-label="Chat History" className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors group">
              <Icon name="history" className="group-hover:text-primary transition-colors" />
            </button>
            <button 
              aria-label="Close Assistant" 
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors group"
            >
              <Icon name="close" className="group-hover:text-error transition-colors" />
            </button>
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-md md:px-lg py-lg flex flex-col gap-lg hide-scrollbars">
          
          {/* Date Separator */}
          <div className="flex justify-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high/50 px-sm py-xs rounded-full border border-outline-variant/10">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            msg.role === 'assistant' ? (
              <div key={msg.id} className="flex gap-md max-w-[95%] md:max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center mt-1 border border-outline-variant/20">
                  <Icon name="auto_awesome" filled size={18} className="text-primary" />
                </div>
                <div className="flex flex-col gap-sm w-full">
                  <div className="glass-bubble-ai rounded-2xl rounded-tl-sm px-md py-sm shadow-sm">
                    <p className="font-body-md text-body-md text-on-surface m-0 whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex gap-md max-w-[90%] md:max-w-[85%] self-end flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center mt-1 overflow-hidden border border-primary/20">
                  <Icon name="person" filled size={18} className="text-on-primary-container" />
                </div>
                <div className="bg-primary/20 backdrop-blur-md rounded-2xl rounded-tr-sm px-md py-sm border border-primary/30 shadow-sm text-right">
                  <p className="font-body-md text-body-md text-primary-fixed m-0">
                    {msg.content}
                  </p>
                </div>
              </div>
            )
          ))}

          {isLoading && (
            <div className="flex gap-md max-w-[95%] md:max-w-[90%]">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center mt-1 border border-outline-variant/20">
                <Icon name="auto_awesome" filled size={18} className="text-primary" />
              </div>
              <div className="glass-bubble-ai rounded-2xl rounded-tl-sm px-md py-sm shadow-sm flex items-center gap-1 h-[42px]">
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area & Suggestions */}
        <div className="p-4 md:p-lg bg-surface/80 backdrop-blur-xl border-t border-outline-variant/10 flex flex-col gap-md">
          {/* Suggested Questions Chips */}
          <div className="flex overflow-x-auto pb-sm gap-sm hide-scrollbars whitespace-nowrap">
            <button onClick={() => handleChipClick('How much did I spend this week?')} className="px-sm py-xs rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-primary font-label-sm text-label-sm flex-shrink-0">
              How much did I spend this week?
            </button>
            <button onClick={() => handleChipClick('Analyze my spending pattern')} className="px-sm py-xs rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-primary font-label-sm text-label-sm flex-shrink-0">
              Analyze my spending pattern
            </button>
            <button onClick={() => handleChipClick('Can I afford a new laptop?')} className="px-sm py-xs rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-primary font-label-sm text-label-sm flex-shrink-0">
              Can I afford a new laptop?
            </button>
          </div>

          {/* Input Field */}
          <form 
            onSubmit={handleSend}
            className="relative flex items-center bg-surface-container rounded-full border border-outline-variant/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-inner"
          >
            <button type="button" aria-label="Attach Document" className="p-sm text-on-surface-variant hover:text-primary transition-colors ml-sm">
              <Icon name="attach_file" />
            </button>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant font-body-md py-md px-sm" 
              placeholder="Ask FinanceAI..." 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              aria-label="Send Message" 
              className="mr-sm w-10 h-10 rounded-full ai-gradient-btn flex items-center justify-center text-white shadow-lg hover:shadow-primary/30 transition-shadow group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="send" filled size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </form>
          <div className="text-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant/60">
              FinanceAI can make mistakes. Consider verifying important information.
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}
