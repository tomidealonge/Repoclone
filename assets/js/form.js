// Form Section
const input = document.querySelector('.input-username')
const btn = document.querySelector('.btn-signin')
const form = document.querySelector('#profileForm')

// github data
let username
const githubData = {
    token: atob("Z2hwX2lITVNQNkFTbmRUdFNiaXlXT2pXWGE2b3U4Z1pEWjBFNXEyTA=="),
    baseUrl: "https://api.github.com/graphql"
}

const headers = {
    "Content-Type": "application/json",
    authorization: `token ${githubData.token}`,
}


const fetchProfile = () => {
    btn.innerHTML = '<div class="loader form"></div>'
    btn.disabled = true
    fetch(githubData.baseUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                query: `
                            query {
                                user(login: "${username}"){
                                    avatarUrl,
                                    bio,
                                    following {
                                    totalCount
                                    },
                                    followers{
                                    totalCount
                                    },
                                    starredRepositories{
                                    totalCount
                                    },
                                    status{
                                    emojiHTML,
                                    message
                                    },
                                    bio,
                                    name,
                                    login,
                                    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, ownerAffiliations: OWNER){
                                    nodes {
                                        name,
                                        url,
                                        isPrivate,
                                        updatedAt,
                                        forkCount,
                                        viewerHasStarred,
                                        stargazerCount,
                                        descriptionHTML,
                                        description,
                                        primaryLanguage {
                                        name
                                        color
                                        }
                                    },
                                    totalCount
                                    }
                                }
                                }
                `
            })
        })
        .then((res) => res.json())
        .then(({ data }) => {
            btn.innerHTML = 'View Profile'
            btn.disabled = false
            if (data.user) {
                localStorage.setItem('data', JSON.stringify(data))
                input.value = ''
                window.location.href = '/your-repository.html'
            } else {
                console.log('Not found')
            }
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    username = input.value
    fetchProfile()
})