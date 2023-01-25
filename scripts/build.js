// Thanks DonovanDMC https://github.com/OceanicJS/Oceanic/tree/dev/scripts/build.js

const { execSync } = require('child_process');
const { existsSync, mkdirSync, writeFileSync, rmSync, cpSync } = require('fs');
if (existsSync(__dirname + '/../dist')) rmSync(__dirname + '/../dist', { recursive: true });
execSync('npx tsc', { stdio: 'inherit', cwd: __dirname + '/../' });
mkdirSync(__dirname + '/../dist/types');
cpSync(__dirname + '/../lib/types', __dirname + '/../dist/types', { recursive: true });