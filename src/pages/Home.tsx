import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@astryxdesign/core/Button";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Heading } from "@astryxdesign/core/Heading";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import Drawer from "../components/Drawer";
import LearnCard from "../components/LearnCard";
import { ThemeToggle } from "../components/ThemeMode";
import { useInstall } from "../components/useInstall";

const ITEMS = [
  { title: "Wisdom", hint: "Proverbs & riddles", to: "/wisdom", image: "/img/adio.jpg" },
  { title: "Animals", hint: "Inlwane", to: "/animals", image: "/img/aniaml.png" },
  { title: "Surnames", hint: "Imbongo", to: "/surnames", image: "/img/ser.png" },
  { title: "Image Dictionary", hint: "Learn with pictures", to: "/dictionary", image: "/img/image.png" },
  { title: "Basics", hint: "Numbers, days, months", to: "/basics", image: "/img/basic.png" },
  { title: "History", hint: "Places, kings, names", to: "/history", image: "/img/his.png" },
];

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.epakameni.funda&hl=en_GB";

export default function Home() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { canInstall, install } = useInstall();
  return (
    <div className="home">
      <header className="hero">
        <button className="icon-btn" aria-label="Menu" onClick={() => setOpen(true)}>
          <Icon icon="menu" />
        </button>
        <img className="hero-icon" src="/icon-192.png" alt="" />
        <div>
          <p className="hero-hello">Lotjhani! 👋</p>
          <h1>Funda IsiNdebele</h1>
          <p className="hero-sub">What would you like to learn today?</p>
        </div>
        <div className="hero-toggle">
          {canInstall && (
            <Button label="Install app" variant="primary" size="sm" onClick={install} />
          )}
          <ThemeToggle />
        </div>
      </header>

      <LearnCard />

      <div className="grid">
        {ITEMS.map((i) => (
          <ClickableCard
            key={i.to}
            label={`${i.title}, ${i.hint}`}
            onClick={() => navigate(i.to)}
            elevation="low"
            padding={4}
          >
            <VStack gap={2}>
              <span className="tile-icon">
                <img src={i.image} alt="" />
              </span>
              <Heading level={4}>{i.title}</Heading>
              <Text type="supporting">{i.hint}</Text>
            </VStack>
          </ClickableCard>
        ))}
      </div>

      <div className="download">
        <img className="app-icon" src="/icon-192.png" alt="Funda IsiNdebele app icon" />
        <div className="download-text">
          <VStack gap={0.5}>
            <Text type="label" color="inherit">
              Get the Funda app
            </Text>
            <Text type="supporting" color="inherit">
              Learn offline on your phone
            </Text>
          </VStack>
        </div>
        <div className="download-actions">
          <Button
            label="Download on Google Play"
            variant="primary"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            endContent={<Icon icon="externalLink" />}
          />
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
