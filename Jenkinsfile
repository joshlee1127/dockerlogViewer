pipeline {
  agent any
  stages {
    stage('checkout code') {
      agent any
      steps {
        container('base') {
          git(url: 'https://github.com/joshlee1127/dockerlogViewer.git', branch: 'main', changelog: true, poll: false)
          sh '''ls -la
pwd'''
          sh 'hostname'
        }

      }
    }

    stage('build & push image') {
      agent any
      steps {
        container('base') {
          sh '''ls -la
pwd'''
          sh ' hostname'
          sh 'docker build -f ./my-test-flow/Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
          withCredentials([usernamePassword(credentialsId : 'dockerhub-id' ,)]) {
            sh 'echo "$DOCKER_PASSWORD && $REGISTRY && $DOCKER_USERNAME'
            sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
            sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
          }

        }

      }
    }

    stage('push latest') {
      when {
        branch 'master'
      }
      steps {
        container('maven') {
          sh 'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
          sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
        }

      }
    }

    stage('deploy to dev') {
      steps {
        input(id: 'deploy-to-dev', message: 'deploy to dev?')
        kubernetesDeploy(configs: 'deploy/dev-ol/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
      }
    }

    stage('deploy to production') {
      steps {
        input(id: 'deploy-to-production', message: 'deploy to production?')
        kubernetesDeploy(configs: 'deploy/prod-ol/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
      }
    }

  }
  environment {
    DOCKER_CREDENTIAL_ID = 'dockerhub-id'
    GITHUB_CREDENTIAL_ID = 'github-id'
    DOCKER_USERNAME = 'joshlee1127'
    DOCKER_PASSWORD = 'ewe114kir1k91'
    KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
    REGISTRY = 'docker.io'
    DOCKERHUB_NAMESPACE = 'joshlee1127'
    GITHUB_ACCOUNT = 'kubesphere'
    APP_NAME = 'devops-java-sample'
  }
  parameters {
    string(name: 'TAG_NAME', defaultValue: '', description: '')
  }
}