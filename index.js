const Kafka = require('node-rdkafka');

const Event = require('./Event');

const producer = new Kafka.Producer({
  'metadata.broker.list': 'localhost:9092',
  dr_cb: true
});

const topicName = 'topic';

class UserCreatedEvent extends Event {
  constructor(payload) {
    super(payload);
  }
}

const userCreated = new UserCreatedEvent({
  user: 'Tom',
  birthday: new Date('1991-10-16')
});

//Wait for the ready event before producing
producer.on('ready', arg => {
  console.log('Connected to Kafka, producer ready.' + JSON.stringify(arg));

  try {
    // convert our event into a Buffer
    const buffer = new Buffer.from(JSON.stringify(userCreated));

    setInterval(() => {
      producer.produce(
        topicName,
        null,
        Buffer.from(buffer),
        // for keyed messages, we also specify the key - note that this field is optional
        userCreated.id,
        Date.now()
      );

      console.log('Sending message...');
    }, 5000);
  } catch (err) {
    console.error('A problem occurred when sending our message');
    console.error(err);
  }
});

// Any errors we encounter, including connection errors
producer.on('event.error', err => {
  console.error('Error from producer');
  console.error(err);
});

//starting the producer
producer.connect();
