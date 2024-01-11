FROM nginx:1.25.3

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
