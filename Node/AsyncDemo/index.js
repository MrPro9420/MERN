console.log("Start");
const user = getUserData(2, (user) => {
    getRepos(user.name, (repos) => {
        console.log(repos)
    })

});

function getUserData(id, callback) {
    setTimeout(() => {
        callback({ id: id, name: "Mosh" });
    }, 2000)
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log("fetching user data " + username);
        callback(["repo1", "repo2", "repo3"]);
    }, 2000)
}

console.log("END")