const searchInput = document.querySelector("#search-input");
const viewButton = document.querySelector("#view-button");
const darkLightButton = document.querySelector(".dark-light-button");

const username = document.querySelector("#username");
const profileImage = document.querySelector("#profile-image");
const posts = document.querySelector("#posts");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const fullname = document.querySelector("#fullname");
const bio = document.querySelector("#bio");

const API_KEY = "acd39e5a8cmshf574c03aa00913ep119160jsn3d85b6c8dd8f";
const API_HOST = "instagram-scraper-api2.p.rapidapi.com";
// const API_KEY = process.env.API_KEY;
// const API_HOST = process.env.API_HOST;

const loading = document.querySelector(".loading");
loading.style.display = "none";

const changeTheme = () => {
  if (document.body.getAttribute("data-color-scheme") === "dark") {
    document.body.setAttribute("data-color-scheme", "light");
    darkLightButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>`;
  } else {
    document.body.setAttribute("data-color-scheme", "dark");
    darkLightButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>
    `;
  }
};

const fetchData = async (username) => {
  loading.style.display = "flex";

  const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.data;

    renderUserProfile(
      data.username,
      data.profile_pic_url_hd,
      data.media_count,
      data.follower_count,
      data.following_count,
      data.full_name,
      data.biography
    );
  } catch (error) {
    console.error(error);
  } finally {
    loading.style.display = "none";
  }
};

const renderUserProfile = (
  newUsername,
  newProfileImage,
  newPosts,
  newFollowers,
  newFollowing,
  newFullname,
  newBio
) => {
  username.innerText = newUsername;
  profileImage.innerHTML = `
<img src=${newProfileImage} alt=""/>
`;
  posts.innerText = newPosts;
  followers.innerText = newFollowers;
  following.innerText = newFollowing;
  fullname.innerText = newFullname;
  bio.innerText = newBio;
  viewButton.href = newProfileImage;
};

const downloadImage = () => {
  const imageUrl = document.querySelector("#profile-image img").src;
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image.jpg";
      link.click();
    })
    .catch((error) => {
      console.error("Failed to download image:", error);
    });
};

const handleSearchUrl = () => {
  event.preventDefault();
  fetchData(searchInput.value);
  location.href = "#view-and-download";
};
