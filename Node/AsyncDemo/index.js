console.log("Start");

// Callback hell
// getUserData(2, (user) => {
//     getRepos(user.name, (repos) => {
//         getCommits(repos[0], (repo) => {
//             console.log(user)
//             console.log(repo)
//             console.log("No commit")
//         })
//     })

// });

// Named function for resolving callback hell



// function displayUserData(user) {
//     getRepos(user.name, displayRepos);
// }

// function displayRepos(repos) {
//     getCommits(repos[0], displayCommits)
// }

// function displayCommits(repo) {

//     console.log(repo)
//     console.log("No commit")
// }

//Promises

// getUserData(2)
//     .then((user) => getRepos(user.name))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => { console.log(commits) })
//     .catch(err => console.log(err.message))


// Async and Await approch

async function displaycommits() {

    try {
        const user = await getUserData(1);
        const repos = await getRepos(user.name);
        const commits = await getCommits(repos[0]);
        console.log(commits)
    }
    catch (err) {
        console.log(err.message)
    }
}

displaycommits();






function getUserData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: id, name: "Mosh" });
        }, 2000)
    })

}

function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("fetching user data " + username);
            // resolve(["repo1", "repo2", "repo3"]);
            reject(new Error("No data Found"))
        }, 2000)

    })

}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching commits ...");
            resolve(repo);
        }, 3000)
    })

}

console.log("END")