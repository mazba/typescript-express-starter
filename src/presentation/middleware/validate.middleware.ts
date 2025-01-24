import { Request, Response, NextFunction } from 'express';
import { BaseDto } from '../../shared/dtos/base.dto';

export const validateDtoMiddleware =
  <T extends BaseDto<T>>(DtoClass: new () => T) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate the incoming data and replace the request body with a type-safe DTO
      const dtoInstance = BaseDto.from(DtoClass, req.body);
      await dtoInstance.validate();
      req.body = dtoInstance;
      next();
    } catch (error:any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
