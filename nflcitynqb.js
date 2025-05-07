document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('teamSelect');
    dropdown.addEventListener('change', () => {
        const teamID = dropdown.value;
        if (teamID) {
            fetchTeamData(teamID);
        }
    });
});

const teamMap = {
    "Chicago": 3,
    "Detroit": 8,
    "Green Bay": 9,
    "Minnesota": 16,
    "Baltimore": 33,
    "Cincinnati": 4, 
    "Cleveland": 5,
    "Pittsburgh": 23
};



function fetchTeamData(teamID) {
    console.log("Fetching team ID:", teamID);

    fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/${teamID}`)
        .then(response => response.json())
        .then(data => {
            displayTeam(data);
            if (data.leaders?.$ref) {
                leadersfetch(data.leaders.$ref);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function displayTeam(team) {
    const nflList = document.getElementById('nfl');
    nflList.innerHTML = "";

    const teamItem = document.createElement('div');
    teamItem.id = "team-block";

    const logo = team.logos?.[0]?.href || '';
    const displayName = team.displayName || 'Unnamed Team';
    const teamColor = team.color ? `#${team.color}` : '#333';

    teamItem.innerHTML = `
        <div style="background-color:${teamColor}; padding: 40px; border-radius: 10px; color: white; text-align: center;">
            <h2>${displayName}</h2>
            <img src="${logo}" alt="${displayName}" style="width: 120px;">
        </div>
    `;

    nflList.appendChild(teamItem);
}

function leadersfetch(leadersUrl) {
    fetch(leadersUrl.replace('http://', 'https://'))
        .then(res => res.json())
        .then(data => {
            const playerRef = data.categories[0]?.leaders[0]?.athlete?.$ref;
            if (playerRef) playerFetch(playerRef);
        })
        .catch(err => console.error('Leaders fetch error:', err));
}

function playerFetch(url) {
    fetch(url.replace('http://', 'https://'))
        .then(res => res.json())
        .then(data => {
            const fullName = data.fullName;
            const playerPicture = data.headshot?.href || '';
            const position = data.position.name;
            const age = data.age;

            const nflPlayerDiv = document.getElementById('nflPlayer');
            nflPlayerDiv.innerHTML = `
                <h2>${position}</h2>
                <img src="${playerPicture}" alt="${position}" style="width: 150px;">
                <p>${fullName}</p>
                <p>Age: ${age}</p>
            `;
        })
        .catch(err => console.error('Player fetch error:', err));
}
