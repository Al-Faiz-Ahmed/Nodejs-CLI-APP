import chalk from "chalk";
import {
  createPrompt,
  useState,
  useKeypress,
  isEnterKey,
  isBackspaceKey,
  isSpaceKey,
} from "@inquirer/core";
let blueChalk = chalk.hex("#2aa8f7");

const inputTextString = createPrompt((config, done) => {
    let {defaultVal = "my-next-js-app"} = config
  const [status, setStatus] = useState("pending");
  const [defaultValue, setDefaultValue] = useState(chalk.dim(` ${defaultVal}`));
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [prefix, setPrefix] = useState(blueChalk("?"));

  useKeypress((key, rl) => {
    if (isEnterKey(key)) {
      if (!errorMessage) {
        if (value === "" && defaultValue !== "") {
          setDefaultValue(blueChalk(` ${defaultVal}`));
          done(defaultVal);
          setPrefix(chalk.green("✓"));
        } else {
          setValue(blueChalk(value));
          setPrefix(chalk.green("✓"));
          done(value);
        }
      }
    } else if (isSpaceKey(key)) {
      rl.clearLine(1);
      if (!errorMessage) {
        setErrorMessage(
          `» ${chalk.italic.red("Name shouldn't contain spaces")}`
        );
      }
    } else if (key.name === "tab") {
      rl.clearLine(1);
      if (!errorMessage) {
        setErrorMessage(
          `» ${chalk.italic.red("Name shouldn't contain spaces")}`
        );
      }
    } else {
      setValue(rl.line);
      setErrorMessage("");
      if (rl.line === "") {
        setDefaultValue(chalk.dim(` ${defaultVal}`));
      } else if (defaultValue) {
        setDefaultValue("");
      }
    }
  });

  const message = chalk.bold(config.message);
  return [
    `${config.newLine ? "\n" : ""}${prefix} ${message}${defaultValue} ${value}`,
    errorMessage,
  ];
});

export default inputTextString;
