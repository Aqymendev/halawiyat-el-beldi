import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#120d0c",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16
        }}
      >
        <div
          style={{
            width: 36,
            height: 44,
            borderRadius: "999px 999px 10px 10px",
            border: "3px solid #c8a35a",
            color: "#ecdcb8",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700
          }}
        >
          H
        </div>
      </div>
    ),
    size
  );
}
