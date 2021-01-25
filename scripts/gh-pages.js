const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/folio',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/gtibo/folio.git',
        user: {
            name: 'gtibo',
            email: 'gtibo.contact@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
