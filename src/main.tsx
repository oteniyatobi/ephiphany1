import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const isValidClientId = GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes("your_google_client_id");

const root = createRoot(document.getElementById("root")!);

if (isValidClientId) {
  root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
} else {
  console.warn("Google Client ID missing or invalid. Google Auth will be disabled.");
  root.render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  );
}
