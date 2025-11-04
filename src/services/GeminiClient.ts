export class GeminiClient {
  private apiKey: string;
  private model: string;
  private endpoint: string;

  /**
   * @param apiKey Google Gemini API Key
   * @param model  Tên model, mặc định: gemini-2.5-flash
   */
  constructor(apiKey: string, model = "gemini-2.5-flash") {
    this.apiKey = apiKey;
    this.model = model;
    this.endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
  }

  async ask(prompt: string): Promise<string> {
    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API Error (${response.status}): ${error}`);
    }

    const result = await response.json();
    return (
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Không có phản hồi từ Gemini API."
    );
  }
}
