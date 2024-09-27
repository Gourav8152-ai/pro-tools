import ToolPage from "../components/ToolPage";

export default function ReframeSentence() {
  return (
    <ToolPage
      title="Reframe Sentence"
      description="Enter a sentence, and we'll reframe it with proper grammar."
      tool="reframe-sentence"
      inputLabel="Enter your sentence to reframe:"
    />
  );
}
