import {useCallback, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {Check, Copy} from "lucide-react";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    toast({
      description: "Copied to clipboard",
      duration: 2000,
    })
    setTimeout(() => setCopied(false), 2000)
  }, [textToCopy, toast])

  return (
    <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10">
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
