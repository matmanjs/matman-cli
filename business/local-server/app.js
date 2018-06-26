const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // Hello World!4C:\Program Files\nodejs\node.exe,C:\Users\Administrator\AppData\Roaming\npm\node_modules\pm2\lib\ProcessContainerFork.js,hello,world
    res.send('Hello World!4'+process.argv)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));