import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" rx="14" fill="#0a0a0a" />

        <g transform="translate(-4 0)">
          {/* A outline (no crossbar) */}
          <path
            d="M20 48 L32 16 L44 48"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crossbar as rocket arrow (left edge of A → right/outside) */}
          <path
            d="M22 44 L54.7 31.6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon points="64 28 56.9 37.2 52.5 26.0" fill="#ffffff" />
        </g>
      </svg>
    ),
    size
  );
}

