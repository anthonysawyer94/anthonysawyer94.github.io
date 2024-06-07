const url = 'https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2023-24&SeasonType=Regular%20Season&StatCategory=PTS';

fetch(url)
    .then(response => response.json())
    .then(data => {

        console.log(data);

    })