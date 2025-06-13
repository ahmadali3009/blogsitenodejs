var requests = {} 
 let ratelimiter = (req, res, next) => {
    let ip = req.ip;
    console.log("ip address: " + ip)
    let WINDOW_PER_MIN = 1 
    let WINDOW_REQ_COUNT = 3
    let AVERAGE_TIMEINTERVAL = WINDOW_PER_MIN * 60 * 1000 
    let currentTime = Date.now()
    if(!requests[ip])
        {
            requests[ip] = []
        }
    requests[ip] = requests[ip].filter(timeStamp => timeStamp > currentTime - AVERAGE_TIMEINTERVAL)
      if (requests[ip].length >= WINDOW_REQ_COUNT) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }
    requests[ip].push(currentTime)
    next();
}
module.exports = ratelimiter