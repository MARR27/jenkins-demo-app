pipeline {
    agent any

    parameters {
        choice(
            name: 'ENTORNO',
            choices: ['staging', 'produccion'],
            description: 'Entorno de despliegue'
        )

        booleanParam(
            name: 'EJECUTAR_DEPLOY',
            defaultValue: false,
            description: '¿Desplegar al finalizar?'
        )
    }

    environment {
        APP_NAME = 'jenkins-demo-app'
    }

    options {
        timestamps()
        buildDiscarder(
            logRotator(numToKeepStr: '10')
        )
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando repositorio...'
                checkout scm
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                echo 'No hay dependencias externas en este proyecto'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'

                archiveArtifacts(
                    artifacts: 'dist/**',
                    fingerprint: true
                )
            }
        }

        stage('Deploy') {
            when {
                expression {
                    return params.EJECUTAR_DEPLOY
                }
            }

            steps {
                echo "Desplegando ${env.APP_NAME} en el entorno: ${params.ENTORNO}"
                echo 'Simulación de despliegue completada'
            }
        }
    }

    post {
    success {
        echo "Pipeline completado correctamente para ${env.APP_NAME}"
    }

    failure {
    echo 'El pipeline falló. Revisa los logs de la etapa correspondiente.'

    mail(
        to: 'alfonso040927@gmail.com',
        subject: "Build fallido: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        body: """
El pipeline de Jenkins falló.

Proyecto: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
Rama: ${env.BRANCH_NAME}

Revisa la consola:
${env.BUILD_URL}console
"""
    )
}

    always {
        echo "Build #${env.BUILD_NUMBER} finalizado."
    }
}
}