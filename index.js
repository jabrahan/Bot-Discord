require('dotenv').config();
const axios = require('axios');
const {Client,GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const monitor = require("consulta-dolar-venezuela");

client.on('ready',() => {
    console.log('El bot esta listo');
})
client.on('messageCreate', async (message)=> {
    if(message.content === 'Hola') {
        message.reply({
            content: 'Bienvenido',
        })
    } else if(message.content === 'Adios') {
        message.reply({
            content: 'Hasta pronto',
        })
    }
    else if(message.content === 'Dime una frase'){
        const res = await axios.get('https://api.quotable.io/random');
        const frase = res.data.content
        message.reply({
            content: frase
        })
    }
    else if(message.content === 'Dolar') {
        monitor.getMonitor()
        .then(i => message.reply({
            content: `El precio del dolar es ${i.bcv.price.toString()} Bs.`
        }))
        
    }
})
client.login(process.env.TOKENBOT);