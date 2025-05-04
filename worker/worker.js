addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "POST" && request.url.includes("/api/tts")) {
    const body = await request.json();
    const backendResponse = await fetch("https://your-render-backend.onrender.com/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("Method not allowed", { status: 405 });
}
