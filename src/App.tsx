import { useState } from "react";

export default function App() {
  const [color, setColor] = useState("");

  async function handleClick() {
    const [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color: string) => {
        document.body.style.backgroundColor = color;
      },
    });
  }

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div>BG Changer Extension</div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
