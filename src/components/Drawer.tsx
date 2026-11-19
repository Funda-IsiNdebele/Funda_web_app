import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@astryxdesign/core/Button";
import { Divider } from "@astryxdesign/core/Divider";
import { Drawer as AxDrawer } from "@astryxdesign/core/Drawer";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PLAY_STORE_URL, shareText } from "../share";

const EXTERNAL = [
  {
    title: "Animals names in IsiNdebele and English",
    subtitle: "Article by Makhosini Mahlangu",
    href: "https://www.academia.edu/40500080/ANIMAL_NAMES_IN_ISINDEBELE_NDZUNDZA_and_ENGLISH",
  },
  {
    title: "As'khumbuzaneni MaNdebele",
    subtitle: "Facebook Page",
    href: "https://web.facebook.com/groups/342738379180014/?multi_permalinks=4186896821430798",
  },
];

export default function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  async function share() {
    // shareText appends the web app link; the Android link is added for phone users.
    const result = await shareText(
      "Funda IsiNdebele",
      `Learn IsiNdebele with the Funda app.\nAndroid: ${PLAY_STORE_URL}`,
    );
    if (result === "copied") setStatus("Link copied");
    else if (result === "failed") setStatus("Couldn't share or copy");
    else return;
    setTimeout(() => setStatus(""), 2000);
  }

  return (
    <AxDrawer
      isOpen={open}
      onOpenChange={(o) => !o && onClose()}
      label="Menu"
      side="start"
      width={320}
    >
      <VStack gap={2} padding={4}>
        <Button
          label="Home"
          variant="ghost"
          onClick={() => {
            onClose();
            navigate("/home");
          }}
        />
        <Button
          label="Welcome page"
          variant="ghost"
          onClick={() => {
            onClose();
            navigate("/welcome");
          }}
        />
        <Button label="Share App" variant="ghost" icon={<Icon icon="copy" />} onClick={share} />
        {status && <Text type="supporting">{status}</Text>}
        <Divider />
        <Text type="supporting">Some Of The Sources:</Text>
        {EXTERNAL.map((e) => (
          <VStack key={e.href} gap={0.5}>
            <Button
              label={e.title}
              variant="ghost"
              href={e.href}
              target="_blank"
              rel="noreferrer"
            />
            <Text type="supporting">{e.subtitle}</Text>
          </VStack>
        ))}
        <VStack gap={0.5}>
          <Text type="label">Iziko Lamakhosi</Text>
          <Text type="supporting">Book - ISB 978-07960-4084-8</Text>
        </VStack>
        <VStack gap={0.5}>
          <Text type="label">Ndzundza Dynasty – kwaMahlangu</Text>
          <Text type="supporting">Book - ISBN 978-0-620-67362-4</Text>
        </VStack>
        <Divider />
        <Text type="supporting">App version 1.1.0</Text>
      </VStack>
    </AxDrawer>
  );
}
