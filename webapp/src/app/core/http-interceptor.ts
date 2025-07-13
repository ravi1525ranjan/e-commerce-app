import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterCeptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
  return next(req);
};
