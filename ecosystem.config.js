  module.exports = {
    apps: [{
      name: 'quantum-atlas-dev',
      script: 'pnpm',
      args: 'start',
      cwd: '/opt/Quantum-Atlas-Dev',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: '/var/log/pm2/quantum-atlas-dev-error.log',
      out_file: '/var/log/pm2/quantum-atlas-dev-out.log',
      autorestart: true,
      max_memory_restart: '1G'
    }]
  };
