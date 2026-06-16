export const chatService = {
  /**
   * Send a message to AI and get response (stubbed).
   */
  async processMessage(userId: string, message: string) {
    // Stub implementation. Later wire up to Gemini or OpenAI.
    return {
      reply: `I see you're asking about "${message}". As an AI assistant, I'm currently in stub mode. Stay tuned for full LLM integration!`,
      insights: [],
    };
  },

  /**
   * Get general AI insights for dashboard.
   */
  async getDashboardInsights(userId: string) {
    return [
      {
        icon: "warning",
        title: "Spending Alert",
        titleIcon: "auto_awesome",
        description: "Your Entertainment spend is up 40% vs last month. Consider reviewing subscriptions.",
        variant: "error",
      },
      {
        icon: "lightbulb",
        title: "AI Tip",
        titleIcon: "auto_awesome",
        description: "You could reach your 'Emergency Fund' goal 2 months early by moving $100 from Dining.",
        variant: "secondary",
      },
    ];
  },
};
