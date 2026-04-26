// Global type declaration for the Wistia Web Component (<wistia-player>).
// This file has no imports so TypeScript treats it as an ambient module,
// making the declaration available across the entire project.
declare namespace JSX {
  interface IntrinsicElements {
    "wistia-player": {
      "media-id"?: string;
      aspect?: string | number;
      style?: { [key: string]: string | number };
      className?: string;
    };
  }
}
