Feature('Adding Reviews');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('adding a review to a restaurant', async ({ I }) => {
  // Navigate to a restaurant detail page
  I.see('Explore Restaurants', '.restaurant-list-title');
  I.click(locate('.restaurant-card').first());

  // Fill out the review form
  I.fillField('#reviewName', 'Test User');
  I.fillField('#reviewText', 'This is a test review.');

  // Submit the review
  I.click('button[type="submit"]');

  // Verify the review appears in the list of reviews
  I.see('Test User', '.review-card');
  I.see('This is a test review.', '.review-card');
});