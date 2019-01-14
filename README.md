# Locate Drone Position Assignment
Project will expose REST API to manage application to manage drone current position.
Drone can have name , id ,initial position.
# Deployment :
git clone git@github.com:shivshankerjiit/locateDrones.git
npm install 
npm run start

# API :
  # GET / 
  # GET /drones 
       List of all drones with current position
  # POST /drone
       Add drone
  # DELETE /drone/:id
       Delete drone

# Assumption : 
Current position of drone is determined by mathematical equation of circle.
              x = x(i) - r*cos t ,
              y = y(i) - r*sin t ,
            where,  x(i) = initial position of drone(i) on x - axis ,
                    y(i) = initial position of drone(i) on y - axis ,
                    t    = angle that drone make with orign(0,0) ,
                           (v * t) % 2*pi) / r ,
                           v = velocity ( For this project it is configured to be 1 m/s) ,
                           r = radius of circle ( For this project it is configured to be 5 m)



