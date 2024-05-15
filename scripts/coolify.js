#!/usr/bin/env node

const axios = require('axios');
const { Command } = require('commander');

const program = new Command();
program
  .option('-w, --webhook <url>', 'Coolify webhook URL')
  // .option('-t, --token <token>', 'Coolify token')
  .parse(process.argv);

const { webhook, token } = program.opts();
console.log({ webhook, token });

// webhook has  "http://localhost/=" so we slice it to get the correct url

axios
  .get(webhook, {
    headers: {
      Authorization: `Bearer 3|r3xqOhamqkN5o7fr1kjelOiMhOoNO5faej7A2LK47b0f07e5`,
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
