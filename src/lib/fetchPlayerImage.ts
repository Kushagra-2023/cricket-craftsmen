// src/lib/fetchPlayerImage.ts
export async function fetchPlayerImage(name: string): Promise<string> {
  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`
    );

    if (!res.ok) throw new Error("Network error");
    const data = await res.json();

    const image = data?.player?.[0]?.strThumb;
    return image || "/api/placeholder/150/150";
  } catch (err) {
    console.error(`Error fetching image for ${name}:`, err);
    return "/api/placeholder/150/150";
  }
}
