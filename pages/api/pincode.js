export default function handler(req,res) {
  let pincodes = {
    "503302":["Nizamabad","Andhra Pradesh"],
    "531035":["Visakhapatnam","Andhra Pradesh"],
    "110092":["East Delhi","Delhi"],
    "413114":["Pune","Maharastra"],
    "410206":["Panvel","Maharastra"]
  }
    res.status(200).json(pincodes)
  }
