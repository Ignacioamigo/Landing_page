/// <reference types="react" />

// Augments React.JSX.IntrinsicElements so <wistia-player> is recognised
// by TypeScript when using "jsx": "react-jsx" (React 19 / Next.js 16).
declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": {
        "media-id"?: string;
        aspect?: string | number;
        style?: import("react").CSSProperties;
        className?: string;
      };
    }
  }
}
