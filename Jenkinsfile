pipeline {
    agent any
    environment {
        REGISTRY = "enegix/vnd"
        DOCKERHUB_CREDENTIALS = 'enegix-dockerhub'
        DOCKER_IMAGE = ''
        GIT_CREDENTIALS_ID = '5ostudios-github-token'
        REPOSITORY_URL = 'https://github.com/enegixinc/vnd-machines'
        TARGET_BRANCH = 'dev'
        DEPLOY_SERVER = '49.13.210.76'
        DEPLOY_USER = 'studios'
    }
    stages {
        stage('Poll SCM') {
            steps {
                git branch: TARGET_BRANCH, url: REPOSITORY_URL, credentialsId: GIT_CREDENTIALS_ID
            }
        }
        stage("Build Backend"){
            when{
              changeset "apps/backend/**"
            }
            steps{
              echo "Building the backend docker image";
              sh "cd apps/backend && docker build -t ${REGISTRY}-backend:${BUILD_NUMBER} ."
            }
        }
        stage("Push Image"){
            when{
                changeset "apps/backend/**"
            }
            steps{
                dir('apps/backend'){
                  echo "Pushing docker image to docker registry";
                  withDockerRegistry(credentialsId: 'enegix-docker', url: 'https://index.docker.io/v1/') {
                      sh "docker push ${REGISTRY}-backend:${BUILD_NUMBER}";
                  }
                }
            }
        }
    }

    post{
        always {
          sh '''
            docker logout
            docker system prune -f
          '''
        }
        success {
            slackSend color: "good", message: "Build succeeded  - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
        failure {
            slackSend color: "danger", message:"Build failed  - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
    }
}
