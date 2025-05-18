module.exports = {
  apps : [
    {
      name: 'time-capsule',
      script: './main.js',
      cwd: '/opt/time-capsule/current',
      error_file: '/opt/time-capsule/logs/app.err.log',
      out_file: '/opt/time-capsule/logs/app.out.log',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 32278,
        TZ: 'Europe/Warsaw',
      },
    },
  ]
};
