import chalk from "chalk";
import cliCursor from "cli-cursor";
import {
  createPrompt,
  useState,
  useKeypress,
  isEnterKey,
} from "@inquirer/core";

let blueChalk = chalk.hex("#2aa8f7");


let confirmPrompt = createPrompt((config, done) => {
  cliCursor.hide();
  const [status, setStatus] = useState("pending");
  // const [defaultValue, setDefaultValue] = useState(
  //   chalk.dim(" my-next-js-app")
  // );
  const [value, setValue] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(undefined);
  const [prefix, setPrefix] = useState(blueChalk("?"));

  useKeypress((key, rl) => {
    const keys = ["up", "down", "right", "left", "tab", "space"];
    if (isEnterKey(key)) {
      setPrefix(chalk.green("✓"));
      done(value);
    } else if (keys.includes(key.name)) {
      rl.clearLine(1);
      setValue(!value);
    } else {
      rl.clearLine(1);
    }
  });

  let formattedValue = "";
  if (value) {
    formattedValue = `${chalk.dim("»")} No / ${blueChalk.underline("Yes")}`;
  } else {
    formattedValue = `${chalk.dim("»")} ${blueChalk.underline("No")} / Yes`;
  }

  const message = chalk.bold(config.message);
  return `${config.newLine ? "\n" : ""}${prefix} ${message} ${formattedValue}`;
});

export default confirmPrompt;
