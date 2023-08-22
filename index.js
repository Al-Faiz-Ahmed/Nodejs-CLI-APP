import confirmPrompt from "./confirmPrompt.js";
import inputPrompt from "./inputPrompt.js";
import selectPrompt from "./selectPrompts.js";
import chalk from "chalk";
let blueChalk = chalk.hex("#2aa8f7");

async function config() {
  const prompts = {
    appName: "",
    esLint: false,
    language: "JavaScript",
    tailwind: false,
    srcDir: false,
    appRouter: false,
    alias: false,
    aliasName: "",
  };

  let choices = [
    {
      value: "JavaScript",
    },
    {
      value: "Typescript",
    },
  ];
  prompts.appName = await inputPrompt({
    message: `What is your ${blueChalk("Next-JS")} project named?`,
    newLine: true,
  });
  prompts.language = await selectPrompt({
    message: "Select Language Style",
    choices,
  });
  prompts.esLint = await confirmPrompt({
    message: `Would you like to use ${blueChalk("ES-Lint")}?`,
  });
  prompts.tailwind = await confirmPrompt({
    message: `Would you like to use ${blueChalk("Tailwind CSS")}?`,
  });
  prompts.srcDir = await confirmPrompt({
    message: `Would you like to use ${blueChalk("`src/` directory")}?`,
  });
  prompts.appRouter = await confirmPrompt({
    message: `Would you like to use ${blueChalk("App Router")}? (recommended)`,
  });
  prompts.alias = await confirmPrompt({
    message: `Would you like to use ${blueChalk("import alias")}?`,
  });
  if (prompts.alias) {
    prompts.aliasName = await inputPrompt({
      message: `Would you like to customize the default ${blueChalk(
        "import alias"
      )}?`,
      defaultVal: "@/*",
    });
  }
  console.log(prompts);
  return prompts;
}

const selectedPrompts = config();
