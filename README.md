# node-kafka-example
Test setup for a couple of consumers and producers in NodeJS

Uses docker-compose to start Kafka (this is using Docker for Mac, if using Docker Machine, change instances of "localhost" to your Docker Machine IP

To start Kafka/Zookeeper
```
docker-compose up -d
```

Before running `npm install`, need to run 
```
export CPPFLAGS=-I/usr/local/opt/openssl/include
export LDFLAGS=-L/usr/local/opt/openssl/lib
```
(according to https://github.com/Blizzard/node-rdkafka#mac-os-high-sierra--mojave)

To run the Producer,
```
node index.js
```

To run the Consumer, open another terminal window and run,
```
node consumer.js
```

To run the other Consumer, open another terminal window and run,
```
node another_consumer.js
```
