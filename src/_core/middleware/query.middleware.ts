import { NestMiddleware, Req } from '@nestjs/common';
import { Op } from 'sequelize';

export class QueryMiddleware implements NestMiddleware {
  use(@Req() req: any, res: any, next: (error?: any) => void) {
    const model = req.originalUrl.match(/(?<=\/)[\w]+(?=[\/?\n]|)/)[0];

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const order = req.query.order || [['id', 'ASC']];
    const search = req.query.search || '';

    const options = {
      where: {},
      raw: true,
      offset: (page - 1) * limit,
      limit: limit,
      order: order,
    };

    switch (model) {
      case 'users':
        options.where = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              email: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        };
      case 'products':
        options.where = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        };
      case 'tags':
        options.where = {
          name: {
            [Op.iLike]: `%${search}`,
          },
        };
      default:
        break;
    }

    req['options'] = options;
    next();
  }
}
