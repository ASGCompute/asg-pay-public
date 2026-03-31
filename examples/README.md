# ASG Pay Examples

Integration examples for common use cases.

| Example | Language | Description |
|---------|----------|-------------|
| [python_agent.py](python_agent.py) | Python | Generate ASG Pay funding URLs |
| [typescript_agent.ts](typescript_agent.ts) | TypeScript | Generate ASG Pay funding URLs |
| [monitor_payments.ts](monitor_payments.ts) | TypeScript | Stream real-time Stellar payments |

## Usage

### Python

```bash
python examples/python_agent.py
```

### TypeScript

```bash
npx tsx examples/typescript_agent.ts
npx tsx examples/monitor_payments.ts
```

## MCP Server

For AI agent frameworks (Claude, Cursor, Codex), the MCP server provides built-in payment tools:

```bash
npx @asgcard/mcp-server
```
