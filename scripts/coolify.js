#!/usr/bin/env node

const axios = require('axios');
const { Command } = require('commander');

const program = new Command();
program
  .option('-w, --webhook <url>', 'Coolify webhook URL')
  .option('-t, --token <token>', 'Coolify token')
  .parse(process.argv);

const { webhook, token } = program.opts();
console.log(webhook, token);

axios
  .get(webhook, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 3|r3xqOhamqkN5o7fr1kjelOiMhOoNO5faej7A2LK47b0f07e5`,
    },
  })
  .catch((error) => {
    console.error(error);
  });
