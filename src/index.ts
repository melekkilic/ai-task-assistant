
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { getTasks } from "./tools";

const client = new Anthropic();

const model = "claude-haiku-5-5";
const MAX_STEPS = 5;

const tools: Anthropic.Tool[] = [
  {
    name: "get_tasks",
    description: "Görevleri tamamlanma durumuna göre listeler.",
    input_schema: {
      type: "object",
      properties: {
        completed: {
          type: "boolean",
          description: "true: tamamlanan, false: tamamlanmayan"
        }
      },
      required: ["completed"]
    }
  }
];

async function main() {
  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content:
        "Tamamlanan ve tamamlanmayan görevlerimi ayrı ayrı listele."
    }
  ];

  for (let step = 0; step < MAX_STEPS; step++) {
    const response = await client.messages.create({
      model,
      max_tokens: 500,
      tools,
      messages
    });

    // Claude'un yanıtını konuşma geçmişine ekle
    messages.push({
      role: "assistant",
      content: response.content
    });

    const toolCalls = response.content.filter(
      block => block.type === "tool_use"
    );

    // Tool çağrısı yoksa nihai yanıtı göster
    if (response.stop_reason === "end_turn") {
      for (const block of response.content) {
        if (block.type === "text") {
          console.log("\nClaude:", block.text);
        }
      }
      return;
    }

    if (
      response.stop_reason !== "tool_use" ||
      toolCalls.length === 0
    ) {
      console.log("Agent beklenmeyen şekilde durdu.");
      return;
    }

    const results: Anthropic.ToolResultBlockParam[] = [];

    for (const call of toolCalls) {
      if (call.name !== "get_tasks") {
        results.push({
          type: "tool_result",
          tool_use_id: call.id,
          content: "Bilinmeyen araç",
          is_error: true
        });
        continue;
      }

      const input = call.input as { completed?: unknown };

      if (typeof input.completed !== "boolean") {
        results.push({
          type: "tool_result",
          tool_use_id: call.id,
          content: "completed boolean olmalı",
          is_error: true
        });
        continue;
      }

      const tasks = getTasks(input.completed);

      console.log(`Tool: get_tasks(${input.completed})`);

      results.push({
        type: "tool_result",
        tool_use_id: call.id,
        content: JSON.stringify(tasks)
      });
    }

    // Tool sonuçlarını Claude'a gönderilecek geçmişe ekle
    messages.push({
      role: "user",
      content: results
    });
  }

  console.log("Maksimum agent adımına ulaşıldı.");
}

main().catch(console.error);
