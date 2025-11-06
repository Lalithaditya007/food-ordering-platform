pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('docker-hub')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Auth Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_USER}/auth-service:latest ./auth-service"
                }
            }
        }

        stage('Push Auth to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKER_USER}/auth-service:latest"
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_USER}/frontend:latest ./frontend"
                }
            }
        }

        stage('Push Frontend to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh "docker push ${DOCKER_USER}/frontend:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}
