export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "4px solid rgba(0,0,0,0.1)",
          borderTopColor: "#333",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          `}
      </style>
    </div>
  );
}
