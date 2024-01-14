# WebApp-Chat-UD
A application for a subject of the university. 
## Running the application
### Required software
In order to run this application you will need Docker installed and running on your system. To clone the repository, you will also need git. Alternatively, you can download all the code from GitHub as a zip.  
This application has been tested on Linux with Docker version 24.0.7.
### Downloading the application
Download or clone the code:
```
git clone https://github.com/LNDF/WebApp-Chat-UD
```
You can also download the code as a ZIP file from Git>Hub.
### Running the application
Run the following command inside the application directory to run the application:
```
docker compose up
```
In Linux, you may need to use `sudo` if you dont' have enough permissions.  
Use Ctrl+C to stop the application.
### Running the application (detached)
Run the following command inside the application directory to run the application:
```
docker compose up -d
```
To stop the application, run the following command:
```
docker compose down
```
In Linux, you may need to use `sudo` if you dont' have enough permissions.
### Access the application
While the application is running, access [http://localhost](http://localhost).  
To access FastAPI directly, use por 8000: ([http://localhost:8000](http://localhost:8000)).
