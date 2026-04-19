#!/bin/bash
set -a
source /opt/apps/livekit-agent/.env
set +a
exec /opt/apps/livekit-agent/venv/bin/python /opt/apps/livekit-agent/agent.py start
