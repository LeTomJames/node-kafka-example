const Kafka = require('node-rdkafka');

const consumer = new Kafka.KafkaConsumer(
  {
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    offset_commit_cb: (err, topicPartitions) => {
      if (err) {
        // There was an error committing
        console.error(err);
      } else {
        // Commit went through. Let's log the topic partitions
        // console.log(topicPartitions);
      }
    }
  },
  {}
);

consumer.connect();

consumer
  .on('ready', function() {
    consumer.subscribe(['topic']);
    console.log('Connected to Kafka');

    // Consume from the librdtesting-01 topic. This is what determines
    // the mode we are running in. By not specifying a callback (or specifying
    // only a callback) we get messages as soon as they are available.
    consumer.consume();
  })
  .on('data', function(data) {
    // Output the actual message contents
    // const parsedData = JSON.parse(data.value);
    console.log(data.value.toString());
  });

process.on('SIGINT', function() {
  consumer.disconnect();
});
