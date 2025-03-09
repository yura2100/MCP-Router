import Image from "next/image";
import aws from "@/public/icons/aws.svg";
import github from "@/public/icons/github.svg";
import jira from "@/public/icons/jira.svg";
import notion from "@/public/icons/notion.svg";
import slack from "@/public/icons/slack.svg";

const icons = {
  aws,
  github,
  jira,
  notion,
  slack,
};

type ServerIconProps = {
  slug: string;
};

export function ServerIcon({ slug }: ServerIconProps) {
  const icon = icons[slug as keyof typeof icons];
  return (
    <div className="size-11 flex items-center justify-center rounded-lg dark:bg-foreground">
      <Image
        className="size-8 text-primary"
        src={icon}
        alt={slug}
        width={50}
        height={50}
      />
    </div>
  );
}
