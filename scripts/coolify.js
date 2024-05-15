#!/usr/bin/env node

const axios = require('axios');
const { Command } = require('commander');

const program = new Command();
program
  .option('-w, --webhook <url>', 'Coolify webhook URL')
  .option('-t, --token <token>', 'Coolify token')
  .parse(process.argv);

const { webhook, token } = program.opts();

axios
  .get(webhook, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .catch((error) => {
    console.error(error);
  });
