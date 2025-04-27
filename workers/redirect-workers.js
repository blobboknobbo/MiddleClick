export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve the HTML form
    if (url.pathname === "/") {
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Link Redirect Generator</title>
            <script>
              function validateForm(event) {
                const imageUrl = document.getElementById("imageUrl").value.trim();
                const validExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
                
                if (imageUrl && !validExtensions.test(imageUrl)) {
                  const proceed = confirm("⚠️ Warning: The image link doesn't look like a direct image (jpg, png, gif, webp).\\n\\nPress OK to continue, or Cancel to go back and fix it.");
                  if (!proceed) {
                    event.preventDefault(); // Stop the form if user cancels
                  }
                }
              }
            </script>
          </head>
          <body>
            <h1>Link Redirect Generator</h1>
            <form action="/create-link" method="GET" onsubmit="validateForm(event)">
              <label for="targetUrl">Enter the URL to redirect to:</label><br>
              <input type="text" id="targetUrl" name="targetUrl" placeholder="https://your-link.com" required /><br><br>

              <label for="imageUrl">Enter an optional image URL (jpg, png, gif, webp):</label><br>
              <input type="text" id="imageUrl" name="imageUrl" placeholder="(optional) https://example.com/image.jpg" /><br><br>

              <input type="submit" value="Generate Redirect Link" />
            </form>
          </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    }

    // Handle form submission (generate link)
    if (url.pathname === "/create-link" && url.searchParams.has("targetUrl")) {
      const targetUrl = url.searchParams.get("targetUrl");
      const imageUrl = url.searchParams.get("imageUrl") || "";

      // Build the full generated link
      let generatedLink = `https://INSERT-WORKER-LINK/image.jpg?target=${encodeURIComponent(targetUrl)}`;
      if (imageUrl.trim() !== "") {
        generatedLink += `&image=${encodeURIComponent(imageUrl)}`;
      }

      return new Response(`
        <html>
          <body>
            <h1>Generated Link</h1>
            <p>Here is your embeddable link:</p>
            <p><code>${generatedLink}</code></p>
            <p>When this link is opened, it will redirect you to:<br>${targetUrl}</p>
            <p><a href="/">Back to Generator</a></p>
          </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    }

    // Handle serving the image and redirect logic
    if (url.pathname === "/image.jpg" && url.searchParams.has("target")) {
      let targetUrl = url.searchParams.get("target");
      let imageUrl = url.searchParams.get("image") || "INSERT DEFAULT IMAGE";

      // Add https:// automatically if missing (unless it's a special scheme)
      if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(targetUrl)) {
        targetUrl = "https://" + targetUrl;
      }

      // Detect bots (Discord, Twitter, etc.)
      const userAgent = request.headers.get("user-agent") || "";
      const isBot = /Discord|Twitterbot|Slackbot|facebookexternalhit|WhatsApp|TelegramBot|LinkedInBot/i.test(userAgent);

      if (isBot) {
        const imageResponse = await fetch(imageUrl);
        return new Response(imageResponse.body, {
          headers: {
            "Content-Type": "image/jpeg", // You could make this smarter later
            "Cache-Control": "public, max-age=86400"
          }
        });
      } else {
        return Response.redirect(targetUrl, 302);
      }
    }

    // Default 404
    return new Response("Not Found", { status: 404 });
  }
};
