const select = document.getElementById("select-lg");
const imagesContainer = document.getElementById("images");

function genGithubUserContentUrl(len, file) {
	const repo =
		"https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/refs/heads/master";
	return `${repo}/${len}/${file}`;
}

const fetchImages = async (imgPath, lang) => {
	imagesContainer.innerHTML = "";

	const fetching = await fetch(imgPath, {});
	const { tree } = await fetching.json();

	for (const info of tree) {
		const img = document.createElement("img");

		// Path seria el nombre del archivo por ejemplo A++.png
		img.src = genGithubUserContentUrl(lang, info.path);

		imagesContainer.appendChild(img);
	}
};

function markLocation(selected) {
	console.log(selected);
	select.childNodes.forEach((e) => {
		if (selected === e.innerText) {
			e.dataset.select = "x";
			console.log("es");
		} else {
			e.dataset.select = "";
		}
	});
}

async function fetchLang() {
	const url =
		"https://api.github.com/repos/cat-milk/Anime-Girls-Holding-Programming-Books/git/trees/master";

	const fetching = await fetch(url, {});
	const { tree } = await fetching.json();

	// path = languaje
	tree.forEach(({ path, type, url }) => {
		// tree = directories
		if (type !== "tree") return;

		let li = document.createElement("li");
		li.dataset.select = "";
		li.textContent = path;
		li.addEventListener("click", () => {
			fetchImages(url, path);
			markLocation(path);
		});

		select.appendChild(li);
	});
}

fetchLang();
