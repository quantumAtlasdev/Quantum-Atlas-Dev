#!/bin/bash
export NODE_OPTIONS="--dns-result-order=ipv4first"
exec npx -y @srbhptl39/mcp-superassistant-proxy@latest \
  --config /opt/apps/mcp-gateway/config.json \
  --port 8900 \
  --outputTransport streamableHttp
