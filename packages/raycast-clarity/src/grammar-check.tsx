import { getSelectedText, Detail, ActionPanel, Action } from "@raycast/api";
import path from "path";
import { PythonShell } from "python-shell";
import { useAsync } from "react-async-hook";

async function fixGrammaticalErrors(inputText: string) {
  return new Promise<string>((resolve) => {
    console.log(path.join(__dirname, "../assets/lib/.python-env/bin/python3"));
    PythonShell.run(
      path.join(__dirname, "./assets/lib/use-grammarly-coedit-large.py"),
      {
        pythonPath: path.join(
          __dirname,
          "./assets/lib/.python-env/bin/python3"
        ),
        args: [inputText],
      }
    ).then((messages) => {
      // results is an array consisting of messages collected during execution
      resolve(messages[0] as string);
    });
  });
}

export default function Screen() {
  const { result: selectedText, loading: isBusyGettingSelectedText } = useAsync(
    getSelectedText,
    []
  );
  const { result: fixedText, loading: isBusyFixingText } =
    useAsync(async () => {
      if (selectedText) {
        return fixGrammaticalErrors(selectedText);
      }
    }, [selectedText]);

  const isBusy = isBusyGettingSelectedText || isBusyFixingText;

  return (
    <Detail
      markdown={isBusy ? "🤔" : fixedText}
      isLoading={isBusy}
      actions={
        <ActionPanel>
          <Action.Paste content={fixedText ?? selectedText ?? ""} />
        </ActionPanel>
      }
    ></Detail>
  );
}
