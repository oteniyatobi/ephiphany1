// vite.config.ts
import { defineConfig } from "file:///C:/Users/oluwa/OneDrive/Desktop/Epiphany/epiphany-rw-connect/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/oluwa/OneDrive/Desktop/Epiphany/epiphany-rw-connect/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/oluwa/OneDrive/Desktop/Epiphany/epiphany-rw-connect/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\oluwa\\OneDrive\\Desktop\\Epiphany\\epiphany-rw-connect";
var spaFallback = () => {
  return {
    name: "spa-fallback",
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url && !req.url.includes(".") && !req.url.startsWith("/api") && req.url !== "/") {
            req.url = "/index.html";
          }
          next();
        });
      };
    }
  };
};
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    spaFallback()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  preview: {
    port: 8080
    // Vite preview server handles SPA routing automatically
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxvbHV3YVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXEVwaXBoYW55XFxcXGVwaXBoYW55LXJ3LWNvbm5lY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG9sdXdhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcRXBpcGhhbnlcXFxcZXBpcGhhbnktcnctY29ubmVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvb2x1d2EvT25lRHJpdmUvRGVza3RvcC9FcGlwaGFueS9lcGlwaGFueS1ydy1jb25uZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcclxuXHJcbi8vIFBsdWdpbiB0byBoYW5kbGUgU1BBIHJvdXRpbmcgaW4gZGV2IHNlcnZlclxyXG5jb25zdCBzcGFGYWxsYmFjayA9ICgpOiBQbHVnaW4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3BhLWZhbGxiYWNrJyxcclxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgICAgLy8gSWYgaXQncyBub3QgYSBmaWxlIHJlcXVlc3QgKG5vIGV4dGVuc2lvbikgYW5kIG5vdCByb290LCBzZXJ2ZSBpbmRleC5odG1sXHJcbiAgICAgICAgICBpZiAocmVxLnVybCAmJiAhcmVxLnVybC5pbmNsdWRlcygnLicpICYmICFyZXEudXJsLnN0YXJ0c1dpdGgoJy9hcGknKSAmJiByZXEudXJsICE9PSAnLycpIHtcclxuICAgICAgICAgICAgcmVxLnVybCA9ICcvaW5kZXguaHRtbCc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSwgXHJcbiAgICBtb2RlID09PSBcImRldmVsb3BtZW50XCIgJiYgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgICBzcGFGYWxsYmFjaygpXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcHJldmlldzoge1xyXG4gICAgcG9ydDogODA4MCxcclxuICAgIC8vIFZpdGUgcHJldmlldyBzZXJ2ZXIgaGFuZGxlcyBTUEEgcm91dGluZyBhdXRvbWF0aWNhbGx5XHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9YLFNBQVMsb0JBQTRCO0FBQ3paLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxjQUFjLE1BQWM7QUFDaEMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sZ0JBQWdCLFFBQVE7QUFDdEIsYUFBTyxNQUFNO0FBQ1gsZUFBTyxZQUFZLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUztBQUV6QyxjQUFJLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxXQUFXLE1BQU0sS0FBSyxJQUFJLFFBQVEsS0FBSztBQUN2RixnQkFBSSxNQUFNO0FBQUEsVUFDWjtBQUNBLGVBQUs7QUFBQSxRQUNQLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLFlBQVk7QUFBQSxFQUNkLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsRUFFUjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
