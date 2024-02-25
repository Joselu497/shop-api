import { NestMiddleware } from '@nestjs/common';
import { Op } from 'sequelize';

export class QueryMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const order = req.query.order || [['name', 'ASC']];
    const search = req.query.search || '';

    const options = {
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      raw: true,
      offset: (page - 1) * limit,
      limit: limit,
      order: order,
    };

    req['options'] = options;
    next();
  }
}
