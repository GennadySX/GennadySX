const config = require("./config");
const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();

fetch("https://api.raindrop.io/rest/v1/raindrops/0?perpage=5", {
  headers: {
    Authorization: `Bearer ${process.env.RAINDROP_API_KEY}`,
  },
})
  .then((r) => r.json())
  .then((res) => {
    const dtfUK = new Intl.DateTimeFormat("UK", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    fs.writeFileSync(
      "./README.md",
      `


### 🛠 &nbsp;Tech Stack

${Object.entries(config.SKILLS)
  .map(([key, value]) => {
    return `![${key}](${value})&nbsp;\n`;
  })
  .join("")}


### 🔖 &nbsp;My Last Bookmarks
${res.items
  .map(({ link, title }) => {
    return `- [${title}](${link})\n`;
  })
  .join("")}

<br/>

[![wakatime](https://wakatime.com/badge/user/018c4f6c-8837-42be-91bc-5c79ed9c18be.svg)](https://wakatime.com/@018c4f6c-8837-42be-91bc-5c79ed9c18be)
    `
    );
  });
