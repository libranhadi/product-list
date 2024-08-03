import { Request, Response } from 'express';
import pool from '../config/database';

const promisePool = pool.promise();

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1; 
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10; 
  const queryParam = req.query.queryParam ? `%${req.query.queryParam}%` : null;
  
  if (page < 1 || pageSize < 1) {
    return res.status(400).json({ error: 'Invalid page or pageSize values' });
  }
  const offset = (page - 1) * pageSize;
  let sql = 'SELECT * FROM products';
  const queryParams = [];

  if (queryParam) {
    sql += ' WHERE brand LIKE ? OR model LIKE ?';
    queryParams.push(queryParam, queryParam);
  }

  sql += ' LIMIT ? OFFSET ?';
  queryParams.push(pageSize, offset);

  try {
    const [results] = await promisePool.query(sql, queryParams);
    const countSql = 'SELECT COUNT(*) AS totalItems FROM products' + (queryParam ? ' WHERE brand LIKE ? OR model LIKE ?' : '');
    const countParams = queryParam ? [queryParam, queryParam] : [];
    const [countResult] = await promisePool.query(countSql, countParams);
    const totalItems : any = countResult[0].totalItems;
    const totalPages = Math.ceil(totalItems / pageSize);

    return res.status(200).json({
      products: results,
      totalItems,
      totalPages,
      currentPage: page,
      s : pageSize
    })
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};
