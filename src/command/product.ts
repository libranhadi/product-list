import fs from 'fs';
import csv from 'csv-parser';
import pool from '../config/database';
import path from 'path';
import util from 'util';

const csvFilePath = path.resolve(__dirname, '../csv/amazon_laptop_prices_v01.csv');

const formatPrice = (price: string) => {
    return parseFloat(price.replace(/[^0-9.-]+/g, ''));
}

const query = util.promisify(pool.query).bind(pool);
const insertPromises: Promise<void>[] = [];
const insertData = async (data: any) => {
    const queryStr = `
      INSERT INTO products (
        brand, model, screen_size, color, harddisk, cpu, ram, OS, special_features, 
        graphics, graphics_coprocessor, cpu_speed, rating, price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.brand || null,
      data.model || null,
      data.screen_size || null,
      data.color || null,
      data.harddisk || null,
      data.cpu || null,
      data.ram || null,
      data.OS || null,
      data.special_features || null,
      data.graphics || null,
      data.graphics_coprocessor || null,
      data.cpu_speed || null,
      data.rating || null,
      formatPrice(data.price) || 0
    ];
  
    try {
      await query(queryStr, values);
    } catch (err) {
      console.error('Error inserting record:', err);
    }
};



const importData = async () => {
    return new Promise<void>((resolve, reject) => {
      const readStream = fs.createReadStream(csvFilePath)
        .pipe(csv());
  
      readStream.on('data', (data: any) => {
        insertPromises.push(insertData(data));
      });
  
      readStream.on('end', async () => {
        try {
          await Promise.all(insertPromises); 
          console.log('CSV Data import complete.');
        } catch (err) {
          console.error('Error during data import:', err);
        } finally {
          pool.end(() => resolve());
        }
      });
  
      readStream.on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error); 
      });
    });
  };
  
importData().catch(err => console.error('Error importing data:', err));

// fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on('data', (data: any) => {
//     insertData(data).catch(err => console.error('Error processing row:', err));
// }).on('end', () => {
//     console.log('CSV Data import complete.');
//     pool.end(); 
// }).on('error', (error) => {
//     console.error('Error reading CSV file:', error);
// });