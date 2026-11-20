
# AI Task Assistant

A TypeScript-based AI agent demonstrating LLM API integration, Tool Calling, and a custom Agent Loop using the Anthropic API.

## Features

- Claude API integration
- Custom `get_tasks` tool
- Tool input validation
- Multi-step Agent Loop
- Conversation history management
- Maximum execution step limit

## Architecture

User Request
    ↓
Claude API
    ↓
Tool Selection
    ↓
TypeScript Tool Execution
    ↓
Tool Result
    ↓
Claude Final Response

## Tech Stack

- TypeScript
- Node.js
- Anthropic SDK

## Getting Started

1. Install dependencies:

   npm install

2. Create a `.env` file:

   ANTHROPIC_API_KEY=your_api_key

3. Run:

   npx tsx src/index.ts

## Limitations

- Uses sample task data stored in memory
- No database or user authentication
- No persistent conversation history
- Tool execution is limited to five agent steps

## Purpose

A practical foundation for building AI agents with custom tools, orchestration logic, and controlled execution.
