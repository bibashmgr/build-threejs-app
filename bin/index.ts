#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import prompts from "prompts";
import { blue, reset, yellow } from "kolorist";

type ColorFunc = (str: string | number) => string;

type Template = {
  name: string;
  display: string;
  color: ColorFunc;
};

const TEMPLATES: Template[] = [
  {
    name: "javascript",
    display: "JavaScript",
    color: yellow,
  },
  {
    name: "typescript",
    display: "TypeScript",
    color: blue,
  },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = __dirname.replace("dist", "");

const init = async () => {
  let result: prompts.Answers<"projectName" | "template">;

  try {
    result = await prompts([
      {
        type: "text",
        name: "projectName",
        message: reset("Project Name:"),
      },
      {
        type: "select",
        name: "template",
        message: reset("Select the Template:"),
        choices: TEMPLATES.map((template) => ({
          title: template.display,
          value: template.name,
        })),
      },
    ]);
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { projectName, template } = result;

  fs.mkdirSync(projectName);

  const templateDir = getTemplateDir(template);

  console.log(`\nScaffolding project...`);
  copyDir(templateDir, projectName);

  console.log(`\nDone. Now run:\n`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
  console.log();
};

const getTemplateDir = (type: string): string => {
  let templateDir = "templates";

  switch (type) {
    case "javascript":
      templateDir += "/template-js";
      break;
    case "typescript":
      templateDir += "/template-ts";
      break;
  }

  return path.resolve(parentDir, templateDir);
};

const copyDir = (dirPath: string, dirName: string): void => {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      if (file === "package-lock.json") {
        return;
      }

      fs.copyFileSync(filePath, path.join(dirName, file));
    } else if (fileStat.isDirectory()) {
      if (file === "node_modules") {
        return;
      }

      if (!fs.existsSync(path.join(dirName, file))) {
        fs.mkdirSync(path.join(dirName, file));
      }

      copyDir(filePath, path.join(dirName, file));
    }
  });
};

init().catch((e) => {
  console.error(e);
});
