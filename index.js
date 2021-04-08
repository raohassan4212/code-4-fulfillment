const { WebhookClient } = require("dialogflow-fulfillment");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("get");
    res.send("Hello World");
})

app.post("/webhook", express.json(), (request, response) => {

    const agent = new WebhookClient({ request: request, response: response });

    function fallback(agent) {
        agent.add("BOT does not understand this");
    }

    function default0(agent) {
        agent.add("Welcome to backend PIAIC ChatBot");
    }

    function userDetail(agent) {
        let userName = agent.parameters["person"];
        let userCity = agent.parameters["geo-city"]
        agent.add(`Welcome to PIAIC ${userName.name} from ${userCity}`);
    }

    function calculation(agent) {
        let num1 = agent.parameters["number_01"];
        let num2 = agent.parameters["number_02"];
        agent.add(`The sum of ${num1} and ${num2} is: ${num1 + num2}`);
    }

    let intentMap = new Map();
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("Default Welcome Intent", default0);
    intentMap.set("userDetail", userDetail);
    intentMap.set("calculation",calculation);
    agent.handleRequest(intentMap);
})

app.listen(4000, () => {
    console.log("UP 4000");
})