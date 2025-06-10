module.exports = {
  apps : [
    {
      name: 'time-capsule',
      script: './src/main.js',
      cwd: '/opt/time-capsule/current',
      error_file: '/opt/time-capsule/logs/app.err.log',
      out_file: '/opt/time-capsule/logs/app.out.log',
      exec_mode: 'fork',
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: 'production',
        PORT: 32278,
        TZ: 'Europe/Warsaw',
      },
    },
  ]
};
