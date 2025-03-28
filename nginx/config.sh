#! /bin/sh -e

cat >> /etc/nginx/conf.d/default.conf <<EOF
  server {
    listen      80;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
    gzip_disable "MSIE [1-6].";

    proxy_read_timeout 600;

    location / {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        if (\$request_filename ~* .*\.(?:htm|html)$) 
		    {
			    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
		    }

         root /app/www/;
         try_files \$uri \$uri/ /index.html;
         client_max_body_size  500m;
    }

 }

EOF

echo "starting web server"

nginx -g 'daemon off;'
