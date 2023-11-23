// fetch => GET

let usersList = document.querySelector("#albums");
let photosList = document.querySelector("#photos");

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

if (id) {
    fetch("https://jsonplaceholder.typicode.com/albums/" + id).then((res) =>
        res.json().then((album) => {
            fetch(
                `https://jsonplaceholder.typicode.com/photos?_limit=50&_start=${
                    album.id * 50 - 50
                }&albumId + ${album.id}`
            )
                .then((res) => res.json())
                .then((photos) => {
                    photos.forEach((photo) => {
                        let img = document.createElement("img");
                        img.setAttribute("src", photo.url);
                        img.style.maxWidth = "100%";
                        img.style.maxHeight = "auto";
                        img.style.objectFit = "contain"
                        let a = document.createElement("a");
                        a.innerText = photo.title;
                        a.setAttribute("href", `/?id=${photo.id}`);
                        photosList.append(img, a);
                    });
                });
        })
    );
} else {
    fetch("https://jsonplaceholder.typicode.com/albums")
        .then((res) => res.json())
        .then((albums) => {
            albums.forEach((album) => {
                let wrapperDiv = document.createElement("div");
                let albumNumber = document.createElement("h4");
                let albumTitle = document.createElement("p");
                let viewBtn = document.createElement("a");

                viewBtn.classList.add("btn", "btn-primary");
                viewBtn.setAttribute("href", `/?id=${album.id}`);
                viewBtn.innerText = "View photos";
                wrapperDiv.classList.add(
                    "d-flex",
                    "gap-3",
                    "border",
                    "justify-content-between",
                    "align-items-center"
                );
                usersList.classList.add("container");
                albumNumber.innerText = album.id;
                albumTitle.innerText = album.title;

                wrapperDiv.append(albumNumber, albumTitle, viewBtn);
                usersList.append(wrapperDiv);
            });
        });
}
