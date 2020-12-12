const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fse = require('fs-extra');

const expectedFiles = {
    travis: ['.travis.yml'],
    jenkins: ['Jenkinsfile', 'src/main/docker/jenkins.yml', 'src/main/resources/idea.gdsl'],
    gitlab: ['.gitlab-ci.yml'],
    circle: ['.circleci/config.yml'],
    azure: ['azure-pipelines.yml'],
    github: ['.github/workflows/github-actions.yml'],
    dockerRegistry: ['src/main/docker/docker-registry.yml'],
};

describe('JHipster CI-CD Sub Generator', () => {
    //--------------------------------------------------
    // Jenkins tests
    //--------------------------------------------------
    describe('Jenkins tests', () => {
        describe('Jenkins: Maven Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'jenkins',
                        insideDocker: false,
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.jenkins);
            });
            it("doesn't contain Docker, Sonar, Heroku", () => {
                assert.noFileContent('Jenkinsfile', /docker/);
                assert.noFileContent('Jenkinsfile', /sonar/);
                assert.noFileContent('Jenkinsfile', /heroku/);
                assert.noFileContent('Jenkinsfile', /snyk/);
            });
        });
        describe('Jenkins: Gradle Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'jenkins',
                        insideDocker: false,
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.jenkins);
            });
            it("doesn't contain Docker, Sonar, Heroku", () => {
                assert.noFileContent('Jenkinsfile', /docker/);
                assert.noFileContent('Jenkinsfile', /sonar/);
                assert.noFileContent('Jenkinsfile', /heroku/);
                assert.noFileContent('Jenkinsfile', /snyk/);
            });
        });
        describe('Jenkins: Maven Angular NPM with full options', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'jenkins',
                        insideDocker: false,
                        cicdIntegrations: ['deploy', 'sonar', 'publishDocker', 'heroku', 'snyk'],
                        artifactorySnapshotsId: 'snapshots',
                        artifactorySnapshotsUrl: 'http://artifactory:8081/artifactory/libs-snapshot',
                        artifactoryReleasesId: 'releases',
                        artifactoryReleasesUrl: 'http://artifactory:8081/artifactory/libs-release',
                        sonarName: 'sonarName',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.jenkins);
            });
            it('contains Docker, Sonar, Heroku', () => {
                assert.fileContent('Jenkinsfile', /sonar/);
                assert.fileContent('Jenkinsfile', /heroku/);
                assert.fileContent('Jenkinsfile', /def dockerImage/);
                assert.fileContent('Jenkinsfile', /snyk/);
            });
            it('contains distributionManagement in pom.xml', () => {
                assert.fileContent('pom.xml', /distributionManagement/);
            });
        });
        describe('Jenkins: Maven Angular NPM inside Docker', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'jenkins',
                        insideDocker: true,
                        cicdIntegrations: ['deploy', 'sonar', 'publishDocker', 'heroku', 'snyk'],
                        artifactorySnapshotsId: 'snapshots',
                        artifactorySnapshotsUrl: 'http://artifactory:8081/artifactory/libs-snapshot',
                        artifactoryReleasesId: 'releases',
                        artifactoryReleasesUrl: 'http://artifactory:8081/artifactory/libs-release',
                        sonarName: 'sonarName',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.jenkins);
            });
            it('contains Docker, Sonar, Heroku, dockerImage', () => {
                assert.fileContent('Jenkinsfile', /docker/);
                assert.fileContent('Jenkinsfile', /sonar/);
                assert.fileContent('Jenkinsfile', /heroku/);
                assert.fileContent('Jenkinsfile', /def dockerImage/);
                assert.fileContent('Jenkinsfile', /snyk/);
            });
        });
    });

    //--------------------------------------------------
    // GitLab CI tests
    //--------------------------------------------------
    describe('GitLab CI tests', () => {
        describe('GitLab CI: Maven Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'gitlab',
                        insideDocker: false,
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.gitlab);
            });
            it("doesn't contain image: jhipster, Sonar, Heroku", () => {
                assert.noFileContent('.gitlab-ci.yml', /image: jhipster/);
                assert.noFileContent('.gitlab-ci.yml', /sonar/);
                assert.noFileContent('.gitlab-ci.yml', /heroku/);
                assert.noFileContent('.gitlab-ci.yml', /snyk/);
            });
        });
        describe('GitLab CI: Gradle Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'gitlab',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.gitlab);
            });
            it("doesn't contain jhipster/jhipster, Sonar, Heroku", () => {
                assert.noFileContent('.gitlab-ci.yml', /image: jhipster/);
                assert.noFileContent('.gitlab-ci.yml', /sonar/);
                assert.noFileContent('.gitlab-ci.yml', /heroku/);
                assert.noFileContent('.gitlab-ci.yml', /snyk/);
            });
        });
        describe('GitLab CI: npm skip server', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/npm-skip-server'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'gitlab',
                        insideDocker: true,
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.gitlab);
            });
            it('contains image: jhipster', () => {
                assert.fileContent('.gitlab-ci.yml', /image: jhipster/);
            });
        });
        describe('GitLab CI: Maven Angular NPM with full options', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'gitlab',
                        insideDocker: false,
                        cicdIntegrations: ['deploy', 'sonar', 'heroku', 'snyk'],
                        artifactorySnapshotsId: 'snapshots',
                        artifactorySnapshotsUrl: 'http://artifactory:8081/artifactory/libs-snapshot',
                        artifactoryReleasesId: 'releases',
                        artifactoryReleasesUrl: 'http://artifactory:8081/artifactory/libs-release',
                        sonarUrl: 'http://localhost:9000',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.gitlab);
            });
            it('contains Sonar, Heroku', () => {
                assert.noFileContent('.gitlab-ci.yml', /image: jhipster/);
                assert.fileContent('.gitlab-ci.yml', /sonar/);
                assert.fileContent('.gitlab-ci.yml', /heroku/);
                assert.fileContent('.gitlab-ci.yml', /snyk/);
            });
            it('contains distributionManagement in pom.xml', () => {
                assert.fileContent('pom.xml', /distributionManagement/);
            });
        });
        describe('GitLab CI: Maven Angular NPM inside Docker', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'gitlab',
                        insideDocker: true,
                        cicdIntegrations: ['deploy', 'sonar', 'heroku', 'snyk'],
                        artifactorySnapshotsId: 'snapshots',
                        artifactorySnapshotsUrl: 'http://artifactory:8081/artifactory/libs-snapshot',
                        artifactoryReleasesId: 'releases',
                        artifactoryReleasesUrl: 'http://artifactory:8081/artifactory/libs-release',
                        sonarUrl: 'http://localhost:9000',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.gitlab);
            });
            it('contains image: jhipster, Sonar, Heroku', () => {
                assert.fileContent('.gitlab-ci.yml', /image: jhipster/);
                assert.fileContent('.gitlab-ci.yml', /sonar/);
                assert.fileContent('.gitlab-ci.yml', /heroku/);
                assert.fileContent('.gitlab-ci.yml', /snyk/);
            });
            it('contains distributionManagement in pom.xml', () => {
                assert.fileContent('pom.xml', /distributionManagement/);
            });
        });
        describe('GitLab CI: Maven Angular Yarn inside Docker Autoconfigure', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ autoconfigureGitlab: true })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.gitlab);
            });
            it('contains image: jhipster, Sonar, Heroku', () => {
                assert.fileContent('.gitlab-ci.yml', /image: jhipster/);
                assert.noFileContent('.gitlab-ci.yml', /sonar/);
                assert.noFileContent('.gitlab-ci.yml', /heroku/);
                assert.noFileContent('.gitlab-ci.yml', /snyk/);
            });
        });
    });

    //--------------------------------------------------
    // Travis CI tests
    //--------------------------------------------------
    describe('Travis CI tests', () => {
        describe('Travis CI: Maven Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'travis',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.travis);
            });
            it("doesn't contain Sonar, Heroku", () => {
                assert.noFileContent('.travis.yml', /sonar/);
                assert.noFileContent('.travis.yml', /heroku/);
            });
        });
        describe('Travis CI: Gradle Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'travis',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.travis);
            });
            it("doesn't contain Sonar, Heroku", () => {
                assert.noFileContent('.travis.yml', /sonar/);
                assert.noFileContent('.travis.yml', /heroku/);
            });
        });
        describe('Travis CI: Maven Angular NPM with full options', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'travis',
                        cicdIntegrations: ['deploy', 'sonar', 'heroku'],
                        artifactorySnapshotsId: 'snapshots',
                        artifactorySnapshotsUrl: 'http://artifactory:8081/artifactory/libs-snapshot',
                        artifactoryReleasesId: 'releases',
                        artifactoryReleasesUrl: 'http://artifactory:8081/artifactory/libs-release',
                        sonarUrl: 'http://localhost:9000',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.travis);
            });
            it('contains Sonar, Heroku', () => {
                assert.fileContent('.travis.yml', /sonar/);
                assert.fileContent('.travis.yml', /heroku/);
            });
            it('contains distributionManagement in pom.xml', () => {
                assert.fileContent('pom.xml', /distributionManagement/);
            });
        });
    });

    //--------------------------------------------------
    // Azure Pipelines tests
    //--------------------------------------------------
    describe('Azure Pipelines tests', () => {
        describe('Azure Pipelines: Maven Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'azure',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.azure);
            });
        });
        describe('Azure Pipelines: Gradle Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'azure',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.azure);
            });
        });
        describe('Azure Pipelines: autoconfigure', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ autoconfigureAzure: true })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.azure);
            });
        });
    });

    //--------------------------------------------------
    // GitHub Actions tests
    //--------------------------------------------------
    describe('GitHub Actions tests', () => {
        describe('GitHub Actions: Maven Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'github',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.github);
            });
        });

        describe('GitHub Actions: Gradle Angular NPM', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'github',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.github);
            });
        });
        describe('GitHub Actions: Maven Angular NPM with full options', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'github',
                        cicdIntegrations: ['deploy', 'sonar', 'publishDocker', 'heroku', 'snyk'],
                        dockerImage: 'jhipster-publish-docker',
                        artifactorySnapshotsId: 'snapshots',
                        artifactorySnapshotsUrl: 'http://artifactory:8081/artifactory/libs-snapshot',
                        artifactoryReleasesId: 'releases',
                        artifactoryReleasesUrl: 'http://artifactory:8081/artifactory/libs-release',
                        sonarUrl: 'http://sonar.com:9000',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.github);
            });
            it('contains Docker, Sonar, Heroku, Snyk', () => {
                assert.fileContent('.github/workflows/github-actions.yml', /mvnw.*sonar.com/);
                assert.fileContent('.github/workflows/github-actions.yml', /mvnw.*jhipster-publish-docker/);
                assert.fileContent('.github/workflows/github-actions.yml', /mvnw.*sample-mysql/);
                assert.fileContent('.github/workflows/github-actions.yml', /snyk/);
            });
            it('contains distributionManagement in pom.xml', () => {
                assert.fileContent('pom.xml', /distributionManagement/);
            });
        });
        describe('GitHub Actions: Gradle Angular NPM with full options', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'github',
                        cicdIntegrations: ['sonar', 'publishDocker', 'heroku', 'snyk'],
                        dockerImage: 'jhipster-publish-docker',
                        sonarUrl: 'http://sonar.com:9000',
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.github);
            });
            it('contains Docker, Sonar, Heroku', () => {
                assert.fileContent('.github/workflows/github-actions.yml', /gradlew.*jhipster-publish-docker/);
                assert.fileContent('.github/workflows/github-actions.yml', /gradlew.*sonar.com/);
                assert.fileContent('.github/workflows/github-actions.yml', /gradlew.*deployHeroku/);
                assert.fileContent('.github/workflows/github-actions.yml', /snyk/);
            });
        });
        describe('GitHub Actions: autoconfigure', () => {
            before(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ autoconfigureGithub: true })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.github);
            });
        });
    });

    //--------------------------------------------------
    // Circle CI tests
    //--------------------------------------------------
    describe('Circle CI test', () => {
        describe('Circle CI: Maven Angular NPM', () => {
            beforeEach(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/maven-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'circle',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.circle);
                assert.noFile(expectedFiles.jenkins);
                assert.noFile(expectedFiles.travis);
                assert.noFile(expectedFiles.gitlab);
            });
        });
        describe('Circle CI: Gradle Angular NPM', () => {
            beforeEach(done => {
                helpers
                    .run(require.resolve('../generators/ci-cd'))
                    .inTmpDir(dir => {
                        fse.copySync(path.join(__dirname, './templates/ci-cd/gradle-ngx-npm'), dir);
                    })
                    .withOptions({ skipChecks: true })
                    .withPrompts({
                        pipeline: 'circle',
                        cicdIntegrations: [],
                    })
                    .on('end', done);
            });
            it('creates expected files', () => {
                assert.file(expectedFiles.circle);
                assert.noFile(expectedFiles.jenkins);
                assert.noFile(expectedFiles.travis);
                assert.noFile(expectedFiles.gitlab);
            });
        });
    });
});
