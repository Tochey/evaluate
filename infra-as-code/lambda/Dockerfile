FROM amazon/aws-lambda-nodejs:12

RUN yum install -y java-1.8.0-openjdk-devel
RUN yum install -y junit-4.11

ENV JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
ENV PATH=$PATH:$JAVA_HOME/bin
ENV CLASSPATH /usr/share/java/junit.jar:$CLASSPATH

COPY ./src/package.json ./
COPY ./src .
RUN npm install


CMD [ "index.handler" ]