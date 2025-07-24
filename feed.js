require('dotenv').config();

async function getEvents() {
  try {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Start from tomorrow
    const isoDate = now.toISOString().split('.')[0] + 'Z';

    const response = await fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=Atlanta&start_date.range_start=${isoDate}`, {
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`
      }
    });

    const data = await response.json();
    console.log('Raw response:', data);

    const events = Array.isArray(data.events)
      ? data.events.map(evt => ({
          name: evt.name?.text,
          start: evt.start?.local,
          url: evt.url
        }))
      : [];

    console.log('Upcoming Events in Atlanta:\n', events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
}

getEvents();



