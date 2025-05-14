import { getSelectedText, Detail, ActionPanel, Action } from "@raycast/api";
import path from "path";
import { PythonShell } from "python-shell";
import { useEffect, useState } from "react";

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
  const [selectedText, setSelectedText] = useState<string | null>(null);
  useEffect(() => {
    getSelectedText().then((r) => setSelectedText(r));
  }, []);

  const [result, setResult] = useState<string | null>(null);
  const isBusy = !result;
  useEffect(() => {
    if (selectedText) {
      fixGrammaticalErrors(selectedText).then((r) => setResult(r));
    }
  }, [selectedText]);

  return (
    <Detail
      markdown={isBusy ? "🤔" : result}
      isLoading={isBusy}
      actions={
        <ActionPanel>
          <Action.Paste content={result ?? selectedText ?? ""} />
        </ActionPanel>
      }
    ></Detail>
  );
}
