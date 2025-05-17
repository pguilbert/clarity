import { getSelectedText, Detail, ActionPanel, Action } from "@raycast/api";
import { useAsync } from "react-async-hook";
import { fixGrammaticalErrors } from "./utils/fixGrammaticalErrors";

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
