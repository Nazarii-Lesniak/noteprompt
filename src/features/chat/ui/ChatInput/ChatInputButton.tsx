import { Button } from "@/components/ui/Button";

export interface ChatInputButtonProps {
  canSubmit: boolean;
  sendText: string;
}

export default function ChatInputButton({
  canSubmit,
  sendText,
}: ChatInputButtonProps) {
  return (
    <Button
      type="submit"
      disabled={!canSubmit}
      variant="primary"
      fullWidth={false}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-slate font-bold">{sendText}</span>
    </Button>
  );
}
