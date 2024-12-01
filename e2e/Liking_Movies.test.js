Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('No Favorite Restaurants', '.empty-favorites');
});

Scenario('liking and unliking a restaurant', async ({ I }) => {
  // Like restaurant
  I.see('Explore Restaurants', '.restaurant-list-title');
  I.click(locate('.restaurant-card').first());

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  // Verify restaurant is liked
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-card');

  // Unlike restaurant
  I.click(locate('.restaurant-card').first());
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  // Verify restaurant is removed from favorites
  I.amOnPage('/#/favorite');
  I.see('No Favorite Restaurants', '.empty-favorites');
});