This Folder contains Both backend and Client side code

#Client
Haven't Dockerized the client Side so to start client just :

1. npm install
2. npm start

#Backend
To up service in backend just do docker-compose up

Need the Snapshot for the above process ^

Snapshot formation :

Inside backend/srpingwebapp

1. mvn clean package

# Backend

In backend i went with the tree approach , I was confused with the ambiguity of the problem , to take a list route or take a tree , so i added rootParentid and listnum in the entities and i am also initializing them but for the tree approach i dont really need , This is for future change to list approach .
