FROM centos:centos6
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN     yum install -y npm

COPY . /write-server-js
RUN cd /write-server-js; npm install

EXPOSE 8080
CMD ["node", "/write-server-js/write-files.js"]

