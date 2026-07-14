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

        emailext(
            to: 'alfonso040927@gmail.com',
            subject: "Build fallido: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            mimeType: 'text/html',
            body: """
                <h2>El pipeline de Jenkins falló</h2>

                <p><strong>Proyecto:</strong> ${env.JOB_NAME}</p>
                <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                <p><strong>Resultado:</strong> FAILURE</p>
                <p><strong>Rama:</strong> ${env.BRANCH_NAME}</p>

                <p>
                    Revisa la consola del build:
                    <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a>
                </p>
            """
        )
    }

    always {
        echo "Build #${env.BUILD_NUMBER} finalizado."
    }
}
}