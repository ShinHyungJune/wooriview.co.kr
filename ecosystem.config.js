module.exports = {
    apps: [
        {
            name: 'uriview',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            port: 3002, // yoru app port
            instances: 'max',
            exec_mode: 'cluster',
            cwd: './'
        }
    ]
};
