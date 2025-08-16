const fetchShortenedURL = async () => {
  const response = await fetch("/links");
  const links = await response.json();
  console.log("links", links);

  const list = document.getElementById("shortened-urls");
  list.innerHTML = "";
  for (const [shortCode, url] of Object.entries(links)) {
    const li = document.createElement("li");
    const truncatedURL = url.length >= 30 ? `${url.slice(0, 30)}...` : url;
    li.innerHTML = `<a href="/${shortCode}" target="blank">${window.location.origin}/${shortCode}</a> -${truncatedURL} `;
    list.appendChild(li);
  }
};

document
  .getElementById("shorten-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");
    console.log(url, shortCode);

    try {
      const response = await fetch("/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortCode }),
      });

      if (response.ok) {
        fetchShortenedURL();
        alert("form submitted successfully");
        event.target.reset();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  });

fetchShortenedURL();
