import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { loadRemoteItems, pickRandom, staticPool, type LearnItem } from "../learn";

/**
 * Seconds before moving to the next word. The meaning is never revealed automatically;
 * pressing "Show meaning" restarts the countdown so there is time to read it.
 */
const STEP_SECONDS = 8;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function LearnCard() {
  const navigate = useNavigate();
  const [pool, setPool] = useState<LearnItem[]>(staticPool);
  const [item, setItem] = useState<LearnItem>(() => pickRandom(staticPool));
  const [revealed, setRevealed] = useState(false);
  // Always auto-advances, except for visitors who asked their device to reduce motion.
  const [running] = useState(() => !prefersReducedMotion());

  // Mix in a random online category (animals, body parts, ...) when it loads.
  useEffect(() => {
    let alive = true;
    loadRemoteItems().then((extra) => {
      if (alive && extra.length) setPool([...staticPool, ...extra]);
    });
    return () => {
      alive = false;
    };
  }, []);

  const next = useCallback(() => {
    setItem((prev) => pickRandom(pool, prev));
    setRevealed(false);
  }, [pool]);

  // Auto-advance to the next word; the countdown restarts when the meaning is shown or hidden.
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(next, STEP_SECONDS * 1000);
    return () => clearTimeout(t);
  }, [running, revealed, item, next]);

  return (
    <div className="learn">
      <Card padding={5} elevation="med">
        <VStack gap={4}>
          <HStack gap={2} vAlign="center" justify="between">
            <Text type="label" color="accent">
              Learn something new
            </Text>
            <Badge label={item.topic} />
          </HStack>

          <div className="learn-slide" key={item.nd + item.topic} aria-live="polite">
            <HStack gap={4} vAlign="center">
              {item.image && <img className="learn-img" src={item.image} alt="" />}
              {item.hex && (
                <span className="learn-swatch" style={{ background: item.hex }} aria-hidden="true" />
              )}
              <VStack gap={1}>
                <Heading level={2}>{item.nd}</Heading>
                {revealed ? (
                  <Text type="large" color="secondary">
                    {item.en}
                  </Text>
                ) : (
                  <Text type="supporting">What does this mean in English?</Text>
                )}
              </VStack>
            </HStack>
          </div>

          <div
            className="learn-progress"
            data-running={running}
            aria-hidden="true"
          >
            {/* Restarts each time the word or its revealed state changes. */}
            <span
              key={`${item.nd}-${item.topic}-${revealed}-${running}`}
              style={{ "--step": `${STEP_SECONDS}s` } as CSSProperties}
            />
          </div>

          <HStack gap={2} wrap="wrap">
            <Button
              label={revealed ? "Hide meaning" : "Show meaning"}
              variant="primary"
              onClick={() => setRevealed((r) => !r)}
            />
            <Button label="Next word" onClick={next} />
            <Button label={`More ${item.topic}`} variant="ghost" onClick={() => navigate(item.to)} />
          </HStack>
        </VStack>
      </Card>
    </div>
  );
}
