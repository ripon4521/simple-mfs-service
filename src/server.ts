import mongoose from 'mongoose';
import config from './app/utils/config';
import app from './app';

async function main(): Promise<void> {
  try {
    await mongoose.connect(config.database_url as string);
    
    // console.log('Database connected');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      // console.log(`MFS Service App is live at ${config.port} . Alhamdulillah`);
    });
  } catch (err) {
    // console.log(err);
  }
}

main();
