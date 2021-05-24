// Navbar Toggle
const hamburger = document.querySelector('.hamburger')
const navBody = document.querySelector('.header-flex')

hamburger.addEventListener('click', () => {
    navBody.classList.toggle('open')
})

// Closing all details on click anywhere on screen
const screen = document.querySelector('.screen')
const allDetails = document.querySelectorAll('details')
screen.addEventListener('click', () => {
    allDetails.forEach((detail) => {
        detail.open = false
    })
})


// token
const token = atob("Z2hwX2lITVNQNkFTbmRUdFNiaXlXT2pXWGE2b3U4Z1pEWjBFNXEyTA==")

const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type": "application/json",
    authorization: `token ${token}`,
}

// Profile;
const profileImg = document.querySelectorAll('.profile-img')
const handle = document.querySelectorAll('.handle-el')
const name = document.querySelectorAll('.name')
const repos = document.querySelector('#repos')
const repoNumber = document.querySelectorAll('.repo-number')
const image = document.querySelector('.profile-image-small-wrapper')

const updatedSince = (date) => {
    var secs = Math.floor((new Date() - date) / 1000);

    // To know if its more than a year since updated
    var since = secs / 31536000;
    if (since > 1) {
        return `${Math.floor(since)} ${(Math.floor(since) == 1 ? " year ago" : " years ago")}`;
    }

    // To know if its more than a month since updated
    since = secs / 2592000;
    if (since > 1) {
        return `${Math.floor(since)} ${(Math.floor(since) == 1 ? " month ago" : " months ago")}`;
    }

    // To know if its been days since updated
    since = secs / 86400;
    if (since > 1) {
        return `${Math.floor(since)} ${(Math.floor(since) == 1 ? " day ago" : " days ago")}`;
    }

    // To know if its been hours since updated
    since = secs / 3600;
    if (since > 1) {
        return `${Math.floor(since)} ${(Math.floor(since) == 1 ? " hour ago" : " hours ago")}`;
    }

    // To know if its been minutes since updated
    since = secs / 60;
    if (since > 1) {
        return `${Math.floor(since)} ${(Math.floor(since) == 1 ? " minute ago" : " minutes ago")}`;
    }

    // To know if its been seconds since updated
    return `${Math.floor(secs)} ${(Math.floor(since) == 1 ? " second ago" : " seconds ago")}`;
}

window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 352) {
        image.style.opacity = '1';
    } else {
        image.style.opacity = '0';
    }
});

fetch(baseUrl, {
        method: "POST",
        headers: headers,
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            query: `
            query {
                viewer {
                    avatarUrl
                    bio
                    name
                    login
                    status {
                        emojiHTML
                        message
                    }
                    repositories(first: 20,orderBy: {field: UPDATED_AT, direction: DESC}) {
                            nodes {
                            name
                            url
                            updatedAt
                            isPrivate
                            primaryLanguage {
                                name
                                color
                            }
                            stargazerCount
                            forkCount
                            descriptionHTML
                            description
                        }
                        totalCount
                    }
                }
            } 
             
        `
        })
    })
    .then((res) => res.json())
    .then(({ data }) => {
        profileImg.forEach((img) => {
            img.style.backgroundImage = `url(${data.viewer.avatarUrl})`
        })
        handle.forEach((handle) => {
            handle.textContent = data.viewer.login
        })
        name.textContent = data.viewer.name
        repoNumber.forEach((num) => num.textContent = data.viewer.repositories.nodes.length)
        const reposArray = data.viewer.repositories.nodes.map((repo) => {
            let flex = ''
            if (repo.flexCount > 0) {
                flex = `<div class="stat-flex">
                                <svg aria-label="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16"        height="16" role="img">
                                        <path fill-rule="evenodd"
                                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                                        </path>
                                    </svg>
                                    <p>${repo.flexCount}</p>
                            </div>`
            }
            let starGaze = ''
            if (repo.stargazerCount > 0) {
                starGaze = `<div class="stat-flex">
                                    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                                    <p>${repo.stargazerCount}</p>
                                </div>`
            }
            let isPrivate = ''
            if (repo.isPrivate) {
                isPrivate = '<button class="repo-tag">Private</button>'
            }
            let description = ''
            if (repo.description) {
                description = `<p class="mb-12">${repo.description}</p>`
            }
            return `<div class="repo-desc-flex">
                        <div class="repo-desc-block">
                            <div class="repo-name-flex">
                                <a class="-mb-6" href="#"><h2>${repo.name}</h2></a>
                                ${isPrivate}
                            </div>
                            ${description}
                            <div class="repo-stats-flex">
                                <div class="stat-flex">
                                    <div style="background-color:${repo.primaryLanguage.color};" class="language-used"></div>
                                    <p>${repo.primaryLanguage.name}</p>
                                </div>
                                ${flex}
                                ${starGaze}
                                <div class="stat-flex">
                                    <p class="small">Updated ${updatedSince(new Date(repo.updatedAt))}</p>
                                </div>
                            </div>
                        </div>
                        <button class="stars">
                            <!-- <div class="icon star"></div> -->
                            <svg class="icon mr-5" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                                </path>
                            </svg>
                            <div>Star</div>
                        </button>
                    </div>`
        }).join('')
        repos.innerHTML = reposArray
    })