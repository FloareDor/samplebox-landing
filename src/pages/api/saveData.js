import { saveEmail } from '../../lib/db';
import geoip from 'geoip-lite';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid email provided' });
      }

      // Getting that IP address
      const forwardedFor = req.headers['x-forwarded-for'];
      const ip = forwardedFor ? forwardedFor.split(',')[0] : req.socket.remoteAddress;

      // Im using geoip-lite to get location info
	//   const geo = geoip.lookup(ip);
    //   const location = geo ? {
    //     country: geo.country,
    //     continent: geo.continent,
    //     region: geo.region,
    //     city: geo.city,
    //     timezone: geo.timezone
		//   } : null;
		const location = null;
	  

      await saveEmail(email, location);
      res.status(201).json({ message: 'Email saved successfully!' });
    } catch (error) {
      console.error('Error saving email:', error);
      res.status(500).json({ message: 'Something went wrong!' + error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}