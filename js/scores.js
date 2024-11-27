function scores() {
    const nbaAPI = 'https://site.web.api.espn.com/apis/personalized/v2/scoreboard/header?sport=basketball&league=nba&region=us&lang=en&contentorigin=espn&configuration=SITE_DEFAULT&platform=web&buyWindow=1m&showAirings=buy%2Clive%2Creplay&showZipLookup=true&tz=America%2FNew_York&postalCode=95973';
    const nflAPI = 'https://site.web.api.espn.com/apis/personalized/v2/scoreboard/header?sport=football&league=nfl&region=us&lang=en&contentorigin=espn&configuration=SITE_DEFAULT&platform=web&buyWindow=1m&showAirings=buy%2Clive%2Creplay&showZipLookup=true&tz=America%2FNew_York&postalCode=95973'
    return Promise.all([
          fetch(nbaAPI).then(res => res.json()),
          fetch(nflAPI).then(res => res.json())
    ])

  }
  scores().then(([nba, nfl]) => {
      const espn = nba.sports[0].leagues[0].events;
      const nflf = nfl.sports[0].leagues[0].events;
      console.log('nfl', nflf);
      console.log('nba', espn);
      const targetDiv = document.getElementsByClassName("scoreboard nba")[0];
      const targetDiv2 = document.getElementsByClassName('scoreboard nfl')[0];
      espn.forEach(gameId => {
          const gameLocation = gameId.location;
          const teams = gameId.shortName;
          const startingOdds = gameId.odds.details;
          const awayFav = gameId.odds.awayTeamOdds.favorite;
          console.log('isawayfav', awayFav)
          let color;
          let altColor;
          if (awayFav) {
            color = gameId.competitors[0].color;
            altColor = gameId.competitors[0].alternateColor;
          } else {
            color = gameId.competitors[1].color;
            altColor = gameId.competitors[1].alternateColor;
          }


          // Create contiainer div (game)
          const newDiv = document.createElement('div');
          newDiv.className = 'game';
          newDiv.style.backgroundColor = `#${color}`;
          targetDiv.appendChild(newDiv);

          // Create teams div to display teams
          const teamNames = document.createElement('div');
          teamNames.className = 'team-names';
          teamNames.innerText = teams;
          teamNames.style.color = `#${altColor}`
          newDiv.appendChild(teamNames);

          // Create odds div to show odds
          const odds = document.createElement('div');
          odds.className = 'odds';
          odds.innerText = startingOdds;
          odds.style.color = `#${altColor}`
          newDiv.appendChild(odds);
      });
      nflf.forEach(gameId => {
          const gameLocation = gameId.location;
          const teams = gameId.shortName;
          const startingOdds = gameId.odds.details;

          // Create container div (game)
          const newDiv = document.createElement('div');
          targetDiv2.appendChild(newDiv);
          newDiv.className = 'game';

          // Create teams div to display teams
          const teamNames = document.createElement('div');
          teamNames.className = 'team-names';
          teamNames.innerText = teams;
          newDiv.appendChild(teamNames)

          // Create odds div to show odds
          const odds = document.createElement('div');
          odds.className = 'odds';
          odds.innerText = startingOdds;
          newDiv.appendChild(odds);


      });
  })
  .catch(error => console.log('error', error));
