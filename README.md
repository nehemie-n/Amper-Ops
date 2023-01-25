# **Amper-Ops**

Uses [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for prototyping.

### **Installation**

```bash
$ npm install
```

### **Create .env file and Paste below**
```
NODE_ENV=development
NODE_PORT=3000

MONGO_URI=mongodb+srv://Amper-Ops-Trial:WillDeleteItsSelf@amperops-trial.yhciqq1.mongodb.net/?retryWrites=true&w=majority
MONGO_USERNAME=Amper-Ops-Trial
MONGO_PASS=WillDeleteItsSelf
```

### **Running the app**

```bash
# watch mode
$ npm run start:dev
```

### **Test**

```bash
# unit tests
$ npm run test
```

## **Sample Routes & Documentation**

After startin the server with npm run start:dev <br>
Visit http://localhost:3000/docs for simple swagger documentation

```bash
http://localhost:3000/docs
```

<br>

## **Design & Documentation**

![Infrustructure Design](./Amper-Ops.png)

### **The above Infrustructure Design** **consists**:

- Amper-Ops Cloud or any networking infrustructure configuration
- Public and private subnets 
- A GPS Emitter
- A cloud API gateway/endpoint that acts as a trigger to a cloud function (In this scenario AWS)
- A cloud function that is supposed to parse the GPS data and stores them to the database, it ***might need to use a queue service*** for a reliable time series data 
- Main API Service (Micro for calculations and swapping endpoints)
- Frontend Web analytics server
- Analytics API
- Time series optimized database (hosted in a private subnet for elevated security)

<br>

### **Design explanation**:

- To track the assets in motion, I would use the GPS technology<br> Every GPS device in a battery would be transmitting location coordinates data along with other crucial data to the API. The API would then store this information along with the bike Id or driver ID (if possible to assign it).<br><br>It would be ideal to first pass the data in a queue so as to avoid errors that might arise in queerying the data in a time series manner.
<br><br>

- To calculate the distance traveled by each driver, the system would need to compare the location of the battery at the start of the journey (swap-in) and the end of the journey (swap-out). To calculate the total energy consumed by each driver, the system would use the data from the battery at (**swap-in** **minus battery power at swap-out**) which would give the energy consumption in watt-hours, and convert it to money amount using the rate set by Ampersand.

- To predict and optimize the number of batteries needed at each station, the system would use the historical data of battery swaps and location data to train a machine learning model. The model would then be used to predict the number of batteries needed at each station in the future, this would help ensure that there are always enough batteries at each station to meet the demand.

<br>

#### **Data Organization**:

- Ideal database would be a database optimized for time series data, and also supports relationships (More like a relational time series optimized database) \
  (For easy of API prototyping I used a MongoDb cluster hosted on MongoDb Atlas) \

- Would store data in a time series manner for tracking batteries
  - Staff (Ignored in implementation)
    - ID (Staff ID)
    - Names
    - Registered At
  - Station
    - ID (Station ID)
    - Station Name
    - Station Location
    - Station Coordinates
  - Swap
    - ID (Swap ID)
    - Swap (In/out)
    - Date & Time
    - Battery ID (Reference)
    - Station ID (Reference)
    - Staff ID (Reference)
    - Driver ID (Reference)
    - Battery Power
    - If swap in
      - Charge
      - Power used
      - Distance (calculated distance traveled)
  - Battery Track
    - ID (Tracking ID)
    - Battery ID
    - Date & Time
    - Coordinates
    - Driver (Reference to a driver)
    - Swap(Reference to a swap)

<br>

#### **Key Risks**

- Some motorcycles GPS coordinates might change while they are not being rode/driven, for example being transported over a moto carrier trailer. \
  In this scenario it might be ideal to have the ability to track the bike’s state too if it is **ON** or **OFF.** \* In this case data would be in terms of series of journeys \
  A journey being a series of coordinates
- If the drivers have the ability to exchange the batteries among themselves, this would lead to probably some miscalculated data.
  - We can solve this by focusing on major metrics and base them on batteries rather than bikes or if possible track the bike’s ID too.
- Data compliance mechanisms in place.

<br>

### **Calculating Distance in**

To calculate the distance in meters or kilometers that a GPS device has traveled, we can use the Haversine formula, which is a mathematical formula used to calculate the distance between two points on a sphere (in this case, the Earth).

Here is the theory behind the algorithm [https://en.wikipedia.org/wiki/Haversine_formula](https://en.wikipedia.org/wiki/Haversine_formula).

While using memoization, storing previous calculations, we can do coordinate per next coordinate calculation until they are done being calculated. This would have to be sorted in terms of time that they were recorded in.

<br>

### **Predicting and Optimizing how many batteries should be at a given station**

- We can use a machine learning model suitable for predicting or forecasting since the data itself is so based on time series.
- With consideration of variables like
  - Time it takes to charge a battery
  - Time of swaps
  - How a day starts (With how many fully charged batteries e.t.c)
  - But overall this would focus on how many swaps happen at a certain station or historical data of battery swaps at each station

<br>

## License

Nest is [MIT licensed](LICENSE).
