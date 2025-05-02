document.addEventListener('DOMContentLoaded', fetchTeamData);
let randTeamId = Math.floor(Math.random() * 30) + 1;
let randomPosition = Math.floor(Math.random() * 3) + 1;
function fetchTeamData() {
    
    
    console.log("Fetching team ID:", randTeamId);
    
    fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/${randTeamId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Team not found');
            }
            return response.json();
        })
        .then(data => {
            displayTeam(data);
            if (data.leaders?.$ref) {
                // fetchLeaders(data.leaders.$ref);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function displayTeam(team) {
    const nflList = document.getElementById('nfl');
    nflList.innerHTML = ""; // Clear any previous team info

    const teamItem = document.createElement('div');
    teamItem.id = "team-block";

    const logo = team.logos?.[0]?.href || '';
    const displayName = team.displayName || 'Unnamed Team';
    const teamColor = team.color ? `#${team.color}` : '#333';
    const leaders = team.leaders.$ref;

    teamItem.innerHTML = `
        <div style="background-color:${teamColor}; padding: 100px; border-radius: 10px; color: white; text-align: center; max-width: 500px; margin-bottom: 20px;">
            <h2>${displayName}</h2>
            <img src="${logo}" alt="${displayName}" style="width: 150px;">
         
    `;

    nflList.appendChild(teamItem);
    leadersfetch(leaders);
}

function leadersfetch(leaders) {
    fetch(`${leaders}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Team not found');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);

            const playerData = data.categories[randomPosition].leaders[0].athlete.$ref;

            playerFetch(playerData);

            //console.log(data.categories[0].leaders[0].athlete.$ref);
            // displayTeam(data);
            // if (data.leaders?.$ref) {
            //     fetchLeaders(data.leaders.$ref);
            // }
        })

        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function playerFetch(playerData) {

    fetch(`${playerData}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Team not found');
            }
            return response.json();
        })
        .then(data => {
            // displayTeam(data);
            // if (data.leaders?.$ref) {
            //     // fetchLeaders(data.leaders.$ref);
            // }



            const fullName = data.fullName;
            const playerPicture = data.headshot.href
            const position = data.position.name;
            const age= data.age;
            console.log(data.fullName);

            const nflList = document.getElementById('nflPlayer');
            nflList.innerHTML = ""; // Clear any previous team info

            const teamItem = document.createElement('div');

            teamItem.innerHTML = `
       <h2>${position}</h2>
        <img src="${playerPicture}" alt="${position}" style="width: 150px;">
       <p>${fullName}<p>
       <p>age: ${age}<p>

       
    `;

            nflList.appendChild(teamItem);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}







