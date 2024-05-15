#!/usr/bin/env node

const axios = require('axios');
const { Command } = require('commander');

const program = new Command();
program
  .option('-w, --webhook <url>', 'Slack webhook URL')
  .option('-p, --project <name>', 'Project name')
  .option('-u, --url <url>', 'View URL')
  .parse(process.argv);

const { webhook, project, url } = program.opts();

const message = `Deployment Success!\nProject: ${project}\nView Deployment: ${url}`;
const postData = JSON.stringify({ text: message });

axios
  .post(webhook, postData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .catch((error) => {
    console.error(error);
  });
