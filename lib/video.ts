export function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v") ?? u.pathname.split("/embed/")[1];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    // Vimeo: vimeo.com/ID
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}