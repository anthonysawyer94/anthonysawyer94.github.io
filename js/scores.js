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
      console.log(espn);
      const targetDiv = document.getElementsByClassName("scoreboard nba")[0];
      const targetDiv2 = document.getElementsByClassName('scoreboard nfl')[0];
      espn.forEach(gameId => {
          const gameLocation = gameId.location;
          const teams = gameId.shortName;
          const startingOdds = gameId.odds.details;
          console.log('nba', teams, startingOdds);
          const newDiv = document.createElement('div');
          targetDiv.appendChild(newDiv);
          newDiv.className = 'game';
          newDiv.innerText = teams;
          console.log('new div', newDiv);
          const odds = document.createElement('div');
          newDiv.appendChild(odds);
          odds.className = 'odds';
          odds.innerText = startingOdds;
      });
      nflf.forEach(gameId => {
          const gameLocation = gameId.location;
          const teams = gameId.shortName;
          const startingOdds = gameId.odds.details;
          console.log('nfl', teams, startingOdds);
          const newDiv = document.createElement('div');
          targetDiv2.appendChild(newDiv);
          newDiv.className = 'game';
          newDiv.innerText = teams;
          console.log('new div', newDiv);
          const odds = document.createElement('div');
          newDiv.appendChild(odds);
          odds.className = 'odds';
          odds.innerText = startingOdds;


      });
  })
  .catch(error => console.log('error', error));
