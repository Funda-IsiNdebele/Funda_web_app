import { useNavigate } from "react-router-dom";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ThemeToggle } from "../components/ThemeMode";
import { PLAY_STORE_URL } from "../share";
import { facts } from "../data/facts";

const FEATURES = [
  { title: "Wisdom", text: "Proverbs, idioms and riddles from the culture.", image: "/img/adio.jpg" },
  { title: "Animals", text: "Birds, herbivores, snakes, insects and more, with pictures.", image: "/img/aniaml.png" },
  { title: "Surnames", text: "Clan praise names (Imbongo) and what they mean.", image: "/img/ser.png" },
  { title: "Image Dictionary", text: "Planets, colours, body parts, kinship, food and attire.", image: "/img/image.png" },
  { title: "Basics", text: "Numbers, days, months, seasons, directions and time.", image: "/img/basic.png" },
  { title: "History", text: "Places, rivers, kings and traditional names.", image: "/img/his.png" },
];

const STEPS = [
  { n: "1", title: "Pick a topic", text: "Choose a section such as Animals, Basics or Wisdom." },
  { n: "2", title: "Tap to explore", text: "See the Ndebele word, its English meaning and a picture." },
  { n: "3", title: "Practise daily", text: "The 'Learn something new' card on the home screen shows a fresh word every few seconds." },
];

export default function Landing() {
  const navigate = useNavigate();
  const start = () => navigate("/home");

  return (
    <div className="landing">
      <header className="landing-hero">
        <div className="landing-toggle">
          <ThemeToggle />
        </div>
        <img className="landing-icon" src="/icon-192.png" alt="Funda IsiNdebele app icon" />
        <p className="hero-hello">Lotjhani! 👋</p>
        <h1>Funda IsiNdebele</h1>
        <p className="landing-lead">
          Learn Southern Ndebele one word at a time. Explore proverbs, animals, surnames, history and
          everyday vocabulary, with pictures to help you remember.
        </p>
        <HStack gap={3} wrap="wrap" hAlign="center">
          <Button
            label="Start learning"
            variant="primary"
            size="lg"
            endContent={<Icon icon="chevronRight" />}
            onClick={start}
          />
          <Button
            label="Get it on Google Play"
            size="lg"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            endContent={<Icon icon="externalLink" />}
          />
        </HStack>
      </header>

      <main className="landing-main">
        <section className="landing-section">
          <Heading level={2}>What is Funda?</Heading>
          <Text as="p" type="large">
            Funda means "learn". This app is a free companion for anyone who wants to learn isiNdebele,
            whether you are a learner, a parent, a teacher or someone reconnecting with the language. It
            works on your phone and on your computer.
          </Text>
        </section>

        <section className="landing-section">
          <Heading level={2}>What you can learn</Heading>
          <div className="landing-grid">
            {FEATURES.map((f) => (
              <Card key={f.title} padding={4} elevation="low">
                <HStack gap={3} vAlign="center">
                  <span className="tile-icon">
                    <img src={f.image} alt="" />
                  </span>
                  <VStack gap={0.5}>
                    <Heading level={4}>{f.title}</Heading>
                    <Text type="supporting">{f.text}</Text>
                  </VStack>
                </HStack>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <Heading level={2}>How it works</Heading>
          <div className="landing-grid steps">
            {STEPS.map((s) => (
              <Card key={s.n} padding={4}>
                <VStack gap={2}>
                  <span className="badge">{s.n}</span>
                  <Heading level={4}>{s.title}</Heading>
                  <Text type="supporting">{s.text}</Text>
                </VStack>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <Heading level={2}>Did you know? Facts about the Ndebele</Heading>
          <div className="landing-grid facts">
            {facts.map((f) => (
              <Card key={f.title} padding={4}>
                <VStack gap={2}>
                  <span className="fact-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <Heading level={4}>{f.title}</Heading>
                  <Text type="supporting">{f.body}</Text>
                </VStack>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing-cta">
          <Heading level={2}>Ready to start?</Heading>
          <Text as="p">Jump in and learn your first word today.</Text>
          <Button label="Start learning" variant="primary" size="lg" onClick={start} />
        </section>
      </main>
    </div>
  );
}
