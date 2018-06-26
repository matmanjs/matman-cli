var pm2 = require('pm2');

pm2.connect(function (err) {
    if (err) {
        console.error(err);
        process.exit(2);
    }

    pm2.start({
        name:'testpm2',
        args:['hello','world'],
        script: 'app.js',         // Script to be run
        max_memory_restart: '100M',   // Optional: Restarts your app if it reaches 100Mo
        'watch': true,
        // 'ignore_watch': ['node_modules', 'client/img']
    }, function (err, apps) {
        pm2.disconnect();   // Disconnects from PM2
        if (err) throw err;
    });
});