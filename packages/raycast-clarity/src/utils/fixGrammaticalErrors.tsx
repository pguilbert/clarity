import path from "path";
import { PythonShell } from "python-shell";

export async function fixGrammaticalErrors(inputText: string) {
  const messages = await PythonShell.run(
    path.join(__dirname, "./assets/lib/use-grammarly-coedit-large.py"),
    {
      pythonPath: path.join(__dirname, "./assets/lib/.python-env/bin/python3"),
      args: [inputText],
    }
  );

  return messages[0] as string;
}
