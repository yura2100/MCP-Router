import { TextReveal } from "@/components/magicui/text-reveal";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";

export function McpSection() {
  return (
    <section className="container -mb-[30vh] lg:mb-0 lg:grid lg:grid-cols-2">
      <div>
        <TextReveal>
          Model Context Protocol (MCP) is a standard for connecting AI to the systems where data lives, including content repositories, business tools, and development environments.
        </TextReveal>
      </div>
      <div className="relative -top-[30vh] lg:top-0">
        <div className="sticky top-0 flex items-center justify-center lg:h-screen">
          <Terminal>
            <TypingAnimation>&gt; Why MCP?</TypingAnimation>

            <AnimatedSpan delay={1500} className="text-green-500">
              <span>✔ One Integration</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2000} className="text-green-500">
              <span>✔ Real-Time</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2500} className="text-green-500">
              <span>✔ Two-Way Communication</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3000} className="text-green-500">
              <span>✔ Dynamic Discovery</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3500} className="text-green-500">
              <span>✔ Secure</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4000} className="text-green-500">
              <span>✔ Standardized</span>
            </AnimatedSpan>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
