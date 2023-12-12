import { cn } from "@/helpers";
import { Dribbble, Facebook, Github, Instagram, Linkedin, Twitch, Youtube } from "lucide-react";
import Image from "next/image";

const SocialIcon: React.FunctionComponent<SocialIconProps> = ({ icon, className, ...props }) => {
  // Common size class for all icons
  const ICONSIZECLASS = "w-full h-full";

  return (
    <div className={cn("social-icon-wrapper w-4 h-4", className)} {...props}>
      {/* Conditionally rendering all the social icons based on IconType */}

      {/* 
        Conditional render for static SVG icon (X/Twitter)
        Description: X icon from public/icons/*
        Accessible from params: twitter, X
      */}
      {icon === "X" && <Image src="/icons/x-logo.svg" width={"24"} height={"24"} alt={icon} className="w-full h-full" />}

      {/* Conditional renders for Lucide icons */}

      {/* 
        Conditional render for Dribbble icon
        Description: Dribbble icon from lucide-react
        Accessible from params: dribble, dribbble
      */}
      {(icon === "dribble" || icon === "dribbble") && <Dribbble className={ICONSIZECLASS} />}

      {/* 
        Conditional render for GitHub icon
        Description: GitHub icon from lucide-react
        Accessible from params: github
      */}
      {icon === "github" && <Github className={ICONSIZECLASS} />}

      {/* 
        Conditional render for LinkedIn icon
        Description: LinkedIn icon from lucide-react
        Accessible from params: linkedin
      */}
      {icon === "linkedin" && <Linkedin className={ICONSIZECLASS} />}

      {/* 
        Conditional render for YouTube icon
        Description: YouTube icon from lucide-react
        Accessible from params: youtube
      */}
      {icon === "youtube" && <Youtube className={ICONSIZECLASS} />}

      {/* 
        Conditional render for Facebook icon
        Description: Facebook icon from lucide-react
        Accessible from params: facebook
      */}
      {icon === "facebook" && <Facebook className={ICONSIZECLASS} />}

      {/* 
        Conditional render for Twitch icon
        Description: Twitch icon from lucide-react
        Accessible from params: twitch
      */}
      {icon === "twitch" && <Twitch className={ICONSIZECLASS} />}

      {/* 
        Conditional render for Instagram icon
        Description: Instagram icon from lucide-react
        Accessible from params: instagram
      */}
      {icon === "instagram" && <Instagram className={ICONSIZECLASS} />}
    </div>
  );
};

export {
  SocialIcon
};
