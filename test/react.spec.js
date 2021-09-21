const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const utils = require('./test-util');

describe('JHipster generator gql', function() {
    describe('Test with Node and React', function() {
        this.timeout(30000);
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir(dir => fse.copySync(path.join(__dirname, '../test/templates/node-react'), dir))
                .withOptions({
                    skipInstall: true
                })
                .withPrompts({
                    typeDefinition: 'GraphQL'
                })
                .on('end', done);
        });

        it('generates the configuration files', () => {
            utils.assertConfigurationFiles();
        });

        it('generates the GraphQL server files', () => {
            utils.assertServerFiles();
        });

        it('generates the GraphQL server entity files', () => {
            utils.assertServerEntityFiles('post');
        });

        it('generates the GraphQL client files', () => {
            utils.assertCommonClientFiles();
            assert.file([
                path.join('src', 'main', 'webapp', 'app', 'config', 'apollo-client.ts'),
                path.join('src', 'main', 'webapp', 'app', 'shared', 'util', 'graphql-cache-watcher.ts'),
                path.join('src', 'main', 'webapp', 'app', 'shared', 'util', 'pub-sub.ts'),
                path.join('src', 'main', 'webapp', 'app', 'modules', 'administration', 'user-management', 'user-management.gql-actions.ts')
            ]);
        });

        it('generates the GraphQL client entity files', () => {
            utils.assertCommonClientEntityFiles('post');
            assert.file([
                path.join('src', 'main', 'webapp', 'app', 'entities', 'post', 'post.gql-actions.ts')
            ]);
        });
    });
});
